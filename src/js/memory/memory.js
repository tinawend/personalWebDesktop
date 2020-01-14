import { template, fourOrTwo } from './htmlmemory.js'
/**
 * @class Memory
 * @extends {window.HTML}
 */
export class Memory extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(fourOrTwo.content.cloneNode(true))
    this.turn1 = this.turn1
    this.turn2 = this.turn2
    this.lastTile = this.lastTile
    this.pairs = 0
    this.tries = 0
  }

  /**
 * depending on witch button is clicked you get different gameboards
 */
  connectedCallback () {
    this.shadowRoot.querySelectorAll('button').forEach(item => {
      item.addEventListener('click', event => {
        if (event.target.matches('#four')) {
          this.cleanUp()
          this.rows = 4
          this.cols = 4
          this.tiles = this.shuffle(this.rows, this.cols)
          this.shadowRoot.appendChild(template.content.cloneNode(true))
          this.showPics(this.rows, this.cols)
        } else if (event.target.matches('#two')) {
          this.cleanUp()
          this.rows = 2
          this.cols = 2
          this.tiles = this.shuffle(this.rows, this.cols)
          this.shadowRoot.appendChild(template.content.cloneNode(true))
          this.showPics(this.rows, this.cols)
        } else if (event.target.matches('#twofour')) {
          this.cleanUp()
          this.rows = 2
          this.cols = 4
          this.tiles = this.shuffle(this.rows, this.cols)
          this.shadowRoot.appendChild(template.content.cloneNode(true))
          this.showPics(this.rows, this.cols)
        }
      })
    })
  }

  /**
 * removes all html content in template
 */
  cleanUp () {
    while (this.shadowRoot.firstChild) {
      this.shadowRoot.removeChild(this.shadowRoot.firstChild)
    }
  }

  /**
 * shows the memopics if enter or mouse is clicked
 */
  showPics () {
    const pics = this.shadowRoot.querySelector('#pics')
    let img
    this.tiles.forEach((tile, index) => {
      const a = document.createElement('a')
      a.setAttribute('href', '#')
      img = document.createElement('img')
      img.setAttribute('src', 'image/0.png')
      pics.appendChild(a)
      a.appendChild(img)

      img.addEventListener('click', event => {
        this.turnBrick(tile, index, event.target)
      })
      a.addEventListener('keydown', event => {
        if (event.keyCode === 13) {
          this.turnBrick(tile, index, event.target)
        }
      })
      if ((index + 1) % this.cols === 0) {
        pics.appendChild(document.createElement('br'))
      }
    })
  }

  /**
 * shows the memobrick and gives a winningstatment if all are paired
 * @param {*} tile
 * @param {*} index
 * @param {*} img
 */
  turnBrick (tile, index, img) {
    if (this.turn2) {
      return
    }
    img = img.nodeName === 'IMG' ? img : img.firstElementChild
    img.src = 'image/' + tile + '.png'
    if (!this.turn1) {
      this.turn1 = img
      this.lastTile = tile
    } else {
      if (img === this.turn1) {
        return
      }
      this.tries += 1
      this.turn2 = img
      if (tile === this.lastTile) {
        this.pairs += 1
        if (this.pairs === (this.cols * this.rows) / 2) {
          this.shadowRoot.querySelector('#win').textContent = 'you won on ' + this.tries + ' tries'
          this.shadowRoot.querySelector('h2').textContent = 'congratulations!'
        }
        setTimeout(() => {
          this.turn1.parentNode.classList.add('removed')
          this.turn2.parentNode.classList.add('removed')

          this.turn1 = null
          this.turn2 = null
        }, 200)
      } else {
        setTimeout(() => {
          this.turn1.src = 'image/0.png'
          this.turn2.src = 'image/0.png'

          this.turn1 = null
          this.turn2 = null
        }, 800)
      }
    }
  }

  /**
 * shuffles the bricks randomly
 * fisher yates shuffle
 * @param {number} rows
 * @param {number} cols
 * @returns shuffled array
 */
  shuffle (rows, cols) {
    const arr = []
    for (let i = 1; i <= (rows * cols) / 2; i++) {
      arr.push(i)
      arr.push(i)
    }

    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      const temp = arr[i]
      arr[i] = arr[j]
      arr[j] = temp
    }
    this.tiles = arr
    return arr
  }
}

window.customElements.define('memory-game', Memory)
