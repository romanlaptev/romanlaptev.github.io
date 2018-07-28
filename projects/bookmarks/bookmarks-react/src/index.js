//import 'core-js/es6/map';
//import 'core-js/es6/set';
import 'raf/polyfill';
import "babel-polyfill";

import React from 'react';
import ReactDOM from 'react-dom';
//import './css/index.css';
import './css/load.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

//-------------------------
var msg = "<p>React version: " + React.version +"</p>";
console.log( msg );
document.querySelector("#log").innerHTML += msg;

var ua = "<p>"+navigator.userAgent+"</p>";
document.querySelector("#log").innerHTML += ua;
