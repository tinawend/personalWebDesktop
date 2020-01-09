
import { wind } from './html.js'

class WindowBox extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(wind.content.cloneNode(true))
    this.pos1 = 0
    this.pos2 = 0
    this.pos3 = 0
    this.pos4 = 0
    this.drag1 = false
  }

  connectedCallback () {
    const windows = this.shadowRoot.querySelectorAll('#wrapper')
    for (let i = 0; i < windows.length; i++) {
      const window = windows[i]
      this.drag(window)
    }
  }

  drag (element) {
    element.addEventListener('mousedown', event => {
      if (event.target === element) {
        this.mouse(event, element)
      }
    })
  }

  mouse (event, element) {
    event.preventDefault()
    this.drag1 = true
    event = event || window.event
    this.pos3 = event.clientX
    this.pos4 = event.clientY
    document.addEventListener('mousemove', event => this.move(event, element))
    document.addEventListener('mouseup', event => this.close(event, element))
  }

  move (event, element) {
    if (this.drag1 === true) {
      event.preventDefault()
      event = event || window.event
      this.pos1 = this.pos3 - event.clientX
      this.pos2 = this.pos4 - event.clientY
      this.pos3 = event.clientX
      this.pos4 = event.clientY
      // const rect = this.div2.getBoundingClientRect()

      element.style.left = (element.offsetLeft - this.pos1) + 'px'
      element.style.top = (element.offsetTop - this.pos2) + 'px'
    }
  }

  close (event) {
    this.drag1 = false
  }
}
window.customElements.define('window-box', WindowBox)
