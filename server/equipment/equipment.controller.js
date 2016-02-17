var Equipment = require('./equipment.model');

module.exports = {

  getAllEquipment: function(req, res) {
    Equipment.find({}, function(err, equip) {
      if (err) res.send(err);
      else res.json(equip);
    });
  },

  getEquipment: function(req, res) {
    Equipment.findById(req.params.id, function(err, equip) {
      if (err) res.send(err);
      else res.json(equip);
    });
  },

  addEquipment: function(req, res) {
    var newEquipment = new Equipment(req.body);

    newEquipment.save(function(err, equip) {
      if (err) res.status(400).send(err);
      else res.status(200).json(equip);
    });
  },

  editEquipment: function(req, res) {
    Equipment.findByIdAndUpdate(req.params.id, req.body, { new: true }, function(err, equip) {
      if (err) res.send(err);
      else res.json(equip);
    });
  },

  removeEquipment: function(req, res) {
    Equipment.findByIdAndRemove(req.params.id, function(err, equip) {
      if (err) res.send(err);
      else res.json(equip);
    });
  }

};
