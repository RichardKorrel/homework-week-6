// src/components/GameContainer.js
import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import { fetchGame } from '../actions/games'

class GameContainer extends PureComponent {

    static propTypes = {
        name: PropTypes.string.isRequired
      }

    componentWillMount(props) {
      console.log('componentWillMount fetchGame')
      this.props.fetchGame(this.props.match.params.id)
    }

    render() {
      console.log('render GameContainer')
      const {game} = this.props
      if (!game) return null
      return (
        <div>
          <Link to={ `/games/` }>Go to the games list</Link>
          <h1>{ game.name }</h1>

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
  
  export default connect(mapStateToProps, { fetchGame })(GameContainer)
