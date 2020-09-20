const axios = require('axios')
const { default: parse } = require('node-html-parser')

const fetchCharDetails = async name => {
	const response = await axios.get(
		`${encodeURI(
			`https://arrow.fandom.com/wiki/${name
				.replace(' ', '_')
				.replace('&amp;', '&')}`
		)}`
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
			.replace(/<a(.*?)>(.*?)<\/a>/g, '$2')
			.replace(/(<\/small>|<\/i>)/g, '')
			.replace(/<span(.*?)>(.*)<\/span>/g, '$2')
			.replace(/&\w{3,4};/g, ' ')
			.trim()
			.split('\n')
			.filter(e => !(e.length < 2))
		return val
	})

	const character = key.reduce((char, eq, i) => {
		if (eq === 'status') {
			char[eq] = value[i][0]
			return char
		} else if (eq === 'species') {
			char[eq] = value[i][0].replace(/<b>(.*)<\/b>/g, '$1')
			return char
		} else if (eq === 'homeUniverse') {
			char[eq] = value[i][0]
			return char
		} else if (eq === 'currentUniverse') {
			char[eq] = value[i][0]
			return char
		} else if (eq === 'occupation' || eq === 'affiliation') {
			const [iOriginal, iNew] = [
				value[i].indexOf('<b>Original multiverse</b>'),
				value[i].indexOf('<b>New multiverse</b>'),
			]
			if (iOriginal > -1 && iNew > -1) {
				let occAff = {}
				occAff.originalMultiverse = value[i].slice(iOriginal + 1, iNew)
				occAff.newMultiverse = value[i].slice(iNew + 1, value[i].length)
				char[eq] = occAff
				return char
			} else if (iOriginal > -1) {
				let occAff = {}
				occAff.originalMultiverse = value[i].slice(
					iOriginal + 1,
					value[i].length
				)
				char[eq] = occAff
				return char
			} else if (iNew > -1) {
				let occAff = {}
				occAff.newMultiverse = value[i].slice(iNew + 1, value[i].length)
				char[eq] = occAff
				return char
			} else {
				char[eq] = value[i]
				return char
			}
		} else {
			char[eq] = value[i]
			return char
		}
	}, {})
	character.name = name.replace(/_/g, ' ').replace('&amp;', '&')
	const img = html.querySelector('.pi-image-thumbnail')
	character.imgUrl = img
		? img.getAttribute('src').split(/(\.png)/)[0] + '.png'
		: ''
	character.also = html
		.querySelectorAll('.pi-tab-link')
		.map(_ => _.childNodes[0].text.trim())
	return character
}

module.exports = fetchCharDetails
