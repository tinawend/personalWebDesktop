import { template1 } from './htmlchat.js'
/**
 *
 */
export class Chat extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template1.content.cloneNode(true))
    this.chatDiv = this.shadowRoot.querySelector('.chat')
    // this.username = ''
  }

  /**
 *
 */
  connectedCallback () {
    // this.enterUsername()
    this.chatDiv.addEventListener('keypress', event => {
      if (event.keyCode === 13) {
        this.sendMessage(event.target.value)
        event.target.value = ''
        event.preventDefault()
      }
    })

    this.connect()
    this.enterUsername()
  }

  /**
 *
 */
  enterUsername () {
    this.username = JSON.parse(window.localStorage.getItem('username'))
    this.shadowRoot.querySelector('#yourUsername').textContent = this.username
    this.shadowRoot.querySelector('#save').addEventListener('click', event => {
      event.preventDefault()
      if (event.target === this.shadowRoot.querySelector('#save')) {
        this.username = this.shadowRoot.querySelector('#username').value
        this.shadowRoot.querySelector('#yourUsername').textContent = this.username
        this.shadowRoot.querySelector('#username').value = ''
        console.log(this.username)
      }
    })
  }

  /**
 *
 */
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

  /**
 *
 * @param {*} text
 */
  sendMessage (text) {
    const data = {
      type: 'message',
      data: text,
      username: this.username,
      channel: 'my, not so secret, channel',
      key: 'eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd'
    }
    this.connect().then(function (socket) {
      socket.send(JSON.stringify(data))
    })
    window.localStorage.setItem('username', JSON.stringify(data.username))
    console.log('sending message', text)
  }

  /**
 *
 * @param {*} message
 */
  printMessage (message) {
    const template = this.chatDiv.querySelector('template')
    const messagediv = document.importNode(template.content.firstElementChild, true)
    messagediv.querySelectorAll('.text')[0].textContent = message.data
    messagediv.querySelectorAll('.author')[0].textContent = message.username + ':'
    this.chatDiv.querySelectorAll('.messages')[0].appendChild(messagediv)

    const mytexts = this.shadowRoot.querySelectorAll('.text')
    for (let i = 0; i < mytexts.length; i++) {
      if ((message.username === this.username) && (!mytexts[i].classList.contains('othertext'))) {
        mytexts[i].classList.add('mytext')
      }
      const author = this.shadowRoot.querySelectorAll('.author')
      for (let i = 0; i < author.length; i++) {
        if ((message.username === this.username) && (!mytexts[i].classList.contains('othertext'))) {
          author[i].classList.add('myauthor')
        }
      }
    }
    const othertexts = this.shadowRoot.querySelectorAll('.text')
    for (let i = 0; i < othertexts.length; i++) {
      if (othertexts[i].classList.contains('mytext') === false) {
        othertexts[i].classList.add('othertext')
      }
    }
    console.log(this.username)
  }
}

window.customElements.define('chat-app', Chat)
