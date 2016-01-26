// -------------------------------------------------
//
// Prints letter by letter
// 
// -------------------------------------------------

const React = require('react');
const classNames = require('classnames');


const Printer = React.createClass({

	// ------------------------------------------------
	// Internal component properties
	//
	_timer: null,
	_counter: 0,
	_keys: 0,


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


// 	for (var key in p) {
//   if (p.hasOwnProperty(key)) {
//     alert(key + " -> " + p[key]);
//   }
// }

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
			currentString: ''
		}
	},

	// ------------------------------------------------
	// Begin typing
	//
	componentDidMount: function(){
		this._type();
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
				return (<p className={cx}>{this.state.currentString}</p>);
				break;

			case 'h1':
				return (<h1 className={cx}>{this.state.currentString}</h1>);
				break;

			case 'h2':
				return (<h2 className={cx}>{this.state.currentString}</h2>);
				break;

			case 'h3':
				return (<h3 className={cx}>{this.state.currentString}</h3>);
				break;

			case 'h4':
				return (<h4 className={cx}>{this.state.currentString}</h4>);
				break;

			case 'h5':
				return (<h5 className={cx}>{this.state.currentString}</h5>);
				break;

			case 'span':
				return (<span className={cx}>{this.state.currentString}</span>);
				break;

			default:
				return (<p className={cx}>{this.state.currentString}</p>);
		}

	}

});


module.exports = Printer;
