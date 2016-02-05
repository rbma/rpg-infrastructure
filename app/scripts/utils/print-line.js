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
	

	propTypes: {
		containerElement: React.PropTypes.string.isRequired,
		callback: React.PropTypes.func.isRequired,
		message: React.PropTypes.string.isRequired

	},

	getInitialState: function(){
		return {
			currentString: '',
			counter: 0
		}
	},


	// ------------------------------------------------
	// Begin typing
	//
	componentDidMount: function(){

		console.log('PRINT LINE MOUNTED');
		this._type();
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


		// ------------------------------------------------
		// Clear all
		//
		console.log('UNMOUNT');

		this.setState({
			counter: 0,
			currentString: ''
		});


		clearTimeout(self._timer);
		clearTimeout(self._delay);

	},


	// ------------------------------------------------
	// Main type function
	//
	_type: function(){
		
		const self = this;

		// ------------------------------------------------
		// Recursive function for typing
		//
		this._timer = setTimeout(function(){

			// ------------------------------------------------
			// While there are letters left
			//
			if (self.state.counter < self.props.message.length){
				
				// ------------------------------------------------
				// New letter to add
				//
				//console.log(self.props.message, self.state.counter);
				let currentLetter = self.props.message[self.state.counter];

				// ------------------------------------------------
				// Update current msg + Increment counter
				//
				self.setState({

					currentString: self.state.currentString + currentLetter,

				}, function(){

					self.setState({
						counter: self.state.counter + 1
					}, self._type);
				});
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

		return (
			<div className="print-container">
				<p className={cx}>{this.state.currentString}</p>
			</div>
		);
	}

});


module.exports = PrintLine;