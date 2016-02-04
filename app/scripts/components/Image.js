'use strict';


import React from 'react';
import fetch from '../utils/fetch';


const Image = React.createClass({

	propTypes: {
		src: React.PropTypes.string.isRequired
	},

	getInitialState: function(){
		return {
			ascii: ''
		}
	},

	componentDidMount: function(){

		// ------------------------------------------------
		// Fetch txt
		//
		if (this.props.src){
			this._fetch();
		}

		else{
			console.log('not there');
		}
	
	},


	_fetch: function(){
		const self = this;

		fetch(this.props.src).then(function(response){
			self.setState({
				ascii: response
			});
		});
	},


	componentDidUpdate: function(oldProps){

		if (oldProps.src !== this.props.src){
			this._fetch();
		}

		else {
			return null;
		}

	},

	render: function(){

		return (
			<pre>{this.state.ascii}</pre>
		);
	}

});

module.exports = Image;