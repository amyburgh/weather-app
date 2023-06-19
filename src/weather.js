const API_URL_BASE = 'http://api.weatherapi.com/v1/forecast.json'
const API_KEY = '7bead80f46274730987125643230906'
import * as DOM from './DOM'

class Weather {
	constructor(data) {
		this.current = data.current
		this.location = data.location
	}
}

export async function getWeather(location) {
	try {
		const response = await fetch(
			`${API_URL_BASE}?key=${API_KEY}&q=${location}&days=7&aqi=no&alerts=no`
		)
		if (!response.ok) throw new Error('Network response was not OK')

		const jsonData = await response.json()
		console.log(jsonData)
		return jsonData
	} catch (error) {
		console.error('My Error: ', error)
	}
}

// @param {number} epoch in seconds
function formatDate(epoch) {
	const dateObj = new Date(epoch * 1000)
	const hour = () =>
		dateObj.toLocaleTimeString('en-us', {
			hour: 'numeric',
		})
	const time = () =>
		dateObj.toLocaleTimeString('en-us', {
			hour: 'numeric',
			minute: 'numeric',
		})
	const date = () =>
		dateObj.toLocaleDateString('en-gb', {
			weekday: 'short',
			month: 'short',
			day: 'numeric',
		})
	const week = () => dateObj.toLocaleDateString('en-us', { weekday: 'long' })
	return {
		hour,
		time,
		date,
		week,
	}
}

function createLocation(data) {
	const location = DOM.createElement('div', {}, ['location'])
	const city = DOM.createElement('h1', {
		innerText: `${data.name}`, // add icon
	})
	const output = formatDate(data.localtime_epoch).date()
	const time = DOM.createElement('p', {
		innerText: output,
	})
	location.appendChild(city)
	location.appendChild(time)
	return location
}

function createCurrentTemp(current) {
	const temp = DOM.createElement('div', {
		id: 'current-temp',
		innerText: current.temp_c,
	})
	const degree = DOM.createElement('span', { innerText: '°c' })

	temp.appendChild(degree)
	return temp
}

function createCurrentCondition(current) {
	const condition = DOM.createElement(
		'p',
		{ innerText: current.condition.text },
		['weather-condition']
	)
	return condition
}

function createCurrentIcon(current) {
	const img = DOM.createElement(
		'img',
		{ src: current.condition.icon, alt: current.condition.text },
		['large-icon']
	)
	return img
}

function createCurrent(json) {
	const location = json.location
	const current = json.current

	const container = DOM.createElement('div', {}, ['current'])

	const elements = []
	elements.push(createLocation(location))
	elements.push(createCurrentTemp(current))
	elements.push(createCurrentCondition(current))
	elements.push(createCurrentIcon(current))

	elements.forEach((item) => container.appendChild(item))

	return container
}

// @param {array} icon_class
function conditionItem(name, value, icon_class) {
	const item = DOM.createElement('ul')

	const iconWrap = DOM.createElement('li', {}, icon_class)
	const icon = DOM.createElement('i', {}, [icon_class])
	iconWrap.appendChild(icon)
	const info = DOM.createElement('li', { innerText: value })
	const desc = DOM.createElement('li', { innerText: name })

	item.append(iconWrap, info, desc)
	return item
}

function createConditions(json) {
	const data = json.current

	const options = {
		wind_kph: {
			desc: 'wind',
			value: `${data.wind_kph} km/h`,
			icon: ['fa-solid', 'fa-wind'],
		},
		wind_dir: {
			desc: 'wind direction',
			value: `${data.wind_dir}`,
			icon: ['fa-solid', 'fa-compass'],
		},
		humidity: {
			desc: 'humidity',
			value: `${data.humidity} %`,
			icon: ['fa-solid', 'fa-droplet'],
		},
		rain: {
			desc: 'chance of rain',
			value: `${json.forecast.forecastday[0].day.daily_chance_of_rain} %`,
			icon: ['fa-solid', 'fa-umbrella'],
		},
	}

	const container = DOM.createElement('div', {}, ['conditions'])

	const heading = DOM.createElement('h2', { innerText: 'conditions' }, [])
	const props = DOM.createElement('ul')
	for (const key in options) {
		const item = conditionItem(
			options[key].desc,
			options[key].value,
			options[key].icon
		)
		props.appendChild(item)
	}
	container.appendChild(heading)
	container.appendChild(props)

	return container
}

function hourlyItem(time, iconURL, temp) {
	const item = DOM.createElement('ul')

	const iTime = DOM.createElement('li', {
		innerText: formatDate(time).hour(),
	})
	const iWrap = DOM.createElement('li')
	const iconImg = DOM.createElement('img', { src: iconURL })
	iWrap.appendChild(iconImg)
	const iTemp = DOM.createElement('li', { innerText: `${temp}°` })

	item.append(iTime, iWrap, iTemp)
	return item
}

function createHourly(json) {
	const today = json.forecast.forecastday[0].hour
	const tomorrow = json.forecast.forecastday[1].hour
	const array = today.concat(tomorrow)

	const container = DOM.createElement('div', {}, ['hourly'])
	const heading = DOM.createElement('h2', { innerText: 'today' })
	const list = DOM.createElement('li')

	const time = json.location.localtime_epoch
	let hours = 12
	for (const val of array) {
		if (val.time_epoch < time) continue
		else if (hours > 0) {
			const item = hourlyItem(val.time_epoch, val.condition.icon, val.temp_c)
			list.appendChild(item)
			hours -= 1
		}
	}

	container.appendChild(heading)
	container.appendChild(list)
	return container
}

function dailyItem(dayOfWeek, iconURL, condition, maxTemp, minTemp) {
	const item = DOM.createElement('ul')

	const iDay = DOM.createElement('li', { innerText: dayOfWeek })

	const iWrap = DOM.createElement('li')
	const iconImg = DOM.createElement('img', { src: iconURL })
	iWrap.appendChild(iconImg)

	const iText = DOM.createElement('li', { innerText: condition })
	const iTemp = DOM.createElement('li', {
		innerText: `H: ${maxTemp}° L: ${minTemp}°`,
	})

	item.append(iDay, iWrap, iText, iTemp)

	return item
}

function createDaily(json) {
	const array = json.forecast.forecastday

	const container = DOM.createElement('div', {}, ['daily'])
	const heading = DOM.createElement('h2', { innerText: 'next 7 days' })
	const list = DOM.createElement('li')

	console.log(array)
	for (const val of array) {
		const item = dailyItem(
			'Today',
			val.day.condition.icon,
			val.day.condition.text,
			val.day.maxtemp_c,
			val.day.mintemp_c
		)
		list.appendChild(item)
	}

	container.appendChild(heading)
	container.appendChild(list)
	return container
}

async function createWeatherElements() {
	const weatherData = await getWeather('auto:ip')
	const main = document.createElement('main')

	const elements = []
	elements.push(createCurrent(weatherData))
	elements.push(createConditions(weatherData))
	elements.push(createHourly(weatherData))
	elements.push(createDaily(weatherData))

	elements.forEach((item) => main.appendChild(item))
	return main
}

export async function renderWeather(parent) {
	console.log('Render: weather')

	const main = await createWeatherElements()

	parent.appendChild(main)
}
