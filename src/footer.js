import * as DOM from './DOM'

function createAttribution(name, link) {
	const div = DOM.createElement('div', {}, ['attribution'])

	const nameAttr = DOM.createElement('a', {
		textContent: name,
		href: link,
		target: '_blank',
	})

	const siteAttr = DOM.createElement('a', {
		textContent: 'unsplash.com',
		href: 'https://unsplash.com/',
		target: '_blank',
	})

	div.append('📷 ', nameAttr, ' • ', siteAttr)
	return div
}

function createGithubLink() {
	const link = DOM.createElement(
		'a',
		{
			href: 'http://github.com/amyburgh/weather-app',
			target: '_blank',
		},
		['github']
	)

	const icon = DOM.createElement('i', {}, ['fa', 'fa-github'])
	link.appendChild(icon)
	return link
}

function createFooter() {
	const footer = DOM.createElement('footer')
	const attrDiv = createAttribution('Aaron', '#')
	const iconImg = createGithubLink()
	footer.appendChild(attrDiv)
	footer.appendChild(iconImg)
	return footer
}

export function renderFooter(element) {
	console.log('Render: footer')
	const footer = createFooter()
	element.appendChild(footer)
}
