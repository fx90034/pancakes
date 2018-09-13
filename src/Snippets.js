import React, { Component } from 'react';
import algolia from 'algoliasearch';
import axios from 'axios';
import cheerio from 'cheerio';
import instantsearch from 'instantsearch.js';

export class Snippets extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      url:'',
      snippets:[],
      index:'',
      a: 1
    }

  }

  async componentDidMount() {
    const STACK_API_KEY = 'Wf4WyQYvjRRtsqcIFLEPpg(('
    const client = algolia('M5GUPZR9NF','1c60567fa57df21fd50a4fa5e491edb2')
    var buildUrl  = this.props.url;
    buildUrl = buildUrl.substr(buildUrl.indexOf('questions/')+10);
    buildUrl = buildUrl.substr(0, buildUrl.indexOf('/'));

    // client.listIndexes(function(err, content){
    //
    // })

		axios.get("http://localhost:5000/api/"+buildUrl)
		.then(res => {
      //const snippets = res.data;
    //  this.setState({snippets});
      const $ = cheerio.load(res.data);
      const snippets = []
      $('.answer').each(function(i, elem) {
      snippets[i] ={
        id: $(this).attr('id'),
        text: $(this).find('code').text()
      }
      });

			this.setState({snippets});
      console.log(this.state.snippets);
		})


	}



  render(){

    return (
      <ul>
          { this.state.snippets.map(snippets =>
          <blockquote key={snippets.id}>
            <code>
              <a target="blank" href={this.props.url + '#' + snippets.id}>
                {snippets.text}
              </a>
              </code>
          </blockquote>)}
      </ul>
  );

  }
}
