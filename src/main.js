import './style.css'
import { renderWeather } from './weather.js'
import { renderHeader } from './header'
import { renderFooter } from './footer'
import { renderBackground } from './background'

const app = document.querySelector('#app')

function renderApp() {
	renderHeader(app)
	renderWeather(app)
	renderFooter(app)
	renderBackground('san francisco')
}

renderApp()
// window.addEventListener('load', () => {})
