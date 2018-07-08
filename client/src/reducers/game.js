// reducers/game.js
import { FETCH_GAME, UPDATE_GAME } from '../actions/games'

// const game = 
//     {
//       id: 1,
//       name: 'game 1',
//       color: 'green',
//       board: [[" "," "," "],
//               [" "," "," "],
//               [" "," "," "]
//              ]
//     }

export default function (state = null, action) {
    console.log(action.type,'action.type in game.js')
    console.log(action.payload,'action.payload in game.js')
    switch (action.type) {
        case FETCH_GAME:
            // Put the game in the store
            return action.payload
        case UPDATE_GAME:
            // Put the updated game in the store
            return action.payload
        default:{
            return state
        }
    }
  }