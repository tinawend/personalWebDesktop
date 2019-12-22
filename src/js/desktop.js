import { desktop } from './html.js'
import './memory/memory.js'
import './chat/chat.js'
import './tictacktoe/ticktack.js'
import './window.js'

export class Desktop extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(desktop.content.cloneNode(true))
  }

  connectedCallback () {
    this.clickedIcon()
  }

  clickedIcon () {
    this.shadowRoot.querySelectorAll('.ikon').forEach(item => {
      item.addEventListener('click', event => {
        const div = this.shadowRoot.querySelector('#endiv')
        const windowbox = document.createElement('window-box')
        div.appendChild(windowbox)

        if (event.target === this.shadowRoot.querySelector('#memo')) {
          this.div2 = windowbox.shadowRoot.querySelector('#div2')
          const memory = document.createElement('memory-game')
          this.div2.appendChild(memory)
        } else if (event.target === this.shadowRoot.querySelector('#chat')) {
          this.div2 = windowbox.shadowRoot.querySelector('#div2')
          const chat = document.createElement('chat-app')
          this.div2.appendChild(chat)
        } else if (event.target === this.shadowRoot.querySelector('#puzzle')) {
          this.div2 = windowbox.shadowRoot.querySelector('#div2')
          const puzzle = document.createElement('tictac-game')
          this.div2.appendChild(puzzle)
        }
        this.mouse()
        this.close()
      })
    })
  }

  close () {
    const windowbox = this.shadowRoot.querySelector('window-box')
    windowbox.shadowRoot.querySelector('.close').addEventListener('click', event => {
      this.div2.style.display = 'none'
    })
  }

  mouse () {
    window.addEventListener('mousedown', event => {
      event.preventDefault()

      let prevX = event.clientX
      let prevY = event.clientY

      window.addEventListener('mousemove', event => {
        event.preventDefault()
        if (event.buttons === 0) {
          window.removeEventListener('mousedown')
          window.removeEventListener('mousemove')
        } else {
          const newX = prevX - event.clientX
          const newY = prevY - event.clientY

          prevX = event.clientX
          prevY = event.clientY
          const rect = this.div2.getBoundingClientRect()

          this.div2.style.left = rect.left - newX + 'px'
          this.div2.style.top = rect.top - newY + 'px'
        }
      })
    })
  }
}

window.customElements.define('desktop-view', Desktop)
