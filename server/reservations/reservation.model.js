var mongoose = require('mongoose');

var ReservationSchema = new mongoose.Schema({
      createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      dateOut: { type: Date },
      dateIn: { type: Date },
      renters: [
				{ type: mongoose.Schema.Types.ObjectId, ref: 'Renter' }
			],
      totalDays: { type: Number },
      depositPaid: { type: Boolean },
      depositAmt: { type: Number },
      status: {
        type: String,
        enum: ['submitted', 'queued', 'completed'],
        default: 'submitted'
      }
});

module.exports = mongoose.model('Reservation', ReservationSchema);
