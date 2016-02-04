'use strict';

import React from 'react';
import classNames from 'classnames';

const Option = React.createClass({
	propTypes: {
		activeAnswer: React.PropTypes.number,
		text: React.PropTypes.string,
		index: React.PropTypes.number
	},

	render: function(){

		let cx = classNames({
			active: this.props.index === this.props.activeAnswer
		});

		return (
			<li className={cx}>■&nbsp;<strong>{this.props.text}</strong></li>
		);

	}
});


export default Option;
