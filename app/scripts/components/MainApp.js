'use strict';

import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import keysight from 'keysight';

import splitLines from '../utils/splitLines';
import Printer from '../utils/printer';
import Image from './Image';
import Title from './Title';
import Option from './Option';



const MainApp = React.createClass({

	propTypes: {
		data: React.PropTypes.object,
		nextData: React.PropTypes.func.isRequired
	},

	getInitialState: function(){
		return {
			lineIndex: 0,
			input: '1',
			activeAnswer: 0
		};
	},


	componentDidMount: function(){

		let self = this;

		document.addEventListener('keydown', self._onKeyDown);

	},


	_onKeyDown: function(e){
		let key = keysight(e).key;
		let self = this;

		console.log(key);

		if (e.keyCode === 8){
			key = 'backspace';
		}
		if (e.keyCode === 13){
			key = 'enter';
		}

		switch(key){

			// ------------------------------------------------
			// Increment through options
			//
			case 'down':
				
				if (self.state.activeAnswer < self.props.data.prompts.length - 1){
					self.setState({
						activeAnswer: self.state.activeAnswer + 1,
						input: self.state.activeAnswer
					});
				}
				else{
					self.setState({
						activeAnswer: 0,
						input: self.state.activeAnswer + 1
					});
				}
				
				break;

			case 'up':

				if (self.state.activeAnswer < self.props.data.prompts.length - 1){
					self.setState({
						activeAnswer: self.props.data.prompts.length - 1,
						input: self.state.activeAnswer - 1
					});
				}
				else{
					self.setState({
						activeAnswer: self.state.activeAnswer - 1
					});
				}

				break;

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
				self._handleInput(self.state.input);
				break;
		}
	},



	_printNextLine: function(){
		this.setState({
			lineIndex: this.state.lineIndex + 1
		});

	},

	_handleInput: function(id){
		//reset state
		this.setState({
			input: '',
			lineIndex: 0
		});

		this.props.nextData(id);

	},

	_printer: function(){

		//console.log('PRINT', this.props.data.text);

		return (
			<Printer
				message={this.props.data.text}
				speed={40}
				callback={this._printNextLine}
				callbackDelay={200}
				lineIndex={this.state.lineIndex}
			/>
		);
	},

	

	render: function(){
		
		const self = this;



		if (this.props.data.text){

			let cx = classNames({
				options: true,
				visible: this.state.lineIndex >= this.props.data.text.length
			});

			let cy = classNames({
				choice: true,
				visible: this.state.lineIndex >= this.props.data.text.length
			});

			let cz = classNames({
				'blinking-cursor': true,
				visible: this.state.lineIndex >= this.props.data.text.length
			});




			return (
				<div className="home">
					<Image src={this.props.data.image} />

					<h1>{this.props.data.title}</h1>
					
					{this._printer()}

					<p>-------------------------------------</p>
					<ul className={cx}>
						{this.props.data.prompts.map(function(item, index){

							return (
								<Option
									key={index}
									index={index}
									text={item.text}
									activeAnswer={self.state.activeAnswer}
								/>
							);
							
						})}
					</ul>
					<p>######################################</p>
					<span className={cy}></span>
					<span className="text-input">&nbsp;&nbsp;{this.state.input}</span>
					<span className={cz}></span>
				</div>
			);
		}

		else{
			return null;
		}

		


		
	}
});

export default MainApp;
