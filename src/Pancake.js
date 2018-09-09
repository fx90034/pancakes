import React, { Component } from 'react';
import {Snippets} from './Snippets';
import axios from 'axios';
import cheerio from 'cheerio';

export class Pancake extends React.Component {

	async getSnippets(url){
		var buildUrl  = url;
		buildUrl = buildUrl.substr(buildUrl.indexOf('questions/')+10);
		buildUrl = buildUrl.substr(0, buildUrl.indexOf('/'));
		console.log(buildUrl);

		var snips = await axios.get("http://localhost:5000/api/"+buildUrl).then(function(res){
			const $ = cheerio.load(res.data);
      const snippets = [];
      $('.answer').each(function(i, elem) {
      var baseurl = 'https://stackoverflow.com/questions/'
      snippets[i] ={
        id: $(this).attr('id'),
        text: $(this).find('code').text()
      }

      });
			return snippets;
		});

		return snips;
	}

	render() {
		var questions = this.props.questions;
		for(var i = 0; i < 3; i++){
			this.getSnippets(questions[i].link).then( res => {
							console.log(res);
			})
		}

		return (
			<div className="container">
				{questions.map(function(data){
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
					if(data.index <1){
						var str = `data.title = data.title.replace("&lt", "");
									data.title = data.title.replace("&gt", ">");
									data.title = data.title.replace("&#39", "'");
									data.title = data.title.replace("&#39", ".");
									data.title = data.title.replace("&quot;", "\"");
									data.title = data.title.replace("&quot", "\"");`

						return <div className="listcont">
							<div className="left1 pizza"><a href={data.link}>{data.title}</a></div>
							<div >
								<div ></div>
								<div className="left1">
									<blockquote>
									<code>
											{str}
										</code>
									</blockquote>

								</div>
							</div>
						</div>;

					}
					else if(data.index <4){
					var str = `data.title = data.title.replace("&lt", "");
									data.title = data.title.replace("&gt", ">");
									data.title = data.title.replace("&#39", "'");
									data.title = data.title.replace("&#39", ".");
									data.title = data.title.replace("&quot;", "\"");
									data.title = data.title.replace("&quot", "\"");`

					return <div className="listcont">
						<div className="left1"><a href={data.link}>{data.title}</a></div>
						<div >
							<div ></div>
							<div className="left1">
								<blockquote>
								<code>
										{str}
									</code>
								</blockquote>

							</div>
						</div>
					</div>;

				  }
				  else{
				  	return <div className="listcont">
						<div className="left1"><a href={data.link}>{data.title}</a></div>
					</div>;
				  }
				})}
			</div>
		);
	}
}
