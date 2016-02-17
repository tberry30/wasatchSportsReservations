var Reservation = require('./reservation.model');

module.exports = {

  createRes: function(req, res) {
    var newReservation = new Reservation(req.body);
    newReservation.save(function(err, reservation) {
      if (err) res.status(400).send(err);
      else res.status(200).json(reservation);
    });
  },

  getReservations: function(req, res) {
    Reservation.find()
      .where('status').equals('submitted')
      .populate('createdBy', '-password')
      .populate({
        path: 'renters',
        populate: { path: 'rentalEquip' }
      })
      .exec(function(err, reservations) {
        if (err) res.send(err);
        else res.json(reservations);
    });
  },

  getQueue: function(req, res) {
    Reservation.find()
      .where('status').equals('queued')
      .populate('createdBy', '-password')
      .populate({
        path: 'renters',
        populate: { path: 'rentalEquip' }
      })
      .exec(function(err, reservations) {
        if (err) res.send(err);
        else res.json(reservations);
    });
  },

  getReservationsByUser: function(req, res) {
    Reservation.find()
      .where('createdBy').equals(req.params.userId)
      .populate('createdBy', '-password')
      .populate({
        path: 'renters',
        populate: { path: 'rentalEquip' }
      })
      .exec(function(err, reservationsByUser) {
        if (err) res.send(err);
        else res.json(reservationsByUser);
    });
  },

  getReservationById: function(req, res) {
    Reservation.findById(req.params.id)
      .populate('createdBy', '-password')
      .populate({
        path: 'renters',
        populate: { path: 'rentalEquip' }
      })
      .exec(function(err, reservation) {
        if (err) res.send(err);
        else res.json(reservation);
    });
  }

};
