import React, { Component } from 'react';
//import logo from './logo.svg';
//import './App.css';

//UI Ant-Design
import 'antd/dist/antd.css';
import { Row, Col } from 'antd';
import { Button } from 'antd';

import './css/custom.css';

import Container from "./components/Container";
import Breadcrumb from "./components/Breadcrumb";

import ServiceModal from "./components/ModalService";

import {dataStore} from "./components/DataStore";

//import {sayHi as func1} from "./utils";
//console.log("TEST!!!!!!!!!", func1.toString());
import * as utils from "./utils";
console.log("Utils: ", utils);


class App extends Component {

	constructor( props ){
//console.log("class App, constructor", props);

		super( props );
		this.state = {
			containerId: null
		};
		
		dataStore.loadProgressBar = utils.getById("load-progress-bar");
		dataStore.waitWindow = utils.getById("win1");
		
		//load JSON
		utils.urlManager( dataStore.initUrl );
	};//end constructor


	componentWillMount(){
//console.log("- component App, WillMount.");
	}//end 
	
	componentDidMount(){
//console.log("- component App, DidMount.");
	}//end 
           
	shouldComponentUpdate(){
//console.log("1. component App SHOULD update.");
		return true;
	}//end 
           
	componentWillUpdate(){
//console.log("2. component App WILL update.");
//console.log(this.props);
	}//end 

	componentDidUpdate(){
//console.log("3. component App DID update.");
//console.log(this.props);
	}//end 

	test = (e) => {
//console.log(arguments);		
console.log(e.target);		
		//this.setState({containerId: "container_24"});
console.log("App.eventHandler()", e);
console.log("component_breabcrumb: ", this.refs.component_breabcrumb);
console.log("component_container: ", this.refs.component_container);
console.log("component_servicemodal: ", this.refs.component_servicemodal);
//this.refs.component_servicemodal.showModal();
	};
	
	
	updateState = ( vars, action) => {
//console.log( vars, action);

		//delete this.state.root;
		
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
		utils.eventHandler(e);
		e.preventDefault();		
	};//end eventHandler
	
	render() {
//console.log("App, render", this.props.children);
	  
		return (
<div>
				
	<ServiceModal ref="component_servicemodal"/>
	
	<div id="log-wrap" className="panel log-panel">
	
		{/*<Button onClick={this.test} type="default" size="large">test btn</Button>*/}
		<Button onClick={this.test} type="default" size="large">test btn</Button>
		
		<a id="clear-log" href="#?q=clear-log" 
			onClick={this.eventHandler} 
			className="ant-btn btn-violet ant-btn-sm"
			title="Clear log">x</a>
		
		<div id="log"></div>
	</div>
	
	<div className="App">
		 <Row>
		 
			<Col span={24}>
				<Breadcrumb ref="component_breabcrumb" update={this.state.containerValues}/>
			</Col>
		 
			<Col span={24}>
				<div>
					<Container 
						ref="component_container"
						id={this.state.containerId} 
						updateState={this.updateState}
					/>
				</div>
			</Col>

		</Row>

	</div>

	
</div>		  
		);
	}//end render()
	
}//end class
//console.log("App: ", App);

export default App;
