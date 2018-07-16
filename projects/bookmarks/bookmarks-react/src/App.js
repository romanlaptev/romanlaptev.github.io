import React, { Component } from 'react';
//import logo from './logo.svg';
//import './App.css';

//UI Ant-Design
import 'antd/dist/antd.css';
import { Row, Col } from 'antd';
//import { Button } from 'antd';

import './css/custom.css';

import Container from "./components/Container";
import dataStore from "./components/DataStore";
import Breadcrumb from "./components/Breadcrumb";

//console.log(Container);

class App extends Component {

	constructor( props ){
console.log("class App, constructor", props);

		super( props );
		this.state = {
			//bookmarks: Bookmarks
			//updateBreadcrumb: false
			//root: "bookmarksMenuFolder",
			containerId: this.getInitId("bookmarksMenuFolder")
		};
		
		
		dataStore.sharedFunc.urlManager( dataStore.initUrl );
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

	getInitId = ( containerName ) => {
		var initId = dataStore["bookmarksArray"]["children"].find( function( element, index){
			if( element["root"] === containerName ){
				return true;
			}
		}, this);//end filter

//console.log("getInitId()", containerName, initId, typeof initId);

		if(initId){
			return initId["id"];
		} else {
			return false;
		}
		
	}//end getInitId

	
	updateState = ( vars, action) => {
console.log( vars, action);

		delete this.state.root;
		
		switch( action ){
			case "updateBreadcrumb":
				this.setState({containerValues: vars });
			break;
			
			default:
console.log("error, action: ", action);
			break;
			
		}//end switch
	};//end updateState()
	
	
	eventHandler = (e) => {
console.log("App.eventHandler()", e);
		dataStore.sharedFunc["eventHandler"](e);
		e.preventDefault();		
	};//end eventHandler
	
	render() {
//console.log("App, render", this.props.children);
	  
		return (
<div>
				
	<div className="App">
		 <Row>
		 
			<Col span={24}>
				<Breadcrumb update={this.state.containerValues}/>
			</Col>
		 
			<Col span={24}>
				<div>
					<Container 
						id={this.state.containerId} 
						updateState={this.updateState}
					/>
				</div>
			</Col>

		</Row>

	</div>

	<div id="log-wrap" className="panel log-panel">
	
		{/*<Button onClick={this.test} type="default" size="large">test btn</Button>*/}
		
		<a id="clear-log" href="#?q=clear-log" onClick={this.eventHandler} 
		className="ant-btn btn-violet ant-btn-sm"
		title="Clear log">x</a>
		
		<div id="log"></div>
	</div>
	
</div>		  
		);
	}//end render()
	
}//end class
console.log("App: ", App);

export default App;
