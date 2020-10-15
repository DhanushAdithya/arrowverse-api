const mongoose = require('mongoose')

const Family = require('../models/Family')
const { fetchNames, fetchFamDetails } = require('../fetchers')
const { splitToChunks, all, series } = require('../assets/resolvers')

require('dotenv').config()

mongoose.connect(process.env.DB_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})

const fetchAllDetails = families => {
	let allFamily = []
	const chunks = splitToChunks(families)
	return series(chunks, chunk =>
		all(chunk, fetchFamDetails).then(
			res => (allFamily = allFamily.concat(res))
		)
	).then(() => allFamily)
}

const fromUrl = ['']

let totalEntries = 0

Promise.all(fromUrl.map(from => fetchNames('Families', from)))
	.then(data => {
		data = data.reduce((arr, val) => arr.concat(val), [])
		totalEntries = data.length
		return data
	})
	.then(fetchAllDetails)
	.then(details => details.reduce((arr, val) => arr.concat(val), []))
	.then(result => Family.create(result))
	.then(() => console.log(`Added ${totalEntries} families`))
	.catch(err => console.log(err))
