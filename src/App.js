import React, { Component } from 'react';
import { Pancake } from './Pancake'
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">gif pancakes</h1>
          <div className="search-bar">
            <form className="search-bar-form">
              search: 
              <input className="search-barr" type="text" name="search"></input>
            </form>
          </div>
        </header>
        <div>
        </div>
        <Pancake imageUri={require('./aul.gif')}></Pancake>
      </div>
    );
  }
}

export default App;
