import React, { Component } from 'react';
//import logo from './logo.svg';
//import './App.css';

//UI Ant-Design
import 'antd/dist/antd.css';
import { Row, Col } from 'antd';

import './css/custom.css';

import Container from "./components/Container";
console.log(Container);

class App extends Component {
/*
	constructor( props ){
		super( props );
		//this.state = {
			//bookmarks: Bookmarks
		//};
	};//end constructor
*/
	
  render() {
	  
    return (
	<div className="App">

 <Row>
	<Col span={1}></Col>
	<Col span={22}>
		<div>
			<Container id="79" />
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