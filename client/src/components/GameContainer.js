// src/components/GameContainer.js
import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import { fetchGame, updateGame } from '../actions/games'

class GameContainer extends PureComponent {

    static propTypes = {
        name: PropTypes.string.isRequired
      }

    state = {
      game: {
        name:'',
        color:'',
        board:''
      },
      message: '',
      playSymbol: 'x',
      winner:null
    }

    componentWillMount(props) {
      // Get the game from the database and put it in store
      this.props.fetchGame(this.props.match.params.id)
    }

    buttonStyle = () => {
      return {
      color: this.props.game.color,
      backgroundColor: 'white',
      fontSize: 40,
      textAlign: 'center',
      borderStyle: 'solid',
      height: 60,
      width: 60
      }
    }

    checkWinnerRows = (playSymbol) => {
      // Check the rows for a winnner
      const board=this.props.game.board
      for (let r=0;r<3;r++) {
        if (board[r][0]===playSymbol && 
            board[r][1]===playSymbol && 
            board[r][2]===playSymbol) {
          this.setState({
            message: 'we have a winner on row ' + (r+1),
            winner: playSymbol
          })
          return true
        }
      } 
      return false
    }

    checkWinnerCols = (playSymbol) => {
      // Check the columns for a winnner
      const board=this.props.game.board
      for (let c=0;c<3;c++) {
        if (board[0][c]===playSymbol && 
            board[1][c]===playSymbol && 
            board[2][c]===playSymbol) {
          this.setState({
            message: 'we have a winner on column ' + (c+1),
            winner: playSymbol
          })
          return true
        }
      } 
      return false
    }

    checkWinnerDiags = (playSymbol) => {
      // Check the diagonals for a winnner
      const board=this.props.game.board
      if (board[0][0]===playSymbol && 
          board[1][1]===playSymbol && 
          board[2][2]===playSymbol) {
        this.setState({
          message: 'we have a diagonal winner',
          winner: playSymbol
        })
        return true
      }
      if (board[0][2]===playSymbol && 
          board[1][1]===playSymbol && 
          board[2][0]===playSymbol) {
        this.setState({
          message: 'we have a diagonal winner',
          winner: playSymbol
        })
        return true
      }
      return false
    }

    checkWinner = () => {
      // Check all win possibilities for both players and 
      // if found stop searching (return)
      if (this.checkWinnerRows('x')) return true
      if (this.checkWinnerRows('o')) return true
      if (this.checkWinnerCols('x')) return true
      if (this.checkWinnerCols('o')) return true
      if (this.checkWinnerDiags('x')) return true
      if (this.checkWinnerDiags('o')) return true
      return false
    }

    allCellsFilled = () => {
      const board=this.props.game.board
      let x=0
      board.map(row => {
        return row.map (cell => {
          if (cell !== ' ')
            x++
        })
      })
      if (x===9) return true
      return false
    }

    updateGame = () => {
      // Change the board in the database ans store after a
      // valid play
      const newBoard = { 
        name:this.props.game.name,
        color:this.props.game.color,
        board:this.props.game.board
      }
      this.props.updateGame(this.props.match.params.id,newBoard)

    }

    checkWinnerTie = () => {
      // Check whether there is a winner 
      // (including case were game is revisited)
      if (this.checkWinner()) return true

      // If all cells are filled and there is no winner
      // it is a tie
      if (this.allCellsFilled()) {
        this.setState({
          message: 'The game resulted in a tie'
        })
        return true
      }

      return false
    }
    play = (rowIndex,colIndex) => {
      // Check whether there is a winner or a tie
      // (including case were game is revisited)
      if (this.checkWinnerTie())
        return

      this.setState({
        message: ''
      })

      const cellVal = this.props.game.board[rowIndex][colIndex]
      if (cellVal === ' ') {
        // Cell is still empty, play is allowed
        // Set the cell to the player symbol, x or o
        this.props.game.board[rowIndex][colIndex]=this.state.playSymbol
        // Update the board in database and store
        this.updateGame()
        // Swap the player symbol
        if (this.state.playSymbol==='x')
          this.setState({
            playSymbol: 'o'
          })
        else
          this.setState({
            playSymbol: 'x'
          })
      }
      else 
        // Cell is already occupied, don't allow play
        this.setState({
          message: 'invalid play'
        })

      // Check whether there is a winner or a tie
      this.checkWinnerTie()
    }

    showRow = (row,rowIndex) => {
      return <div> 
        {row.map((cell,colIndex) => {
            return <button id={colIndex} style={this.buttonStyle()} 
                           onClick={() => this.play(rowIndex,colIndex)}>{cell}</button>})
            }
            {/* return <button style={{ color: this.props.game.color }                          
                                  } 
                           onclick="myFunction()">{cell}</button>})
            }  */}
            </div>
    }

    render() {
      const {game} = this.props
      if (!game) return null
      return (
        // Show the game on the /games/:id page
        <div>
          <Link to={ `/games/` }>Go to the games list</Link>
          <h1>{ game.name }</h1>
          <div>
              {this.props.game.board.map((row,rowIndex) => {
                return this.showRow(row,rowIndex)
              })}  
          </div>
          <br/>
          <div> {this.state.message} </div>
        </div>
      )
    }
  }
  
  const mapStateToProps = function (state, props) {
    console.log(state.game,'state at details')
    return {
        game: state.game
    }
  }
  
  export default connect(mapStateToProps, { fetchGame, updateGame })(GameContainer)
