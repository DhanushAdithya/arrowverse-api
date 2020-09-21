const mongoose = require('mongoose')
require('dotenv').config()

const Character = require('../../../models/Character')

mongoose.connect(process.env.DB_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})

module.exports = async (req, res) => {
	const result = await Character.find()
	res.json(result)
}
