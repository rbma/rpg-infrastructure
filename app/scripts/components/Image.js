'use strict';

const React = require('react');


const Image = React.createClass({

	propTypes: {
		src: React.PropTypes.string.isRequired
	},




	render: function(){

		return (
			<img src={this.props.src} />
		);
	}

});

module.exports = Image;