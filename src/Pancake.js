import React, { Component } from 'react';

export class Pancake extends React.Component {

	render() {
		var questions = this.props.questions;
		return (
		<ul>
		{questions.map(function(data, index){
									return <li key={ index }>{data.title}</li>;
		})}
		</ul>);
	}
}
