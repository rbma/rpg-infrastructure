'use strict';


const keysight = require('keysight');


class Key {

	constructor(){
		this.key = null;
		this.init();
	}


	init(){
		this.listener = document.addEventListener('keydown', this.onKeyPress.bind(this));
	}

	onKeyPress(event){
		let key = keysight(event).key;

		console.log(key);
	}

	destroy(){

	}

}

module.exports = Key;