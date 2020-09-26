const mongoose = require('mongoose')

const locationSchema = new mongoose.Schema({
	name: String,
	image: String,
	location: String,
	use: String,
	owner: String,
	show: String,
})

const Location = mongoose.model('location', locationSchema)

module.exports = Location
