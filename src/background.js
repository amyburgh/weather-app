import * as DOM from './DOM'
const UNSPLASH_URL = 'https://api.unsplash.com/search/photos/'
const API_KEY = 'RjAZRI8raM36syiaKRdFz3axKpcRelk0fnP5p4RJ0Ps'
const IMAGE_QUALITY = '&w=1500&dr=2'

async function getBackgroundData(location) {
	try {
		const url = `${UNSPLASH_URL}?client_id=${API_KEY}&query=${location}`
		const request = await fetch(url)
		const data = await request.json()
		return data
	} catch (err) {
		console.error('Error: ', err)
	}
}

async function getBackground(location) {
	try {
		const data = await getBackgroundData(location)
		let bestImage = data.results[0] // arraySize: 10
		data.results.forEach((item) => {
			if (item.likes > bestImage.likes) bestImage = item
		})
		return bestImage
	} catch (err) {
		console.error('ERROR_GET: ', err)
	}
}

export async function renderBackground(location) {
	console.log('Render: background')
	console.log(location)
	const imgData = await getBackground(location)
	const imgSize = `${imgData.urls.raw}${IMAGE_QUALITY}`

	DOM.styleElement(DOM.body, {
		background: `url(${imgSize})`,
		'background-repeat': 'no-repeat',
		'background-size': 'cover',
		'background-position': 'center',
	})
}
