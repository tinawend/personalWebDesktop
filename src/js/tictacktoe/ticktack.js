import { template2 } from './htmltoe.js'

export class TicTac extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template2.content.cloneNode(true))
  }

  connectedCallback () {

  }
}

window.customElements.define('tictac-game', TicTac)
