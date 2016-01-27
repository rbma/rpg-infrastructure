'use strict';


const React = require('react');
const classNames = require('classnames');

const PrintLine = React.createClass({

	// ------------------------------------------------
	// Internal Component properties
	//
	_timer: null,
	_delay: null,
	_counter: 0,
	_keys: 0,
	

	propTypes: {
		containerElement: React.PropTypes.string.isRequired,
		callback: React.PropTypes.func.isRequired

	},

	getInitialState: function(){
		return {
			currentString: ''
		}
	},


	// ------------------------------------------------
	// Begin typing
	//
	componentDidMount: function(){

		if (this.props.message){
			this._type();
		}
	},


	// ------------------------------------------------
	// In case mount doesn't catch it
	//
	componentDidUpdate: function(oldProps){

		if (oldProps.message !== this.props.message){
			this._type();
		}
		else{
			return null;
		}
	},
	

	// ------------------------------------------------
	// Remove all timeouts on unmount
	//
	componentWillUnmount: function(){
		clearTimeout(self._timer);
		clearTimeout(self._delay);
	},


	// ------------------------------------------------
	// Main type function
	//
	_type: function(){
		let self = this;

		// ------------------------------------------------
		// Recursive function for typing
		//
		this._timer = setTimeout(function(){

			// ------------------------------------------------
			// While there are letters left
			//
			if (self._counter < self.props.message.length){
				
				// ------------------------------------------------
				// New letter to add
				//
				let currentLetter = self.props.message[self._counter];

				// ------------------------------------------------
				// Update current msg
				//
				self.setState({
					currentString: self.state.currentString + currentLetter
				});

				// ------------------------------------------------
				// Increment counter
				//
				self._counter++;

				// ------------------------------------------------
				// Call recursive function again
				//
				self._type();
			}

			// ------------------------------------------------
			// No letters left Line has ended
			//
			else{
				self._delay = setTimeout(function(){
					
					// ------------------------------------------------
					// Trigger callback
					//
					self.props.callback();




					// ------------------------------------------------
					// Optional delay on callback
					//
				}, self.props.callbackDelay);
				

				// ------------------------------------------------
				// End timer
				//
				clearTimeout(self._timer);
			}
			
			// ------------------------------------------------
			// Rate
			//
		}, self.props.speed);

	},


	render: function(){

		let cx = classNames({
			'printer': true,
			'cursor': this.props.cursor,
			'cursor-blink': this.props.cursorBlink
		});

		switch (this.props.containerElement){

			case 'p':
				return (
					<div className="print-container">
						<p className={cx}>{this.state.currentString}</p>
					</div>
				);
				break;

			case 'h1':
				return (
					<div className="print-container">
						<p className={cx}>{this.state.currentString}</p>
					</div>
				);
				break;

			case 'h2':
				return (
					<div className="print-container">
						<p className={cx}>{this.state.currentString}</p>
					</div>
				);
				break;

			case 'h3':
				return (
					<div className="print-container">
						<p className={cx}>{this.state.currentString}</p>
					</div>
				);
				break;

			case 'h4':
				return (
					<div className="print-container">
						<p className={cx}>{this.state.currentString}</p>
					</div>
				);
				break;

			case 'h5':
				return (
					<div className="print-container">
						<p className={cx}>{this.state.currentString}</p>
					</div>
				);
				break;

			case 'span':
				return (
					<div className="print-container">
						<p className={cx}>{this.state.currentString}</p>
					</div>
				);
				break;

			default:
				return (
					<div className="print-container">
						<p className={cx}>{this.state.currentString}</p>
					</div>
			);
		}

	}

});


module.exports = PrintLine;