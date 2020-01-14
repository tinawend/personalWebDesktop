import { template2, template3 } from './htmltoe.js'
/**
 * @class TicTac
 * @extends {window.HTML}
 */
export class TicTac extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template3.content.cloneNode(true))
    this.players = []
    this.players[0] = 'player 1'
    this.players[1] = 'player 2'
  }

  connectedCallback () {
    this.enterUsername()
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
 * able to put in two usernames, when button is clicked the game starts
 */
  enterUsername () {
    this.shadowRoot.querySelector('#username').addEventListener('click', event => {
      event.preventDefault()
      if (event.target === this.shadowRoot.querySelector('#username')) {
        this.players[0] = this.shadowRoot.querySelector('#player1').value
        this.players[1] = this.shadowRoot.querySelector('#player2').value
        this.user()
        this.cleanUp()
      }
      this.startGame()
    })
  }

  /**
 * saving player names
 */
  user () {
    this.obj = [
      this.players[0],
      this.players[1]
    ]

    window.localStorage.setItem('usernames', JSON.stringify(this.obj))
  }

  /**
 * jumping between the 2 players depending on whos turn.
 */
  startGame () {
    this.shadowRoot.appendChild(template2.content.cloneNode(true))
    this.markers = ['O', 'X']
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

    for (let i = 0; i < this.box.length; i++) {
      this.box[i].addEventListener('click', event => {
        if (!this.gameOver && event.target.textContent === '') {
          this.scores[this.turn] += parseInt(event.target.id)
          this.win()

          if (this.turn === 0 && event.target.textContent === '') {
            this.board[event.target.id] = this.markers[this.turn]
            event.target.textContent = this.markers[this.turn]

            this.turn = 1
            if (this.gameOver === false) {
              this.shadowRoot.querySelector('h1').textContent = this.obj[this.turn] + '`s turn!'
            }
          } else if (this.turn === 1 && event.target.textContent === '') {
            this.board[event.target.id] = this.markers[this.turn]
            event.target.textContent = this.markers[this.turn]

            this.turn = 0
            if (this.gameOver === false) {
              this.shadowRoot.querySelector('h1').textContent = this.obj[this.turn] + '`s turn!'
            }
          }
        }
      })
    }
  }

  /**
 * checking if someone has won or if board is full and no one wins.
 */
  win () {
    for (let i = 0; i < this.winalts.length; i++) {
      if ((this.scores[this.turn] & this.winalts[i]) === this.winalts[i]) {
        this.shadowRoot.querySelector('h1').textContent = this.obj[this.turn] + ' Wins!'
        this.gameOver = true
      }
    }
    if (((this.scores[0] + this.scores[1]) === 511) && !this.gameOver) {
      this.shadowRoot.querySelector('h1').textContent = 'Draw!'
      this.gameOver = true
    }
  }
}

window.customElements.define('tictac-game', TicTac)
