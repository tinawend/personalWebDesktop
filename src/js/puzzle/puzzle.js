import { template2 } from './htmlpuzzle.js'

export class Puzzle extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template2.content.cloneNode(true))
  }

  connectedCallback () {

  }
}

window.customElements.define('puzzle-game', Puzzle)
