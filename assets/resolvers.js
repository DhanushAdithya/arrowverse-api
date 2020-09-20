const splitToChunks = items => {
	const result = []
	for (let i = 0; i < items.length; i += 50) {
		result.push(items.slice(i, i + 50))
	}
	return result
}

const all = (items, fn) => Promise.all(items.map(item => fn(item)))

const series = (items, fn) => {
	let result = []
	return items
		.reduce((acc, item) => {
			acc = acc.then(() => {
				return fn(item).then(res => result.push(res))
			})
			return acc
		}, Promise.resolve())
		.then(() => result)
}

module.exports = {
	splitToChunks,
	all,
	series,
}
