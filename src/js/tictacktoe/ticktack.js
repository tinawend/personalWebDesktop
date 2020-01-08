import { template2, template3 } from './htmltoe.js'

export class TicTac extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template3.content.cloneNode(true))
    this.markers = ['O', 'X']
    this.players = []
    this.players[0] = 'player 1'
    this.players[1] = 'player 2'
    this.scores = [0, 0]
    this.turn = 0
  }

  connectedCallback () {
    this.enterUsername()
    // this.startGame()
  }

  cleanUp () {
    while (this.shadowRoot.firstChild) {
      this.shadowRoot.removeChild(this.shadowRoot.firstChild)
    }
  }

  enterUsername () {
    this.shadowRoot.querySelector('#username').addEventListener('click', event => {
      event.preventDefault()
      if (event.target === this.shadowRoot.querySelector('#username')) {
        this.players[0] = this.shadowRoot.querySelector('#player1').value
        this.players[1] = this.shadowRoot.querySelector('#player2').value
        this.user()
        this.cleanUp()
      }

      console.log(this.players[0], this.players[1])
      this.startGame()
    })
  }

  user () {
    this.obj = [
      this.players[0],
      this.players[1]
    ]

    window.localStorage.setItem('username', JSON.stringify(this.obj))
  }

  startGame () {
    this.shadowRoot.appendChild(template2.content.cloneNode(true))
    this.markers = ['O', 'X']
    this.players = []
    this.scores = [0, 0]
    this.turn = 0
    this.gameOver = false
    this.winalts = [
      7, 56, 73,
      84, 146, 273,
      292, 448
    ]
    this.box = this.shadowRoot.querySelectorAll('.box')
    this.board = Array.from(Array(9).keys())
    console.log(this.board)

    for (let i = 0; i < this.box.length; i++) {
      this.box[i].addEventListener('click', event => {
        console.log(event.target.id)

        if (!this.gameOver) {
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
        }
      })
    }
  }

  win () {
    for (let i = 0; i < this.winalts.length; i++) {
      if ((this.scores[this.turn] & this.winalts[i]) === this.winalts[i]) {
        console.log('Win')
        this.shadowRoot.querySelector('h1').textContent = this.obj[this.turn] + ' Wins!'
        this.gameOver = true
      }
    }
    if (((this.scores[0] + this.scores[1]) === 511) && !this.gameOver) {
      console.log('draw')
      this.shadowRoot.querySelector('h1').textContent = 'Draw!'
      this.gameOver = true
    }
  }
}

window.customElements.define('tictac-game', TicTac)
