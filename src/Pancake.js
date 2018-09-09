import React, { Component } from 'react';

export class Pancake extends React.Component {

	render() {
		var questions = this.props.questions;
		return (
			<div className="container">
				{questions.map(function(data){
					data.title = decodeURIComponent(data.title);
					data.title = data.title.replace("&lt;", "<");
					data.title = data.title.replace("&gt;", ">");
					data.title = data.title.replace("&#39;", "'");
					data.title = data.title.replace("&#39", ".");
					data.title = data.title.replace("&quot;", "\"");
					data.title = data.title.replace("&quot", "\"");

					if(data.index <4){
					var str = `data.title = data.title.replace("&lt", "");
									data.title = data.title.replace("&gt", ">");
									data.title = data.title.replace("&#39", "'");
									data.title = data.title.replace("&#39", ".");
									data.title = data.title.replace("&quot;", "\"");
									data.title = data.title.replace("&quot", "\"");`
					
					return <div className="listcont">
						<div className="left">{data.title}</div>
						<div >
							<div ></div>
							<div className="left">
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
						<div className="left">{data.title}</div>
					</div>;
				  }
				})}
			</div>
		);
	}
}
