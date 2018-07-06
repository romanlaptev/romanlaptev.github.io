import React, { Component } from 'react';
//import logo from './logo.svg';
//import './App.css';

import Link from "./components/Link";
console.log(Link);

class App extends Component {
  render() {
    return (
	<div className="App">
	
		<ul>
			<li><Link title={"Yandex"} url={"http://yandex.ru"} /></li>
			<li><Link title={"Jest 23.3"} url={"https://jestjs.io/docs/ru/getting-started"} /></li>
		</ul>

	  </div>
    );
  }
}

export default App;