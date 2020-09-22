const { fetchNames } = require('../../../fetchers')
const fromUrl = require('../../../scrapers/characterScraper')

module.exports = async (req, res) => {
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
