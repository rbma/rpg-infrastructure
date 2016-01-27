'use strict';

const React = require('react');
const _ = require('lodash');


const One = React.createClass({

	propTypes: {
		data: React.PropTypes.object
	},

	getInitialState: function(){
		return {
			branchData: null
		}

	},


	componentDidMount: function(){
		let branch = this.props.location.query.branch;

		// ------------------------------------------------
		// Find correct branch data
		//
		// let branchData = _.findKey(this.props.data, function(item){
		// 	return item
		// })
		
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