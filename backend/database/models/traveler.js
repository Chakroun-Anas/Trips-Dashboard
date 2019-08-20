const mongoose = require('mongoose');
const TravelerSchema = new mongoose.Schema({
	_id 		: { type: mongoose.Schema.Types.ObjectId, default: function () { return new mongoose.Types.ObjectId()} },
	gender: String,
	nativeCountry: String,
	age: Number,
	destination: String,
	date: Date
});
module.exports = mongoose.model('Traveler', TravelerSchema);