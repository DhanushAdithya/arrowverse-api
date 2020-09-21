const mongoose = require('mongoose')
require('dotenv').config()

const Character = require('../../models/Character')

mongoose.connect(process.env.DB_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})

module.exports = async (req, res) => {
	const { id = '5f662f48e2601d3ba4126a37' } = req.query
	const result = await Character.findById(id)
	res.json(result)
}
