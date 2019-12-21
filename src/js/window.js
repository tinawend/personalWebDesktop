import { wind } from './html.js'

export class WindowBox extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(wind.content.cloneNode(true))
  }

  connectedCallback () {

  }
}
window.customElements.define('window-box', WindowBox)
