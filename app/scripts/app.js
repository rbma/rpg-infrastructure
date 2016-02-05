'use strict';

import React, {Component, PropTypes} from 'react';
import MainApp from './components/MainApp';
import Loading from './components/Loading';
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
			loading: true,

			//lineIndex - keeps track of printer
			lineIndex: 0
		};
	},

	// ------------------------------------------------
	// Fetch root data
	//
	componentDidMount: function(){

		const self = this;

		fetch('data/index.json', true).then(function(response){

			let data = response;

			setTimeout(function(){
				self.setState({
					data: data,
					loading: false
				});
			},500);
			
			

		}, function(err){
			console.log(err);
			self.setState({
				loading: true
			});
		});
	},


	// ------------------------------------------------
	// On user input, fetch new page
	//
	_nextData: function(id){

		const self = this;

		function callFetch(){

			let dataID = this.state.page + '_' + id;

			fetch('data/' + dataID + '/index.json', true).then(function(response){
				let data = response;
				
				setTimeout(function(){
					self.setState({
						data: data,
						loading: false,
						lineIndex: 0
					});
				}, 500);
				

			}, function(err){
				console.log(err);
			});

		}

		this.setState({
			page: this.state.page + 1,
			loading: true
		}, callFetch);
	},

	_handleInput: function(id){

	},

	_printNextLine: function(){

		this.setState({
			lineIndex: this.state.lineIndex + 1
		});

	},



	// ------------------------------------------------
	// Render
	//
	render: function(){

		console.log('rerender app');

		if (this.state.loading){
			return (
				<div className="container">
					<Loading />
				</div>
			);
		}

		else{

			return (
				<div className="container">
					<MainApp
						data={this.state.data}
						nextData={this._nextData}
						lineIndex={this.state.lineIndex}
						printNextLine={this._printNextLine}
						handleInput={this._handleInput}
					/>
				</div>
			);

		}

		
	}
});


export default App;


