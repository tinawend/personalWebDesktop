import { desktop } from './html.js'
import './memory/memory.js'
import './chat/chat.js'
import './tictacktoe/ticktack.js'
import './window.js'
/**
 * @class Desktop
 * @extends {window.HTML}
 */
export class Desktop extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(desktop.content.cloneNode(true))
    this.windowscol = []
    this.zIndex = 0
  }

  /**
 *
 */
  connectedCallback () {
    this.clickedIcon()
  }

  /**
 * depending on what icon is clicked you get an offset window with an application
 *
 */
  clickedIcon () {
    this.shadowRoot.querySelectorAll('.ikon').forEach(element => {
      element.addEventListener('click', event => {
        const div = this.shadowRoot.querySelector('#endiv')
        const windowbox = document.createElement('window-box')
        this.wrapper = windowbox.shadowRoot.querySelector('#wrapper')
        this.windowscol.push(this.wrapper)
        div.appendChild(windowbox)

        const lastIndex = (this.windowscol.length <= 1 ? 0 : this.windowscol.length - 1)
        if (this.windowscol.length <= 200) {
          this.windowscol[lastIndex].style.top = parseInt(lastIndex + 10) + 'px'
          this.windowscol[lastIndex].style.left = parseInt(lastIndex + 10) + 'px'
        } else if (this.windowscol.length > 200) {
          this.windowscol[lastIndex].style.left = parseInt(lastIndex + 400) + 'px'
          this.windowscol[lastIndex].style.top = parseInt(lastIndex - 190) + 'px'
        }

        this.app = windowbox.shadowRoot.querySelector('.app')
        if (event.target === this.shadowRoot.querySelector('#memo')) {
          const memory = document.createElement('memory-game')
          this.app.appendChild(memory)
        } else if (event.target === this.shadowRoot.querySelector('#chat')) {
          const chat = document.createElement('chat-app')
          this.app.appendChild(chat)
        } else if (event.target === this.shadowRoot.querySelector('#tictac')) {
          const tictac = document.createElement('tictac-game')
          this.app.appendChild(tictac)
        }

        this.foc(windowbox)
        this.close(windowbox)
      })
    })
  }

  /**
 * sets focus to the first element in an array
 * @param {*} windowbox
 */
  foc (windowbox) {
    windowbox.shadowRoot.querySelector('#wrapper').addEventListener('click', event => {
      this.sortArray(event)
      this.zindex()
    })
  }

  /**
 * sorts the array, the clicked item is taken out and put first in array
 * @param {*} event
 */
  sortArray (event) {
    this.windowscol.splice(event.target, 1)
    this.windowscol.unshift(event.target)
  }

  /**
 * sets z-index to array, highest number is given to the first item in the array
 */
  zindex () {
    this.zIndex += 1
    this.windowscol[0].style.zIndex = this.zIndex
  }

  /**
 * closes a window when the X button is clicked
 * @param {*} windowbox
 */
  close (windowbox) {
    windowbox.shadowRoot.querySelector('.close').addEventListener('click', event => {
      const wrapper = windowbox.shadowRoot.querySelector('#wrapper')
      wrapper.parentNode.removeChild(wrapper)
      this.windowscol.splice(event.target, 1)
    })
  }
}

window.customElements.define('desktop-view', Desktop)
