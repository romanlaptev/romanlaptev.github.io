import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

//-------------------------
var msg = "<p>React version: " + React.version +"</p>";
document.querySelector("#version").innerHTML += msg;

var ua = "<p>"+navigator.userAgent+"</p>";
document.querySelector("#ua").innerHTML += ua;
