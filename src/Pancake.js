import React, { Component } from 'react';
import {Snippets} from './Snippets';
import axios from 'axios';
import cheerio from 'cheerio';

export class Pancake extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			hiddensnips:[],
		};

		this.exp = this.exp.bind(this);
	}

	exp(index){
		let linkbois = this.props.questions[index].link;
		this.state.hiddensnips[index] = <Snippets url={linkbois}/>;
		this.forceUpdate();
	}

	// state= {
	// 	persons: [],
	// 	flowers:[],
	// }

	async componentDidMount() {

		// axios.get("http://stackoverflow.com/questions/39979775")
		// .then(res => {
		// 	console.log("got peopes");
		// 	const persons = res.data;
		// 	this.setState({persons});
		// })

	}


	render() {
		var questions = this.props.questions;

		return (

			<div className="container">

				{questions.map((data,index) => {
					try{
						data.title = decodeURIComponent(data.title);
					}
					catch(error){
						console.log(error);
					}
					data.title = data.title.replace("&lt;", "<");
					data.title = data.title.replace("&gt;", ">");
					data.title = data.title.replace("&#39;", "'");
					data.title = data.title.replace("&#39", ".");
					data.title = data.title.replace("&quot;", "\"");
					data.title = data.title.replace("&quot", "\"");
					const snipid = index;

					if(data.index < 3){
						return <div className="listcont" key={index}>
							<div className="left1 pizza" key={data.title}>
								<a href={data.link}>{data.title}</a>
							</div>
							<div>
								<div className="left1" key={"snip"+data.title}>
									<Snippets url={data.link}/>
								</div>
							</div>
						</div>;
					}
				  else{
				  	return <div className="listcont" key={index}>
							<div className="left1 sammich" key={data.tile}>
								<a href={data.link}>{data.title}</a>
								<i onClick={() => this.exp(index)} className="fa fa-chevron-down chev"></i>
								{this.state.hiddensnips[snipid]}
							</div>
						</div>;
				  }
				})}
			</div>
		);
	}
}
