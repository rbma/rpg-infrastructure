'use strict';


// -------------------------------------------------
//
// Receives object per page, and returns individual lines
// 
// -------------------------------------------------


const _ = require('lodash');


module.exports = function(obj){

	let lineArray = [];

	_.forEach(obj, function(value, key){
		lineArray.push(value);
	});


	return lineArray;

};