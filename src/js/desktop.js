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
    this.windowscol = []
  }

  connectedCallback () {
    this.clickedIcon()
  }

  clickedIcon () {
    this.shadowRoot.querySelectorAll('.ikon').forEach(element => {
      element.addEventListener('click', event => {
        const div = this.shadowRoot.querySelector('#endiv')
        const windowbox = document.createElement('window-box')
        this.wrapper = windowbox.shadowRoot.querySelector('#wrapper')
        this.windowscol.push(this.wrapper)
        div.appendChild(windowbox)
        this.div2 = windowbox.shadowRoot.querySelector('.div2')
        if (event.target === this.shadowRoot.querySelector('#memo')) {
          const memory = document.createElement('memory-game')
          this.div2.appendChild(memory)
        } else if (event.target === this.shadowRoot.querySelector('#chat')) {
          const chat = document.createElement('chat-app')
          this.div2.appendChild(chat)
        } else if (event.target === this.shadowRoot.querySelector('#tictac')) {
          const tictac = document.createElement('tictac-game')
          this.div2.appendChild(tictac)
        }
        this.foc(windowbox)
        this.close(windowbox)
      })
    })
  }

  foc (windowbox) {
    windowbox.shadowRoot.querySelector('#wrapper').addEventListener('click', event => {
      this.sortArray(event)
      this.zindex()
    })
  }

  sortArray (event) {
    this.windowscol.splice(event.target, 1)
    this.windowscol.push(event.target)
    console.log(this.windowscol)
  }

  zindex () {
    for (let i = this.windowscol.length - 1; i >= 0; i--) {
      this.windowscol[i].style.zIndex = i
      console.log(this.windowscol[i])
    }
  }

  close (windowbox) {
    windowbox.shadowRoot.querySelector('.close').addEventListener('click', event => {
      const wrapper = windowbox.shadowRoot.querySelector('#wrapper')
      wrapper.parentNode.removeChild(wrapper)
      this.windowscol.splice(event.target, 1)
    })
  }

  //   mouse () {
  //     window.addEventListener('mousedown', event => {
  //       event.preventDefault()
  //       this.drag = true
  //       this.prevX = event.clientX
  //       this.prevY = event.clientY
  //       console.log('funkar')
  //     })

  //     window.addEventListener('mousemove', event => {
  //       event.preventDefault()
  //       if (this.drag === true) {
  //         const newX = this.prevX - event.clientX
  //         const newY = this.prevY - event.clientY

  //         this.prevX = event.clientX
  //         this.prevY = event.clientY
  //         const rect = this.div2.getBoundingClientRect()

  //         this.div2.style.left = rect.left - newX + 'px'
  //         this.div2.style.top = rect.top - newY + 'px'
  //       }
  //     })

//     window.addEventListener('mouseup', event => {
//       this.drag = false
//     })
//   }
}

window.customElements.define('desktop-view', Desktop)
