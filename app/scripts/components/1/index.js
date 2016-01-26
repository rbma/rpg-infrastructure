'use strict';

const React = require('react');


const One = React.createClass({

	getInitialState: function(){
		return {
			branch: 0,
			data: null
		}
	},

	componentDidMount: function(){
		let branch = this.props.location.query.branch;
		console.log("MOUNT", branch);
	},

	componentWillReceiveProps: function(nextProps){
		let branch = nextProps.location.query.branch;

		this.setState({
			branch: branch
		});
	},

	componentWillUpdate: function(nextProps, nextState){
		console.log('next state', nextState);

		// ------------------------------------------------
		// If branch state changes, fetch data
		//

		
	},


	render: function(){

		

		return <h1>yo</h1>;
	}
});

module.exports = One;