// -------------------------------------------------
//
// Prints letter by letter
// 
// -------------------------------------------------

const React = require('react');
const classNames = require('classnames');


const Printer = React.createClass({

	_timer: null,
	_counter: 0,
	_keys: 0,

	propTypes: {
		message: React.PropTypes.array.isRequired,
		callback: React.PropTypes.func,
		speed: React.PropTypes.number,
		callbackDelay: React.PropTypes.number,
		containerElement: React.PropTypes.node,
		cursor: React.PropTypes.bool,
		cursorBlink: React.PropTypes.bool,
		delete: React.PropTypes.bool
	},

	getDefaultProps: function(){
		
		return {
			speed: 50,
			callbackDelay: 100,
			containerElement: 'p',
			cursor: false,
			cursorBlink: false,
			delete: false
		}
	},

	getInitialState: function(){
		return {
			currentString: ''
		}
	},


	componentDidMount: function(){
		this._type();
	},

	componentWillUnmount: function(){
		clearTimeout(self._timer);
		clearTimeout(self._delay);
	},

	_type: function(){
		let self = this;

		this._timer = setTimeout(function(){

			if (self._counter < self.props.message.length){
				let currentLetter = self.props.message[self._counter];

				self.setState({
					currentString: self.state.currentString + currentLetter
				});

				self._counter++;
				self._type();
			}

			else{
				self._delay = setTimeout(function(){
					self.props.callback();
				}, self.props.callbackDelay);
				

				clearTimeout(self._timer);
			}
			

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
