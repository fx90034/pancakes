import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">gif pancakes</h1>
          <div className="search-bar">
            <form>
              search: 
              <input className="search-barr" type="text" name="search"></input>
            </form>
          </div>
        </header>
        {/*<Pancake gif=""/>
        <p>asdfafasd</p>*/}
      </div>
    );
  }
}

export default App;
