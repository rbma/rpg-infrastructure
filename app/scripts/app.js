'use strict';

import React, {Component, PropTypes} from 'react';
import MainApp from './components/MainApp';
import fetch from './utils/fetch';




const App = React.createClass({

	// ------------------------------------------------
	// Initial State
	//
	getInitialState: function(){
		return {
			
			//JSON Data
			data: {},

			//Page depth of adventure
			page: 0,

			//not used yet, but will add
			loading: true
		};
	},

	// ------------------------------------------------
	// Only call render if new data has entered
	//
	shouldComponentUpdate: function(nextProps, nextState){

		if (nextState.data.id !== this.state.data.id){
			return true;
		}

		else{
			return false;
		}
	},


	// ------------------------------------------------
	// Fetch root data
	//
	componentDidMount: function(){

		const self = this;

		fetch('data/index.json', true).then(function(response){

			let data = response;
			
			self.setState({
				data: data
			});

		}, function(err){
			console.log(err);
		});
	},


	// ------------------------------------------------
	// On user input, fetch new page
	//
	_nextData: function(id){

		const self = this;

		this.setState({
			page: this.state.page + 1
		});

		let dataID = this.state.page + '_' + id;

		fetch('data/' + dataID + '/index.json', true).then(function(response){
			let data = response;
			
			self.setState({
				data: data,
				loading: false
			});


		}, function(err){
			console.log(err);
		});
	},



	// ------------------------------------------------
	// Render
	//
	render: function(){

		return (
			<div className="container">
				<MainApp
					data={this.state.data}
					nextData={this._nextData}
				/>
			</div>
		);
	}
});


export default App;


