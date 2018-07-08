// src/action/games.js
import * as request from 'superagent'

const baseUrl = 'http://localhost:4000'

export const FETCH_GAME = 'FETCH_GAME'
export const FETCH_ALL_GAMES = 'FETCH_ALL_GAMES'
export const ADD_NEW_GAME = 'ADD_NEW_GAME'

export const fetchGame = (gameId) => (dispatch) => {
  console.log(gameId,'gameId')
  request
    .get(`${baseUrl}/games/${gameId}`)
    .then(response => {
      console.log('dispatch')
      dispatch({
      type: FETCH_GAME,
      payload: response.body
    })
    //console.log(response.body)
    }
  )
    .catch(err => alert(err))
}

export const fetchAllGames = () => (dispatch) => {
    console.log('fetchAllGames')
    request
      .get(`${baseUrl}/games/`)
      .then(response => dispatch({
        type: FETCH_ALL_GAMES,
        payload: response.body.games
      }))
      .catch(err => alert(err))
  }

export const addNewGame = (game) => (dispatch) => {
  console.log('addNewGame')
  request
    .post(`${baseUrl}/games/`)
    .send(game)
    .then(response => { console.log(response.body,'response.body')
      dispatch({        
      type: ADD_NEW_GAME,        
      payload: response.body
    })})
    .catch(err => alert(err))
}