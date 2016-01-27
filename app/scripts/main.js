'use strict';

// -------------------------------------------------
//
// Entry point
// 
// -------------------------------------------------
const React = require('react');
const ReactDOM = require('react-dom');
const ReactRouter = require('react-router');
const Router = ReactRouter.Router;
const Route = ReactRouter.Route;
const browserHistory = ReactRouter.browserHistory;

const App = require('./containers/App');
const Home = require('./components/Home');
const One = require('./components/1');
//const About = require('./components/About');


ReactDOM.render((
	<Router history={browserHistory}>
		<Route component={App}>
			<Route path="/" component={Home} />
			<Router path="/1" component={One} />
		</Route>
	</Router>
), document.getElementById('mount'));