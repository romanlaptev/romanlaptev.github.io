import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { LocaleProvider } from 'antd';
import ruRU from 'antd/lib/locale-provider/ru_RU';

ReactDOM.render(<LocaleProvider locale={ruRU}>
	<App />
</LocaleProvider>, document.getElementById('root'));
registerServiceWorker();

//-------------------------

var ua = "<h2>"+navigator.userAgent+"</h2>";
document.querySelector("#info").innerHTML += ua;
document.querySelector("#version").innerHTML = React.version;
