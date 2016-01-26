'use strict';


const React = require('react');
const _ = require('lodash');
const classNames = require('classnames');
const splitLines = require('../utils/splitLines');
const Printer = require('../utils/printer');
const keysight = require('keysight');
const Image = require('./Image');
const Title = require('./Title');





const Home = React.createClass({

	propTypes: {
		allData: React.PropTypes.object
	},
	contextTypes: {
    	router: React.PropTypes.object.isRequired
  	},

	getInitialState: function(){
		return {
			currentLine: 0,
			input: ''
		};
	},


	componentDidMount: function(){

		let self = this;

		document.addEventListener('keydown', self._onKeyDown);

	},

	_onKeyDown: function(e){
		let key = keysight(e).key;
		let self = this;
		if (e.keyCode === 8){
			key = 'backspace';
		}
		if (e.keyCode === 13){
			key = 'enter';
		}

		switch(key){
			case '1':
				self.setState({
					input: 1
				});
				break;
			case '2':
				self.setState({
					input: 2
				});
				break;
			case '3':
				self.setState({
					input: 3
				});
				break;
			case '4':
				self.setState({
					input: 4
				});
				break;
			case 'backspace':
				self.setState({
					input: ''
				});
				break;
			case 'enter':
				self._handleInput();
				break;
		}
	},



	_printNextLine: function(){
		this.setState({
			currentLine: this.state.currentLine + 1
		});

	},

	_handleInput: function(){
		this.context.router.push({pathname: '/1', query: {branch: this.state.input}});

	},

	

	render: function(){
		let self = this;
		let lineArray = [];
		let promptArray = [];
		
		if (this.props.allData.intro){
			lineArray = splitLines(this.props.allData.intro.text);

			let cx = classNames({
				options: true,
				visible: this.state.currentLine >= lineArray.length
			});

			let cy = classNames({
				choice: true,
				visible: this.state.currentLine >= lineArray.length
			});

			let cz = classNames({
				'blinking-cursor': true,
				visible: this.state.currentLine >= lineArray.length
			});

			

			return (
				<div className="home">
					<Image src={this.props.allData.intro.image} />
					{lineArray.map(function(item, index){
						if (index <= self.state.currentLine){
							return <Printer
								key={index}
								message={item}
								speed={40}
								callback={self._printNextLine}
								callbackDelay={200}
							/>
						}
					})}
					<p>-------------------------------------</p>
					<ul className={cx}>
						{this.props.allData.intro.prompts.map(function(item, index){
							return <li key={index}>{index + 1}) {item.answer}</li>;
						})}
					</ul>
					<span className={cy}></span>
					<span className="text-input">&nbsp;&nbsp;{this.state.input}</span>
					<span className={cz}></span>
				</div>
			);
		}

		else{
			return <h1>Nothing</h1>;
		}

		


		
	}
});

module.exports = Home;