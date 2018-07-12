import React, { Component } from 'react';
//import logo from './logo.svg';
//import './App.css';

//UI Ant-Design
import 'antd/dist/antd.css';
import { Row, Col } from 'antd';
import { Button } from 'antd';

import './css/custom.css';

import Container from "./components/Container";
//import dataStore from "./components/DataStore";
import Breadcrumb from "./components/Breadcrumb";

//console.log(Container);

class App extends Component {

	constructor( props ){
		super( props );
		this.state = {
			//bookmarks: Bookmarks
			//updateBreadcrumb: false
			root: "bookmarksMenuFolder",
			containerId: false
		};
	};//end constructor


	componentWillMount(){
console.log("- component App, before render.");
	}//end 
	
	componentDidMount(){
console.log("- component App, after render.");
	}//end 
           
	shouldComponentUpdate(){
console.log("1. component App SHOULD update.");
		return true;
	}//end 
           
	componentWillUpdate(){
console.log("2. component App WILL update.");
//console.log(this.props);
	}//end 

	componentDidUpdate(){
console.log("3. component App DID update.");
//console.log(this.props);
	}//end 

	test = (e) => {
//console.log(arguments);		
//console.log(e.target);		
		//this.setState({containerId: "container_24"});
	};
	
	updateState = ( vars, action) => {
console.log( vars, action);

		delete this.state.root;
		
		switch( action ){
			case "updateBreadrumb":
				this.setState({containerValues: vars });
			break;
			
			//case "changeContainer":
				//this.setState({containerId: vars["containerId"] });
			//break;
			
			default:
console.log("error, action: ", action);
			break;
			
		}//end switch
	};//end updateState()
	
	render() {
	  
		return (
		<div className="App">

	 <Row>
	 
		<Col span={24}>
			<Breadcrumb update={this.state.containerValues}/>
		</Col>
	 
		<Col span={1}></Col>
		<Col span={22}>
			<div>
				<Container 
					root={this.state.root} 
					id={this.state.containerId} 
					updateState={this.updateState}
				/>
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
