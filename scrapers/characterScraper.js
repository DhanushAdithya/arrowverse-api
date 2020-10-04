const mongoose = require('mongoose')

const Character = require('../models/Character')
const { fetchNames, fetchCharDetails } = require('../fetchers')
const { splitToChunks, all, series } = require('../assets/resolvers')

require('dotenv').config()

mongoose.connect(process.env.DB_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})

const fetchAllDetails = names => {
	let allChar = []
	const chunks = splitToChunks(names)
	return series(chunks, chunk =>
		all(chunk, fetchCharDetails).then(res => (allChar = allChar.concat(res)))
	).then(() => allChar)
}

const fromUrl = [
	'',
	'Bam',
	'Carnahan%2C+Gavin%0AGavin+Carnahan',
	'Corben%2C+John%0AJohn+Corben',
	'Dox%2C+Querl+(Earth-TUD16)%0AQuerl+Dox+(Earth-TUD16)',
	'Freeman%2C+Julia%0AJulia+Freeman',
	'Hart',
	"Jefferson+Pierce's+Earth-2+doppelgänger",
	'Kyle%2C+S.%0AS.+Kyle',
	'Malone%2C+Billy%0ABilly+Malone',
	'Muhunnad',
	'Plastino',
	'Rory',
	'Snow%2C+Thomas%0AThomas+Snow',
	'Tolibao%2C+Hoshaw%0AHoshaw+Tolibao',
	'West%2C+Iris+(Earth-27)%0AIris+West+(Earth-27)',
]

let totalEntries = 0

Promise.all(fromUrl.map(from => fetchNames('Characters', from)))
	.then(data => {
		data = data.reduce((arr, val) => arr.concat(val), [])
		totalEntries = data.length
		return data
	})
	.then(fetchAllDetails)
	.then(details => details.reduce((arr, val) => arr.concat(val), []))
	.then(result => Character.create(result))
	.then(() => console.log(`Added ${totalEntries} characters`))
	.catch(err => console.log(err))

module.exports = fromUrl
