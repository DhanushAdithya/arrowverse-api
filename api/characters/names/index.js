const { fetchNames } = require('../../../fetchers')
const fromUrl = require('../../../scrapers/characterScraper')

module.exports = async (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS')
	if (req.method === 'OPTIONS') {
		res.status(200).end()
		return
	}

	Promise.all(fromUrl.map(from => fetchNames(from)))
		.then(data => {
			data = data.reduce((acc, val) => acc.concat(val), [])
			return data
		})
		.then(names => {
			res.json({
				names,
			})
		})
}
