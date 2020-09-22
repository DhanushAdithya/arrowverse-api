const axios = require('axios')

test('Scraped characters should be equal to DB characters (length)', () => {
	axios
		.get('https://arrowverse-api.vercel.app/api/characters/all')
		.then(({ data }) => data.length)
		.then(result => {
			axios
				.get('https://arrowverse-api.vercel.app/api/characters/names')
				.then(({ data }) => {
					expect(data.names.length).toBe(result)
				})
		})
})
