const mongoose = require('mongoose')

const requiredString = {
	type: String,
	required: true,
}

const familySchema = new mongoose.Schema({
	name: requiredString,
	species: [String],
	headOfTheFamily: [String],
	home: mongoose.Schema.Types.Mixed,
	goal: mongoose.Schema.Types.Mixed,
	imgUrl: String,
})

const Family = mongoose.model('family', familySchema)

module.exports = Family
