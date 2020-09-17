const mongoose = require('mongoose')

const requiredString = {
	type: String,
	required: true,
}

const characterSchema = new mongoose.Schema({
	name: requiredString,
	also: [String],
	species: String,
	status: String,
	homeUniverse: String,
	currentUniverse: String,
	occupation: mongoose.Schema.Types.Mixed,
	affiliation: mongoose.Schema.Types.Mixed,
	family: [String],
	alterEgo: [String],
	codeName: [String],
	actor: [String],
	imgUrl: String,
})

const Character = mongoose.model('character', characterSchema)

module.exports = Character
