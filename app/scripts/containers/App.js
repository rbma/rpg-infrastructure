'use strict';


const React = require('react');
const fetch = require('../utils/fetch');


const App = React.createClass({


	getInitialState: function(){
		return {
			data: {}
		};
	},

	componentDidMount: function(){

		let self = this;

		fetch('data/index.json').then(function(response){

			let data = response;
			console.log(response);
			
			self.setState({
				data: data
			});

		
		}, function(err){
			console.log(err);
		});
	},




	render: function(){

		return (
			<div className="container">
				{this.props.children && React.cloneElement(this.props.children, {
					data: this.state.data
				})}
			</div>
		);
	}
});

module.exports = App;