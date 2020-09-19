const axios = require('axios')
const { default: parse } = require('node-html-parser')

const fetchNames = async param => {
	const response = await axios.get(
		`https://arrow.fandom.com/wiki/Category:Characters?from=${param}`
	)
	const html = parse(response.data)
	const names = html
		.querySelectorAll('.category-page__member-link')
		.reduce((arr, elm) => {
			if (elm.childNodes[0].rawText.startsWith('Category:')) return arr
			else if (elm.childNodes[0].rawText.startsWith('Characters from'))
				return arr
			else if (elm.childNodes[0].rawText.startsWith('User:')) return arr
			else {
				arr.push(elm.childNodes[0].rawText.trim())
				return arr
			}
		}, [])

	return names
}

module.exports = fetchNames
