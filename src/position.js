function getGeolocation(options = { timeout: 10000 }) {
	if (navigator.geolocation) {
		return new Promise((resolve, reject) =>
			navigator.geolocation.getCurrentPosition(resolve, reject, options)
		)
	} else {
		console.error('ERROR: ', 'Geolocation not supported')
		return new Promise((resolve) => resolve({}))
	}
}

export async function getPosition() {
	try {
		const position = await getGeolocation()
		return {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude,
		}
	} catch (err) {
		console.error('ERROR: ', err.message)
	}
}
