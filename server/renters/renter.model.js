var mongoose = require('mongoose');

var RenterSchema = new mongoose.Schema({
      name: { type: String },
      age: { type: Number },
      weight: { type: Number },
      height: { type: Number },
      skierType: {
		    type: String,
		    enum: ['Type I', 'Type II', 'Type III', 'N/A']
		  },
      stance: {
		    type: String,
		    enum: ['Regular', 'Goofy', 'N/A']
		  },
      rentalType: {
		    type: String,
		    enum: [
          'Adult Ski Package',
          'Adult Ski Only',
          'Adult Snowboard Package',
          'Adult Snowboard Only',
          'Junior Ski Package',
          'Junior Ski Only',
          'Junior Snowboard Package',
          'Junior Snowboard Only'
        ]
		  },
      packageType: {
		    type: String,
		    enum: [
          'Sport',
          'Performance',
          'Demo'
        ]
		  },
      rentalEquip: { type: mongoose.Schema.Types.ObjectId, ref: 'Equipment' }

});

module.exports = mongoose.model('Renter', RenterSchema);
