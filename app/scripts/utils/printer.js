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
	// Increment state + call custom callback
	//
	
	
	shouldComponentUpdate: function(nextProps){
		if (this.props.lineIndex !== nextProps.lineIndex){
			return true;
		}

		else{
			return false;
		}

	},




	render: function(){

		const self = this;


		return (
			<div className="print-container">
				
				{this.props.message.map(function(item, index){
					//console.log('INDEX: ', index, ' LINEINDEX: ', self.props.lineIndex, 'ITEM: ', item);
					if (index <= self.props.lineIndex){
							//console.log(item);
						return (
							<PrintLine
								key={index}
								message={item}
								speed={self.props.speed}
								containerElement={self.props.containerElement}
								callback={self.props.callback}
								callbackDelay={self.props.callbackDelay}
								sound={true}
							/>
						);
					}
				})}
			</div>
		);


	}

});


module.exports = Printer;
