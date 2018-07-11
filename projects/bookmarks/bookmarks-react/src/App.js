import React, { Component } from 'react';
//import logo from './logo.svg';
//import './App.css';

//UI Ant-Design
import 'antd/dist/antd.css';
import { Row, Col } from 'antd';
import { Button } from 'antd';

import './css/custom.css';

import Container from "./components/Container";
import dataStore from "./components/DataStore";
import Breadcrumb from "./components/Breadcrumb";

//console.log(Container);

class App extends Component {

	constructor( props ){
		super( props );
		this.state = {
			//bookmarks: Bookmarks
			updateBreadcrumb: false
		};
	};//end constructor

	test = (e) => {
//console.log(arguments);		
console.log(e.target);		
delete dataStore.breadcrumbPath["container_454"];
console.log("update dataStore", dataStore);
console.log( Breadcrumb, typeof Breadcrumb);
//this.setState()		
		this.setState({updateBreadcrumb: true});
	}
	
	render() {
	  
		return (
		<div className="App">

	 <Row>
	 
		<Col span={24}>
			<Breadcrumb update={this.state.updateBreadcrumb}/>
		</Col>
	 
		<Col span={1}></Col>
		<Col span={22}>
			<div>
				<Container root="bookmarksMenuFolder" />
			</div>
		</Col>
		<Col span={1}></Col>
	</Row>

	 <Row>
		<div>
			{/*<button className="btn btn-warning">test btn</button>*/}
	<Button onClick={this.test} type="default" size="large">test btn</Button>		
		</div>
	</Row>
		
		  </div>
		);
	}//end render()
	
}//end class
console.log("App: ", App);

export default App;
