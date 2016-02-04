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
		delete: React.PropTypes.bool,
		lineIndex: React.PropTypes.number
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
	

	// ------------------------------------------------
	// BUG: Line index is incrementing BEFORE new data is in
	//
	
	_callbackHandler: function(){

		const self = this;
		this.setState({
			index: this.state.index + 1
		});

		this.props.callback();
	},

	shouldComponentUpdate: function(nextProps){
		if (nextProps.message[0] !== this.props.message[0]){
			return true;
		}

		if (nextProps.lineIndex !== this.props.lineIndex){
			return true;
		}

		else{
			return false;
		}
	},

	componentWillUnmount: function(){
		alert('printer unmount');
	},

	componentWillReceiveProps: function(nextProps){
		// console.log(nextProps.message);
	},


	render: function(){

		const self = this;


		return (
			<div className="print-container">
				
				{this.props.message.map(function(item, index){
					// console.log('INDEX: ', index, ' LINEINDEX: ', self.props.lineIndex);
					if (index <= self.props.lineIndex){

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
