import React, { Component } from 'react';
import { Pancake } from './Pancake'
import logo from './logo.svg';
import './App.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import axios from 'axios';
import cheerio from 'cheerio';

//random comment lol

class App extends Component {
  constructor() {
    super();
    this.state = {
      a:"",
      alr:[],
      sortby: "activity",
      actclass: "sorta orange actres",
      relclass: "sortr actres",
    };
    this.handleChange = this.handleChange.bind(this);
    this.search = this.search.bind(this);
    this.handleSub = this.handleSub.bind(this);
    this.togact = this.togact.bind(this);
    this.togrel = this.togrel.bind(this);
  }

  async search (q){
    this.setState({
      query: q
    });
    const STACK_API_KEY = 'Wf4WyQYvjRRtsqcIFLEPpg((';
    let unds = ["how","to","a","an","i","am","do"];
    let b = q.toLowerCase().split(" ");
    for(let i = b.length-1; i >= 0; i--){
      if(unds.indexOf(b[i]) >= 0){
        b.splice(i,1);
      }
    }
    console.log(b);
    let a = b.join("%20");
    let aurl = 'https://api.stackexchange.com//2.2/search?order=desc&sort='+this.state.sortby +'&intitle='+a +'&site=stackoverflow&key='+STACK_API_KEY;
    console.log(aurl);
    this.state.alr = await axios.get(aurl).then(function(res){
      while(res.data.items.length > 15){
        res.data.items.pop();
      }
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
        el.query = q;
        var buildUrl  = el.link;
        buildUrl = buildUrl.substr(buildUrl.indexOf('questions/')+10);
        buildUrl = buildUrl.substr(0, buildUrl.indexOf('/'));

      }
      return res.data.items;
    });

    this.forceUpdate();
  }

  handleChange(event) {
    this.setState({a: event.target.value});
  }

  handleSub (e){
    e.preventDefault();
    console.log("sub");
    this.search(this.state.a);
    this.forceUpdate();
  }

  togact(){

    if(this.state.sortby !== 'activity'){
      this.setState({actclass: "sorta orange actres"});
      this.setState({relclass: "sortr actres"});
    }
    this.setState({sortby: "activity"});
    this.forceUpdate();
  }

  togrel(){

    if(this.state.sortby !== 'relevance'){
      this.setState({relclass: "sortr orange actres"});
      this.setState({actclass: "sorta actres"});
    }
    this.setState({sortby: "relevance"});
    this.forceUpdate();
  }

  componentDidMount(){

  }

render() {
    return (

      <div className="App">
        <header id="App-header">
          <h1 id="App-title">pancakes</h1>
          <div id="search-bar">
            <form id="search-bar-form" autoComplete="off" onSubmit={this.handleSub}>
              <input id="search-barr" type="text" name="search" value={this.state.a} placeholder="search" onChange={this.handleChange}/>
              <button type="button" className="submit" onClick={() => this.search(this.state.a)}><i className="edit fa fa-search fa-search"></i></button>
            </form>
          </div>
        </header>
        <div className="options">
          <p className="sort">Sort by:</p>
          <button className={this.state.actclass} onClick={this.togact}>Activity</button>
          <button className={this.state.relclass} onClick={this.togrel}>Relevance</button>
        </div>
        <Pancake questions={this.state.alr}/>
      </div>

    );
  }

}

export default App;
