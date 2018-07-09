import React, { Component } from 'react';
//import logo from './logo.svg';
//import './App.css';

//UI Ant-Design
import 'antd/dist/antd.css';
import { Row, Col } from 'antd';

import './css/custom.css';

import Link from "./components/Link";
console.log(Link);

class App extends Component {
	
	constructor( props ){
		super( props );
		this.state = {
			links: [
				{ 
					"url" : "http://yandex.ru", 
					"title" : "Yandex", 
					icon : "https://yastatic.net/iconostasis/_/8lFaTHLDzmsEZz-5XaQg9iTWZGE.png",
					announce: "web portal",
					dateAdded: "2017-1-29 12:15",
					lastModified: "2018-6-20 15:56"
				},
				{ 
					"url" : "https://jestjs.io/docs/ru/getting-started", 
					"title" : "Jest 23.3", 
					icon : "https://jestjs.io/img/favicon/favicon.ico",
					announce: "system of JavaScript testing",
					dateAdded: "2017-1-29 12:15",
					lastModified: "2018-6-20 15:56"
				}
			]
		};
	};
	
  render() {
	  
    return (
	<div className="App">

 <Row>
	<Col span={1}></Col>
	<Col span={22}>
		<div>
		
				<ul className="ant-select">
{
//console.log(  this.state.links )
				this.state.links.map( function(value, index){
//console.log(  index, value );				
					return <li key={index}>
						<Link 
							title={value.title} 
							url={value.url} 
							icon={value.icon}
							announce={value.announce}
							dateAdded={value.dateAdded}
							lastModified={value.lastModified}
						/>
					</li>
				})
}
				</ul>
			
		</div>
	</Col>
	<Col span={1}></Col>
</Row>
	
	  </div>
    );
  }
}//end class
console.log("App: ", App);

export default App;