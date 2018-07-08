import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import GamesContainer from './components/GamesContainer'
import GameContainer from './components/GameContainer'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Tic Tac Toe</h1>
        </header>
        <br/>
        <Router>
          <div>
            <Route exact path="/games" component={GamesContainer} />
            <Route exact path="/games/:id" component={GameContainer} />
            <Route exact path="/" render={ () => <Redirect to="/games" /> } />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
