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

      alr:[{title:'dog'},{title:'cat'}]
    };
    this.handleChange = this.handleChange.bind(this);
    this.search = this.search.bind(this);
  }

  async search (q){
    const STACK_API_KEY = 'Wf4WyQYvjRRtsqcIFLEPpg((';
    let a = q.split(" ").join("%20");
    let aurl = 'https://api.stackexchange.com//2.2/search?order=desc&sort=activity&intitle='+a +'&site=stackoverflow&key='+STACK_API_KEY;
    console.log(aurl);
    this.state.alr = await axios.get(aurl).then(function(res){
      for(let i = 0; i < res.data.items.length; i++){
        let el = res.data.items[i];
        delete el.owner;
        delete el.is_answered;
        delete el.view_count;
        delete el.closed_date;
        delete el.accepted_answer_id;
        delete el.score;
        delete el.last_activity_date;
        delete el.creation_date;
        delete el.question_id;
        delete el.closed_reason;
        delete el.last_edit_date;
        if(i < 3){
          el.index = i;
        }

      }

      return res.data.items;
    });

    this.forceUpdate();
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
        <Pancake questions={this.state.alr}/>
      </div>
    );
  }
}

export default App;
