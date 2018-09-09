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

    this.getIndex = this.getIndex.bind(this);
    this.black = this.black.bind(this);
    this.white = this.white.bind(this);

  }

  async getIndex(){
    const STACK_API_KEY = 'Wf4WyQYvjRRtsqcIFLEPpg(('
    const client = algolia('M5GUPZR9NF','1c60567fa57df21fd50a4fa5e491edb2')

    var buildUrl  = this.props.url;
    buildUrl = buildUrl.substr(buildUrl.indexOf('questions/')+10);
    buildUrl = buildUrl.substr(0, buildUrl.indexOf('/'));
    console.log(buildUrl)
    this.setState = {
      id: buildUrl
    }

    return await axios.get("http://localhost:5000/api/"+buildUrl).then(function(res){
      const $ = cheerio.load(res.data);
      const snippets = [];
      $('.answer').each(function(i, elem) {
      var baseurl = 'https://stackoverflow.com/questions/'
      snippets[i] ={
        id: $(this).attr('id'),
        text: $(this).find('code').text()
      }

      });
      var index = client.initIndex(buildUrl);
      index.addObjects(snippets, function(err, content) {
        if (err) {
          console.error(err);
        }
      });

      index.setSettings({
        'searchableAttributes': [
          'text'
        ]
      }, function(err, content){
        console.log(content);
      });

      return index;
    });
  }

  // setSnippets(){
  //   var indexLive = this.getIndex();
  //   this.setState({
  //     index: 2
  //   })
  // }

//   componentWillUnmount() {
//     this.isCancelled = true;
//   }
//
//
//   componentDidUpdate(prevProps, prevState) {
//     console.log('bob2');
//     if (prevProps.a !== 2) {
//
//         this.getIndex();
//         console.log("firing");
//     }
//     console.log(this.state.index);
// }

  // async componentDidMount(){
  //   console.log("bob");
  //   this.setState({a:2});
  //     // let result = await this.getIndex();
  //     // this.setState({
  //     //     index: result
  //     // });
  // }
  //
  // content.map(function(data){
  //   return <blockquote>
  //   <code>
  //       {data.text}
  //   </code>
  //   </blockquote>
  // })

  async black () {
    var index = await this.getIndex();
    return index;
  }

  async white () {
    var snippets = await this.black().then(index => {
      console.log(index)
      console.log(this.state.a)
      return index.search({
      query: "button",
      hitsPerPage: 3,
      },function(err, content){
       return content.hits;
       this.setState({a:4});
       ;
     })});
    return snippets
  }

  // content.map(function(data){
  //   return <blockquote>
  //   <code>
  //       {data.text}
  //   </code>
  //   </blockquote>
  // })



  render(){
    // console.log("asdf");
    // this.getIndex().then((response) => {
    //   this.setState({
    //     indec:response
    //   })
    //   console.log('getindexed');
    // })
    // this.black().then(a => this.setState({c:a}));
    //
    // this.white().then( snippets => {
    //   console.log('white')
    //   console.log(snippets)
    // });
    const search = instantsearch({
  appId: 'M5GUPZR9NF',
  apiKey: 'cfcf1a7629c0d65381c873dc1fc2e4fa',
  indexName: this.props.id
});

search.addWidget(
  instantsearch.widgets.hits({
    container: '#hits'
  })
);

  search.start();

    //var snippets = this.getIndex().then(function(index){


    // var snippets = {}
    // console.log(snippets)
    return (
    <div id="hits">bob</div>
  );

  //   </div>);
  }
}
