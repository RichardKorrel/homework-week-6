// reducers/games.js
import {FETCH_ALL_GAMES, ADD_NEW_GAME} from '../actions/games'

// const games = [
//     {
//       id: 1,
//       name: 'game 1',
//       color: 'green',
//       board: [[" "," "," "],
//               [" "," "," "],
//               [" "," "," "]
//              ]
//     },
//     {
//       id: 2,
//       name: 'game 2',
//       color: 'red',
//       board: [[" "," "," "],
//               [" "," "," "],
//               [" "," "," "]
//              ]
//     }
//   ]

export default function (state = [], action) {
    switch (action.type) {
        case FETCH_ALL_GAMES:
            // Put all the games in the store
            return action.payload
        case ADD_NEW_GAME:
            // Add the new game to the games in the store
            return state.concat(action.payload)
        default:
            return state
    }
  }