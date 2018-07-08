// src/GamesContainer.js
import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { fetchAllGames, addNewGame } from '../actions/games'
import {Link} from 'react-router-dom'
//import allowedColors from '../../../server/src/games/entity.ts'

const allowedColors=['red', 'blue', 'green', 'yellow', 'magenta'];

class GamesContainer extends PureComponent {
    static propTypes = {
      games: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
      })).isRequired
    }
  
    //constructor(props) {
    //   super(props);
    //   //this.state = {value: ''};
    //   this.state = {
    //     name: "",
    //     color: "green",
    //     board: [[" "," "," "],[" "," "," "],[" "," "," "]]
    //   }
    //   this.handleChange = this.handleChange.bind(this);
    //   this.handleSubmit = this.handleSubmit.bind(this);
    // }
  
    // handleChange(event) {
    //   this.setState({value: event.target.value});
    // }
  
    // handleSubmit(event) {
    //   console.log('A name was submitted: ' + this.state.value);
    //   event.preventDefault();
      
    // }

    state = {
      name: "",
      color: null,
      board: [[" "," "," "],[" "," "," "],[" "," "," "]]
    }

    getRandomInt = (max) => {
      return Math.floor(Math.random() * Math.floor(max));
    }

    randomColor = () => {
      return allowedColors[this.getRandomInt(allowedColors.length)]
    }

    handleSubmit = (e) => {
      // Can't change state here for some reason,why?? irritating!!
      // this.setState({
      //   color: this.randomColor()
      // })

      e.preventDefault()

      console.log(this.state,'this.state at handleSubmit')
      //this.props.onSubmit(this.state)
      this.props.addNewGame(this.state)
      
    }
  
    handleChange = (event) => {
      const {name, value} = event.target
      console.log(value,'handleChange value')
      this.setState({
        [name]: value
      })
      if (!this.state.color)
        this.setState({
          color: this.randomColor()
        })
      console.log(this.state,'this.state at handleChange')
    }

    componentWillMount() {
      this.props.fetchAllGames()
    }

    render() {
      const {games} = this.props
      return (
        <div>
            <h1>Add a new game</h1>
            <form onSubmit={this.handleSubmit}>
              <label>
               Name of the game:
              <input name="name" type="text" value={this.state.value} onChange={this.handleChange} />
              </label>
              <input type="Submit" value="Add" />
            </form>
          <h1>All games</h1>
            <table>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Color</th>
                    <th>Link to game</th>
                </tr>
                </thead>
                <tbody>
                { games.map(game => (<tr key={game.id}>
                    <td>{game.id}</td>
                    <td>{game.name}</td>
                    <td>{game.color}</td>
                    <td>
                      <Link to={ `/games/${game.id}` }>{game.name}</Link>
                    </td>
                </tr>)) }
                </tbody>
            </table>
        </div>
      )
    }
  }
  
  const mapStateToProps = function (state) {
    console.log(state.games,'state at list')
    return {
      games: state.games
    }
  }
  
  export default connect(mapStateToProps, { fetchAllGames, addNewGame })(GamesContainer)