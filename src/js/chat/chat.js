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
    this.connect()
  }

  connect () {
    return new Promise(function (resolve, reject) {
      if (this.socket && this.socket.readyState === 1) {
        resolve(this.socket)
        return
      }
      this.socket = new window.WebSocket('ws://vhost3.lnu.se:20080/socket/')
      this.socket.addEventListener('open', function () {
        resolve(this.socket)
      }.bind(this))

      this.socket.addEventListener('message', event => {
        const message = JSON.parse(event.data)
        if (message.type === 'message') {
          this.printMessage(message)
        }
      })
    }.bind(this))
  }

  sendMessage (text) {
    const data = {
      type: 'message',
      data: text,
      username: 'Tina',
      channel: 'my, not so secret, channel',
      key: 'eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd'
    }
    this.connect().then(function (socket) {
      socket.send(JSON.stringify(data))
    })

    console.log('sending message', text)
  }

  printMessage (message) {
    const template = this.chatDiv.querySelector('template')
    const messagediv = document.importNode(template.content.firstElementChild, true)
    messagediv.querySelectorAll('.text')[0].textContent = message.data
    messagediv.querySelectorAll('.author')[0].textContent = message.username
    this.chatDiv.querySelectorAll('.messages')[0].appendChild(messagediv)
  }
}

window.customElements.define('chat-app', Chat)
