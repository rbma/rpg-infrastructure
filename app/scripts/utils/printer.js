// -------------------------------------------------
//
// Prints letter by letter
// 
// -------------------------------------------------

const React = require('react');
const classNames = require('classnames');


const PrintLine = require('./print-line');


const Printer = React.createClass({


	// ------------------------------------------------
	// Public component properties
	//
	propTypes: {
		message: React.PropTypes.array.isRequired,
		speed: React.PropTypes.number,
		callback: React.PropTypes.func,
		callbackDelay: React.PropTypes.number,
		containerElement: React.PropTypes.node,
		cursor: React.PropTypes.bool,
		cursorBlink: React.PropTypes.bool,
		delete: React.PropTypes.bool
	},



	// ------------------------------------------------
	// Default public component properties
	//
	getDefaultProps: function(){
		return {
			speed: 50,
			callbackDelay: 100,
			containerElement: 'p',
			cursor: false,
			cursorBlink: false,
			delete: false,
			callback: null
		}
	},

	// ------------------------------------------------
	// Current value of string
	//
	getInitialState: function(){
		return {
			index: 0
		}
	},

	// ------------------------------------------------
	// Increment state + call custom callback
	//
	
	_callbackHandler: function(){

		const self = this;
		
		// ------------------------------------------------
		// Increment index
		//
		this.setState({

			index: self.state.index + 1

		}, function(){

			// ------------------------------------------------
			// If custom callback is present, call it after state
			// is updated
			//
			if (self.props.callback){
				self.props.callback();
			}
			
		});
		
	},


	render: function(){

		const self = this;

		return (
			<div className="print-container">
				
				{this.props.message.map(function(item, index){
					if (index <= self.state.index){
						return (
							<PrintLine
								key={index}
								message={item}
								speed={self.props.speed}
								containerElement={self.props.containerElement}
								callback={self._callbackHandler}
								callbackDelay={self.props.callbackDelay}
							/>
						);
					}
				})}
			</div>
		);


	}

});


module.exports = Printer;
