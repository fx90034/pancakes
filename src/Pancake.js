import React, { Component } from 'react';

export class Pancake extends React.Component {

	render() {
		var questions = this.props.questions;
		return (
		<div>
			{questions.map(function(data, index){
				return <div className="lista" key={ index }>
					<div className="bracket"></div>
					<div className="listb">{data.title}</div>
					
				</div>;
			})}
		</div>);
	}
}
