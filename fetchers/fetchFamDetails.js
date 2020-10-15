const axios = require('axios')
const { default: parse } = require('node-html-parser')

const fetchFamDetails = async name => {
	const response = await axios.get(
		`${encodeURI(`https://arrow.fandom.com/wiki/${name.replace(' ', '_')}`)}`
	)
	const html = parse(response.data)
	const key = html.querySelectorAll('.pi-data-label').map(_ =>
		_.childNodes[0].rawText
			.trim()
			.split(' ')
			.map((e, i) =>
				i > 0 ? e.charAt(0).toUpperCase() + e.slice(1) : e.toLowerCase()
			)
			.join('')
	)
	const value = html.querySelectorAll('.pi-data-value').map(_ => {
		const val = _.innerHTML
			.replace(/<table(.*)>(.*)<\/table>/g, '')
			.split('<br>')
			.join('\n')
			.replace(/<small>(.*)<\/small>/g, '$1')
			.replace(/<i>(.*)<\/i>/g, '$1')
			.replace(/<p>(.*?)<\/p>/g, '\n$1')
			.replace(/<a(.*?)>(.*?)<\/a>/g, '$2')
			.replace(/(<\/small>|<\/i>)/g, '')
			.replace(/<span(.*?)>(.*)<\/span>/g, '$2')
			.replace(/&\w{3,4};/g, ' ')
			.trim()
			.split('\n')
			.filter(e => !(e.length < 2))
		return val
	})

	const family = key.reduce((fam, eq, i) => {
		if (eq === 'home(s)' || eq === 'goal(s)') {
			const [iOriginal, iNew] = [
				value[i].indexOf('<b>Original multiverse</b>'),
				value[i].indexOf('<b>New multiverse</b>'),
			]
			if (iOriginal > -1 && iNew > -1) {
				let occAff = {}
				occAff.originalMultiverse = value[i].slice(iOriginal + 1, iNew)
				occAff.newMultiverse = value[i].slice(iNew + 1, value[i].length)
				fam[eq.slice(0, -3)] = occAff
				return fam
			} else if (iOriginal > -1) {
				let occAff = {}
				occAff.originalMultiverse = value[i].slice(
					iOriginal + 1,
					value[i].length
				)
				fam[eq.slice(0, -3)] = occAff
				return fam
			} else if (iNew > -1) {
				let occAff = {}
				occAff.newMultiverse = value[i].slice(iNew + 1, value[i].length)
				fam[eq.slice(0, -3)] = occAff
				return fam
			} else {
				fam[eq.slice(0, -3)] = value[i]
				return fam
			}
		} else if (eq === 'headOfTheFamily/s') {
			fam['headOfTheFamily'] = value[i]
			return fam
		} else {
			fam[eq] = value[i]
			return fam
		}
	}, {})

	family.name = name.replace(/_/g, ' ')
	const img = html.querySelector('.pi-image-thumbnail')
	family.imgUrl = img
		? img.getAttribute('src').split(/(\.png)/)[0] + '.png'
		: ''
	return family
}

module.exports = fetchFamDetails
