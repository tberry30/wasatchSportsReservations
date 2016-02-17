var express = require('express');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var moment = require('moment');
var jwt = require('jsonwebtoken');
var config = require('./server/config/config');
var bodyParser = require('body-parser');
var port = 3535;

var db = mongoose
  .set('debug', true)
  .connect(config.db)
  .connection.once('open', function() {
    console.log('Connected to Mongo at ' + config.db);
  });

var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);

var authCtrl = require('./server/auth/auth.controller.js');
var userCtrl = require('./server/users/users.controller');
var reservationCtrl = require('./server/reservations/reservations.controller');
var renterCtrl = require('./server/renters/renters.controller');
var equipmentCtrl = require('./server/equipment/equipment.controller');

var authorize = function(roles) {
  return function(req, res, next) {
    var authHeader = req.header('Authorization');
    if (authHeader) {
      var token = authHeader.split(' ').pop();
      jwt.verify(token, config.secretKey, function(err, payload) {
        if (err) res.status(401).send('Authorization Issue');
        else {
          if (roles.indexOf(payload.role) === -1) res.status(401).send('Unauthorized');
          else next();
        }
      });
    }
    else res.status(401).send('Unauthenticated');
  };
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// AUTH
app.post('/register', authCtrl.register);
app.post('/login', authCtrl.login);

// USERS
app.get('/api/users', authorize(['admin']), userCtrl.getUsers);
app.get('/api/users/:id', authorize(['customer', 'tech', 'admin']), userCtrl.getUser);
app.put('/api/users/:id', authorize(['customer', 'tech', 'admin']), userCtrl.updateUser);
app.delete('/api/users/:id', authorize(['customer', 'tech', 'admin']), userCtrl.deleteUser);

// RENTERS
app.get('/api/renters/:id', authorize(['customer', 'tech', 'admin']), renterCtrl.getRenter);
app.post('/api/renters', authorize(['customer', 'tech', 'admin']), renterCtrl.addRenter);
app.put('/api/renters/:id', authorize(['customer', 'tech', 'admin']), renterCtrl.editRenter);
app.delete('/api/renters/:id', authorize(['customer', 'tech', 'admin']), renterCtrl.removeRenter);
app.put('/api/addEquipToRenter/:id', authorize(['customer', 'tech', 'admin']), renterCtrl.addEquip);

// RESERVATIONS
var Reservation = require('./server/reservations/reservation.model');
app.post('/api/reservations', authorize(['customer', 'tech', 'admin']), reservationCtrl.createRes);
app.get('/api/reservations', authorize(['tech', 'admin']), reservationCtrl.getReservations);
app.get('/api/reservations/:userId', authorize(['customer', 'tech', 'admin']), reservationCtrl.getReservationsByUser);
app.get('/api/reservation/:id', authorize(['customer', 'tech', 'admin']), reservationCtrl.getReservationById);
app.get('/api/queue', authorize(['tech', 'admin']), reservationCtrl.getQueue);
// ENDPOINTS REQUIRING SOCKET.IO
app.put('/api/removeFromQueue/:id', authorize(['tech', 'admin']), function(req, res) {
  Reservation.findByIdAndUpdate(req.params.id, { status: 'submitted', checkedIn: '' }, { new: true })
    .populate('createdBy', '-password')
    .populate('renters')
    .exec(function(err, reservation) {
      if (err) res.send(err);
      else {
        io.emit('dashboard', reservation);
        io.emit('q_update');
        res.send(reservation);
      }
    });
});

app.put('/api/addToQueue/:id', authorize(['tech', 'admin']), function(req, res) {
  Reservation.findByIdAndUpdate(req.params.id, { status: 'queued', checkedIn: Date.now() }, { new: true })
    .populate('createdBy', '-password')
    .populate('renters')
    .exec(function(err, reservation) {
      if (err) res.send(err);
      else {
        io.emit('queue', reservation);
        io.emit('db_update');
        res.send(reservation);
      }
  });
});

app.put('/api/markReservationComplete/:id', authorize(['tech', 'admin']), function(req, res) {
  Reservation.findByIdAndUpdate(req.params.id, { status: 'completed', checkedIn: '' }, { new: true })
    .populate('createdBy', '-password')
    .populate('renters')
    .exec(function(err, reservation) {
      if (err) res.send(err);
      else {
        io.emit('queue', reservation);
        io.emit('db_update');
        res.send(reservation);
      }
  });
});

// EQUIPMENT
app.get('/api/equipment', authorize(['tech', 'admin', 'customer']), equipmentCtrl.getAllEquipment);
app.get('/api/equipment/:id', authorize(['tech', 'admin']), equipmentCtrl.getEquipment);
app.post('/api/equipment', authorize(['tech', 'admin']), equipmentCtrl.addEquipment);
app.put('/api/equipment/:id', authorize(['tech', 'admin']), equipmentCtrl.editEquipment);
app.delete('/api/equipment/:id', authorize(['tech', 'admin']), equipmentCtrl.removeEquipment);

// SERVE STATIC FILES AND LISTEN
app.use(express.static('./app'));

http.listen(port, function() {
  console.log('Server running at http://localhost:' + port + '/');
});
