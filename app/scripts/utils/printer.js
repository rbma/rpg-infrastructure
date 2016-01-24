// -------------------------------------------------
//
// Prints letter by letter
// 
// -------------------------------------------------

const React = require('react');

const Printer = React.createClass({

	_timer: null,
	_counter: 0,
	_speed: 50,
	_keys: 0,

	propTypes: {
		message: React.PropTypes.string.isRequired,
		nextLine: React.PropTypes.func.isRequired
	},

	getInitialState: function(){
		return {
			currentString: ''
		}
	},


	componentDidMount: function(){
		this._addLetters();
		
	},

	_addLetters: function(){
		let self = this;

		this._timer = setTimeout(function(){

			if (self._counter < self.props.message.length){
				let currentLetter = self.props.message[self._counter];

				self.setState({
					currentString: self.state.currentString + currentLetter
				});

				self._counter++;
				self._addLetters();
			}

			else{
				console.log('done');

				self._delay = setTimeout(function(){
					self.props.nextLine();
				}, 200);
				

				clearTimeout(self._timer);
			}
			

		},self._speed);

	},



	render: function(){

		return (
			<p>{this.state.currentString}</p>
		);
	}




});

module.exports = Printer;
