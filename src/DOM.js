/**
 * @param {string} element
 * @param {Object} properties
 * @param {Array} classes
 */

export const body = document.querySelector('body')

export function createElement(element = 'div', properties = {}, classes = []) {
	const e = document.createElement(element)

	for (const attr in properties) {
		e[attr] = properties[attr]
	}

	if (classes.length !== 0) e.classList.add(...classes)

	return e
}

/**
 * @param {Object} element
 * @param {Object} styles
 */

export function styleElement(element, styles) {
	for (const property in styles) {
		element.style[property] = styles[property]
	}
}
