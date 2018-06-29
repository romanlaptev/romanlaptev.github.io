import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

//-------------------------
var ua = "<h2>"+navigator.userAgent+"</h2>";
document.querySelector("#info").innerHTML += ua;
document.querySelector("#version").innerHTML = React.version;
