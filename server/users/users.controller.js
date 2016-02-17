var User = require('./user.model');

module.exports = {

  getUsers: function(req, res) {
    User.find({}, function(err, users) {
      if (err) res.send(err);
      else res.json(users);
    });
  },

  getUser: function(req, res) {
    User.findById(req.params.id, function(err, user) {
      if (err) res.send(err);
      else res.json(user);
    });
  },

  updateUser: function(req, res) {
    User.findByIdAndUpdate(req.params.id, req.body, { new: true }, function(err, user) {
      if (err) res.send(err);
      else res.json(user);
    });
  },

  deleteUser: function(req, res) {
    User.findByIdAndRemove(req.params.id, function(err, user) {
      if (err) res.send(err);
      else res.json(user);
    });
  }

};
