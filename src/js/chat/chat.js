import { template1 } from './htmlchat.js'

export class Chat extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template1.content.cloneNode(true))
  }

  connectedCallback () {

  }
}

window.customElements.define('chat-app', Chat)
