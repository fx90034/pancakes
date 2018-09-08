import React, { Component } from 'react';
import './App.css';

export class Pancake extends React.Component {
	
	render() {
		var a = './wood.png';
		return (
			<img src={ this.props.imageUri}/>
		);
	}
}

