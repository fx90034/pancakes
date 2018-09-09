import React, { Component } from 'react';

export class Pancake extends React.Component {

	render() {
		var questions = this.props.questions;
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
							<div className="left1 pizza">{data.title}</div>
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
						<div className="left1">{data.title}</div>
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
						<div className="left1">{data.title}</div>
					</div>;
				  }
				})}
			</div>
		);
	}
}
