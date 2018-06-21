import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

var msg = "React version: " + React.version;
console.log( msg );	

window.onload = function(){
console.log("onLoad!!!!");	
	var version = document.querySelector("#version");
	version.innerHTML = React.version;
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
