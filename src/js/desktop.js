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
  }

  /**
 *
 */
  connectedCallback () {
    this.clickedIcon()
  }

  /**
 * depending on what icon is clicked you get a window with an application
 */
  clickedIcon () {
    this.shadowRoot.querySelectorAll('.ikon').forEach(element => {
      element.addEventListener('click', event => {
        const div = this.shadowRoot.querySelector('#endiv')
        const windowbox = document.createElement('window-box')
        this.wrapper = windowbox.shadowRoot.querySelector('#wrapper')
        this.windowscol.push(this.wrapper)
        div.appendChild(windowbox)
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
 * sets focus to the last element in an array
 * @param {*} windowbox
 */
  foc (windowbox) {
    windowbox.shadowRoot.querySelector('#wrapper').addEventListener('click', event => {
      this.sortArray(event)
      this.zindex()
    })
  }

  /**
 * sorts the array, the clicked item is taken out and put last in array
 * @param {*} event
 */
  sortArray (event) {
    this.windowscol.splice(event.target, 1)
    this.windowscol.push(event.target)
    console.log(this.windowscol)
  }

  /**
 * sets z-index to array, highest number is given to the last item in the array
 */
  zindex () {
    for (let i = this.windowscol.length - 1; i >= 0; i--) {
      this.windowscol[i].style.zIndex = i
      console.log(this.windowscol[i])
    }
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
