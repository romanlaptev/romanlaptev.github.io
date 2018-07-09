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
			<li>
<Link title={"Модульное тестирование React-приложения с помощью Jest и Enzyme"} 
url={"https://medium.com/devschacht/berry-de-witte-unit-testing-your-react-application-with-jest-and-enzyme-6ef3658fdc93"} />
			</li>
		</ul>
      </div>
    );
  }
}//end class

export default App;
