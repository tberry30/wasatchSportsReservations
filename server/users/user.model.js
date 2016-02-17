var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
			firstName: { type: String },
			lastName: { type: String },
			username: { type: String },
			email: { type: String },
			password: { type: String },
		  role: {
		    type: String,
		    enum: ['customer'],
				default: 'customer'
		  },
			registrationDate: { type: Date, default: Date.now },
			billing: {
				address: { type: String },
				phone: { type: String },
				cc: { type: Number }
			},
			reservations: [
				{ type: mongoose.Schema.Types.ObjectId, ref: 'Reservation' }
			]
});

UserSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

UserSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
