import React, { Component } from 'react';
import { Pancake } from './Pancake'
import logo from './logo.svg';
import './App.css';
import '../node_modules/font-awesome/css/font-awesome.min.css'; 
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      a:"",
    };
    this.handleChange = this.handleChange.bind(this);
    this.search = this.search.bind(this);
  }

  search (q){
    const STACK_API_KEY = 'Wf4WyQYvjRRtsqcIFLEPpg((';
    let a = q.split(" ").join("%20");
    let aurl = 'https://api.stackexchange.com//2.2/search?order=desc&sort=activity&intitle='+a +'&site=stackoverflow&key='+STACK_API_KEY;
    console.log(aurl);
    axios.get(aurl).then(function(res){
      console.log(res.data);
    });
  }

  handleChange(event) {
    this.setState({a: event.target.value});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">pancakes</h1>
          <div className="search-bar">
            <form className="search-bar-form" autoComplete="off">
              search: 
              <input className="search-barr" type="text" name="search" value={this.state.a} onChange={this.handleChange}/>
              <button type="button" className="submit" onClick={() => this.search(this.state.a)}><i className="fa fa-search fa-search"></i></button>
            </form>
          </div>
        </header>
        <div>
        </div>
        <Pancake></Pancake>
      </div>
    );
  }
}

export default App;
