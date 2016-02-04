'use strict';

// -------------------------------------------------
//
// Entry point
// 
// -------------------------------------------------
import React from 'react';
import {render} from 'react-dom';
import App from './app';
const rootEl = document.getElementById('mount');


//const About = require('./components/About');



render(
	<App/>,
	rootEl
);
