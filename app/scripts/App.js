'use strict';


const React = require('react');
const fetch = require('./utils/fetch');


const App = React.createClass({


	getInitialState: function(){
		return {
			allData: {}
		};
	},

	componentDidMount: function(){

		let self = this;
		console.log("mount");

		fetch('data/index.json').then(function(response){

			let data = response;
			console.log(data);
			
			self.setState({
				allData: data
			});

		
		}, function(err){
			console.log(err);
		});
	},




	render: function(){
		console.log(this.state);
		return (
			<div className="container">
				{this.props.children && React.cloneElement(this.props.children, {
					allData: this.state.allData
				})}
			</div>
		);
	}
});

module.exports = App;