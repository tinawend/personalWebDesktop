import { desktop } from './html.js'

export class Desktop extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(desktop.content.cloneNode(true))
  }

  connectedCallback () {

  }
}
window.customElements.define('desktop-view', Desktop)
