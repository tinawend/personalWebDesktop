import { template2 } from './htmltoe.js'

export class TicTac extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template2.content.cloneNode(true))
    this.markers = ['O', 'X']
    this.players = []
    this.players[0] = this.player1
    this.players[1] = this.player2
    this.turn = 0
    this.winalts = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ]
    this.box = this.shadowRoot.querySelectorAll('.box')
  }

  connectedCallback () {
    this.startGame()
  }

  startGame () {
    this.board = Array.from(Array(9).keys())
    console.log(this.board)
    for (let i = 0; i < this.box.length; i++) {
      this.box[i].addEventListener('click', event => {
        console.log(event.target.id)

        if (this.turn === 0) {
          this.board[event.target.id] = this.markers[this.turn]
          event.target.textContent = this.markers[this.turn]

          this.turn = 1
        } else {
          this.board[event.target.id] = this.markers[this.turn]
          event.target.textContent = this.markers[this.turn]

          this.turn = 0
        }
        // if (this.box[event.target.id] === 'X') {
        //   console.log('hej')
        // }
      })
    }
  }
}

window.customElements.define('tictac-game', TicTac)
