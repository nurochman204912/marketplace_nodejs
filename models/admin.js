var mongoose = require('mongoose');

var AdminSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	adminname: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	admin: {
		type: Number
	}
});

var Admin = module.exports = mongoose.model('Admin', AdminSchema); 