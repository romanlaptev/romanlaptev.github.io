import React, { Component } from 'react';
//import logo from './logo.svg';
//import './App.css';

//UI Ant-Design
import 'antd/dist/antd.css';
import { Row, Col } from 'antd';

import './css/custom.css';

import Link from "./components/Link";
import Container from "./components/Container";
console.log(Link);
console.log(Container);


//type: "text/x-moz-place-container"
//typeCode: 2

//type: "text/x-moz-place"
//typeCode: 1
//uri: "http://192.168.0.1/"

var bookmarksArray = [
	{ 
		"typeCode" : 1, 
		"type" : "text/x-moz-place", 
		"url" : "http://yandex.ru", 
		"title" : "Yandex", 
		icon : "https://yastatic.net/iconostasis/_/8lFaTHLDzmsEZz-5XaQg9iTWZGE.png",
		announce: "web portal",
		dateAdded: "2017-1-29 12:15",
		lastModified: "2018-6-20 15:56"
	},
	{ 
		"typeCode" : 1, 
		"type" : "text/x-moz-place", 
		"url" : "https://jestjs.io/docs/ru/getting-started", 
		"title" : "Jest 23.3", 
		icon : "https://jestjs.io/img/favicon/favicon.ico",
		announce: "system of JavaScript testing",
		dateAdded: "2017-1-29 12:15",
		lastModified: "2018-6-20 15:56"
	},
	{ 
		"typeCode" : 2, 
		"type" : "text/x-moz-place-container", 
		"title" : "info", 
		announce: "bookmarks container",
		dateAdded: "2017-1-29 12:15",
		lastModified: "2018-6-20 15:56"
	}
];
			
class App extends Component {

	
	constructor( props ){
		super( props );
		this.state = {
			bookmarks: bookmarksArray
		};
	};//end constructor
	
  render() {
	  
    return (
	<div className="App">

 <Row>
	<Col span={1}></Col>
	<Col span={22}>
		<div>
			<Container id="79" />
				<ul className="ant-select">
{
//console.log(  this.state. )
				this.state.bookmarks.map( function(value, index){
//console.log(  index, value );
					if( value.typeCode === 1){
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
					}

					if( value.typeCode === 2){
						return <li key={index}>
							<div className="panel container">
								title={value.title}<br/>
								announce={value.announce}<br/>
								dateAdded={value.dateAdded}<br/>
								lastModified={value.lastModified}
							</div>
						</li>
					}
					
				})//next
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