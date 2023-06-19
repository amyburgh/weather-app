import * as DOM from './DOM'

function createLogo() {
	const logo = DOM.createElement('div', {
		id: 'logo',
		textContent: 'WEATHER',
	})
	return logo
}

/*
 <div class="search-box">
  <input class="search-input" type="text" placeholder="Search something..">
  <button class="search-btn"><i class="fas fa-search"></i></button>
</div>
 */

function createSearch() {
	// const form = DOM.createElement('form', { action: '' })
	const div = DOM.createElement('div', {}, ['search-box'])

	const input = DOM.createElement(
		'input',
		{
			type: 'text',
			placeholder: 'Search Location',
		},
		['search-input']
	)

	const button = DOM.createElement('button', {}, ['search-btn'])
	const icon = DOM.createElement('i', {}, ['fas', 'fa-search'])
	button.appendChild(icon)

	div.appendChild(input)
	div.appendChild(button)
	// form.appendChild(div)
	// return form
	return div
}

function createHeader() {
	const header = DOM.createElement('header')
	const logo = createLogo()
	const search = createSearch()
	header.appendChild(logo)
	header.appendChild(search)
	return header
}

export function renderHeader(element) {
	console.log('Render: header')
	const header = createHeader()
	element.appendChild(header)
}
