// src/action/games.js
import * as request from 'superagent'

const baseUrl = 'http://localhost:4000'

// Define all the actions on the game(s)
export const FETCH_GAME = 'FETCH_GAME'
export const FETCH_ALL_GAMES = 'FETCH_ALL_GAMES'
export const ADD_NEW_GAME = 'ADD_NEW_GAME'
export const UPDATE_GAME = 'UPDATE_GAME'

export const fetchGame = (gameId) => (dispatch) => {
  console.log(gameId,'gameId')
  request
    // Get the game from the database
    .get(`${baseUrl}/games/${gameId}`)
    .then(response => {
      // Put the game in the store
      dispatch({
      type: FETCH_GAME,
      payload: response.body
    })
    }
  )
    .catch(err => alert(err))
}

export const fetchAllGames = () => (dispatch) => {
    console.log('fetchAllGames')
    request
      // Get all the games from the database
      .get(`${baseUrl}/games/`)
      .then(response => dispatch({
        // Put all the games in the store
        type: FETCH_ALL_GAMES,
        payload: response.body.games
      }))
      .catch(err => alert(err))
  }

export const addNewGame = (game) => (dispatch) => {
  console.log('addNewGame')
  request
    // Post the new game in the database
    .post(`${baseUrl}/games/`)
    .send(game)
    .then(response => { 
      // Put the new game in the store
      dispatch({        
      type: ADD_NEW_GAME,        
      payload: response.body
      })
    })
    .catch(err => alert(err))
}

export const updateGame = (gameId,game) => (dispatch) => {
  console.log(gameId,'gameId UpdateGame')
  request
    // Put the updated game in the database
    .put(`${baseUrl}/games/${gameId}`)
    .send(game)
    .then(response => {
      // Put the updated game in the store
      dispatch({
      type: UPDATE_GAME,
      payload: response.body
      })
    }
  )
    .catch(err => alert(err))
}