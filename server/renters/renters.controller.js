var Renter = require('./renter.model');

module.exports = {

  getRenter: function(req, res) {
    Renter.findById(req.params.id)
      .populate('rentalEquip')
      .exec(function(err, user) {
        if (err) res.send(err);
        else res.json(user);
    });
  },

  addRenter: function(req, res) {
    var newRenter = new Renter(req.body);

    newRenter.save(function(err, renter) {
      if (err) res.status(400).send(err);
      else res.status(200).json(renter);
    });
  },

  editRenter: function(req, res) {
    Renter.findByIdAndUpdate(req.params.id, req.body, { new: true }, function(err, renter) {
      if (err) res.send(err);
      else res.json(renter);
    });
  },

  removeRenter: function(req, res) {
    Renter.findByIdAndRemove(req.params.id, function(err, renter) {
      if (err) res.send(err);
      else res.json(renter);
    });
  },

  addEquip: function(req, res) {
    Renter.findByIdAndUpdate(req.params.id, { rentalEquip: req.body.equipId }, { new: true }, function(err, renter) {
      if (err) res.send(err);
      else res.json(renter);
    });
  }

};
