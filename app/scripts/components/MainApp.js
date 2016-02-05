'use strict';

import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import keysight from 'keysight';
import {Howl, Howler} from 'howler';

import splitLines from '../utils/splitLines';
import Printer from '../utils/printer';
import Image from './Image';
import Title from './Title';
import Option from './Option';



const MainApp = React.createClass({

	propTypes: {
		data: React.PropTypes.object,
		nextData: React.PropTypes.func.isRequired,
		lineIndex: React.PropTypes.number.isRequired,
		handleInput: React.PropTypes.func.isRequired,
		printNextLine: React.PropTypes.func.isRequired
	},

	_howlOption: null,
	_howlSelect: null,

	getInitialState: function(){
		return {
			input: '1',
			activeAnswer: 1
		};
	},

	// shouldComponentUpdate: function(nextProps){
	// 	if (nextProps.lineIndex !== this.props.lineIndex){
	// 		return true;
	// 	}

	// 	else{
	// 		return false;
	// 	}
	// },


	componentDidMount: function(){
		const self = this;

		Howler.volume(0.5);

		this._howlOption = new Howl({
			urls: ['audio/click_plink.wav']
		});

		this._howlSelect = new Howl({
			urls: ['audio/click_topple.wav']
		});
		

		document.addEventListener('keydown', self._onKeyDown);



	},

	componentWillUnmount: function(){
		const self = this;
		document.removeEventListener('keydown', self._onKeyDown);
		
	},


	_onKeyDown: function(e){
		let key = keysight(e).key;
		const self = this;


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

				self._howlOption.play();
				
				if (self.state.activeAnswer < self.props.data.prompts.length){
					self.setState({
						activeAnswer: self.state.activeAnswer + 1
					}, function(){
						self.setState({
							input: (self.state.activeAnswer).toString()
						})
					});
				}
				else{
					self.setState({
						activeAnswer: 1,
					}, function(){
						self.setState({
							input: '1'
						});
					});
				}
				
				break;

			case 'up':

				self._howlOption.play();

				if (self.state.activeAnswer <= 1){
					self.setState({
						activeAnswer: self.props.data.prompts.length,
					}, function(){
						self.setState({
							input: (self.state.activeAnswer).toString()
						})
					});

				}
				else{
					self.setState({
						activeAnswer: self.state.activeAnswer - 1
					}, function(){
						self.setState({
							input: self.state.activeAnswer.toString()
						});
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

				self._howlSelect.play();
				self._handleInput(self.state.input);

				

				break;
		}
	},



	_handleInput: function(id){

		console.log('HANDLE INPUT CALLED');
		//reset state
		this.setState({
			input: ''
		});

		this.props.nextData(id);

	},

	_printer: function(){

		return (
			<Printer
				message={this.props.data.text}
				speed={40}
				callback={this.props.printNextLine}
				callbackDelay={200}
				lineIndex={this.props.lineIndex}
			/>
		);
	},

	

	render: function(){
		
		const self = this;

		if (this.props.data.text){

			let cx = classNames({
				options: true,
				visible: this.props.lineIndex >= this.props.data.text.length
			});

			let cy = classNames({
				choice: true,
				visible: this.props.lineIndex >= this.props.data.text.length
			});

			let cz = classNames({
				'blinking-cursor': true,
				visible: this.props.lineIndex >= this.props.data.text.length
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
									index={index + 1}
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

		
		//<Image src={this.props.data.image} />

		
	}
});

export default MainApp;
