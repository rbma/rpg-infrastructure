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

		fetch('data/index.json').then(function(response){

			let data = response;
			
			self.setState({
				allData: data
			});

		
		}, function(err){
			console.log(err);
		});
	},




	render: function(){
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