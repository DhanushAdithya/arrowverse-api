const mongoose = require('mongoose')
require('dotenv').config()

const Character = require('../../models/Character')
const { fetchNames } = require('../../fetchers')
const fromUrl = require('../../scrapers/characterScraper')

mongoose.connect(process.env.DB_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})

module.exports = async (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS')
	if (req.method === 'OPTIONS') {
		res.status(200).end()
		return
	}

	const { id = '', page = 1, limit = 10, all = 'false', only = '' } = req.query

	if (id === '' && all !== 'true' && only !== 'names') {
		const result = await Character.find()
		res.json(result.slice(+page * +limit - +limit, +page * +limit))
	} else if (id !== '' && only !== 'names') {
		const result = await Character.findById(id)
		res.json(result)
	} else if (all === 'true' && only !== 'names') {
		const result = await Character.find()
		res.json(result)
	} else if (only === 'names') {
		Promise.all(fromUrl.map(from => fetchNames('Characters', from)))
			.then(data => {
				data = data.reduce((acc, val) => acc.concat(val), [])
				return data
			})
			.then(names => {
				res.json({
					names,
				})
			})
	} else {
		res.json({
			error: 'Unknown Error',
		})
	}
}
