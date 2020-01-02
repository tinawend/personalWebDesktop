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
    this.scores = [0, 0]
    this.turn = 0
    this.winner = false
    this.winalts = [
      7, 56, 73,
      84, 146, 273,
      292, 448
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

        this.scores[this.turn] += parseInt(event.target.id)
        console.log(this.scores)

        this.win()
        if (this.turn === 0) {
          this.board[event.target.id] = this.markers[this.turn]
          event.target.textContent = this.markers[this.turn]

          this.turn = 1
        } else {
          this.board[event.target.id] = this.markers[this.turn]
          event.target.textContent = this.markers[this.turn]

          this.turn = 0
        }
      })
    }
  }

  win () {
    for (let i = 0; i < this.winalts.length; i++) {
      if (this.scores[this.turn] === this.winalts[i]) {
        console.log('Win')
      }
    }
    // this.winalts.forEach(winningcombo => {
    //   const pos = this.board
    //   const pos0inner = pos[winningcombo[0]].innerText
    //   const pos1inner = pos[winningcombo[1]].innerText
    //   const pos2inner = pos[winningcombo[2]].innerText
    //   const wincomb = (pos0inner !== '') &&
    // (pos0inner === pos1inner) &&
    // (pos1inner === pos2inner)

    //   if (wincomb) {
    //     this.winner = true
    //     console.log(pos[winningcombo[0]].innerText)
    // }
    // })
    // return this.winner
  }
}

window.customElements.define('tictac-game', TicTac)
