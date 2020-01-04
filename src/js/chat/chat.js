import { template1 } from './htmlchat.js'

export class Chat extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template1.content.cloneNode(true))
    this.chatDiv = this.shadowRoot.querySelector('.chat')
  }

  connectedCallback () {
    this.chatDiv.addEventListener('keypress', event => {
      if (event.keyCode === 13) {
        this.sendMessage(event.target.value)
        event.target.value = ''
        event.preventDefault()
      }
    })
  }

  connect () {
    this.socket = new window.WebSocket('ws://vhost3.lnu.se:20080/socket/')
  }

  sendMessage (text) {
    console.log('sending message', text)
  }
}

window.customElements.define('chat-app', Chat)
