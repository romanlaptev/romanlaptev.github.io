import React, { Component } from 'react';
import { Breadcrumb } from 'antd';

import {dataStore} from "./DataStore";
//import {eventHandler, urlManager, parseDate} from "../utils";
import * as utils from "../utils";

  
class BreadcrumbApp extends Component {


	constructor( props ){
		super( props );
//console.log("class BreadcrumbApp, constructor", props);
		//this.state = {
			//breadcrumbPath: {
				//"container_2" : "Меню закладок"
			//}
		//};
		dataStore.components["Breadcrumb"] = this;
		
	};//end constructor


//https://metanit.com/web/react/2.6.php
	componentWillMount(){
//console.log("- component Breadcrumb (BreadcrumbApp), WillMount.");
	}//end 
	
	componentDidMount(){
//console.log("- component Breadcrumb (BreadcrumbApp), DidMount.");
	}//end 
           
	shouldComponentUpdate(){
//console.log("1. component Breadcrumb (BreadcrumbApp) SHOULD update.");
		return true;
	}//end 
           
	componentWillUpdate(){
//console.log("2. component Breadcrumb (BreadcrumbApp) WILL update.");
//console.log(this.props);
	}//end 

	componentDidUpdate(){
//console.log("3. component Breadcrumb (BreadcrumbApp) DID update.");
//console.log(this.props);
	}//end 


	eventHandler = (e) => {
//console.log("Breadcrumb.eventHandler()", e, this);
		utils.eventHandler(e);
		e.preventDefault();		
	};//end eventHandler
           
	render(){
//console.log(this.props);
//console.log("class BreadcrumbApp, render", this.props);

		
//add link to breadcrumb chain		
		if( this.props.update && this.props.update.id.length > 0){
			//if( breadcrumbPathKeys.length === 0){
				var id = this.props.update.id;
				var title = this.props.update.title;
				dataStore.breadcrumbPath[id] = title;
				//breadcrumbPathKeys = Object.keys( dataStore.breadcrumbPath );
			//}
		}

//form breadcrumbs line
		var clear = false;
		if( this.props.update && this.props.update.id.length > 0){
			for( var key in dataStore.breadcrumbPath){
//console.log( key, dataStore.breadcrumbPath[key] );
				
				if( clear ){//clear unuseful tail breadrumbs
					delete dataStore.breadcrumbPath[ key ];
//console.log("update dataStore", dataStore);
				}

				if( key === this.props.update.id ){//detect next unuseful tail breadrumbs
					clear = true;
				}

			}//next
		}

		

		var breadcrumbPathKeys = Object.keys( dataStore.breadcrumbPath );
//console.log("breadcrumbPathKeys.length: ", breadcrumbPathKeys.length );
		
		return(
		
				<div className="breadcrumb">
					<Breadcrumb>
{
	breadcrumbPathKeys.map( function(key, index){
//console.log(key, index, dataStore.breadcrumbPath[key] );
		if( index+1 === breadcrumbPathKeys.length ){
			return <Breadcrumb.Item key={key}>{dataStore.breadcrumbPath[key]}</Breadcrumb.Item>
		} else {
			var id = key.replace("container_", "");
			var url = dataStore.urlViewContainer.replace("{{id}}",id);
			return <Breadcrumb.Item key={key}>
					<a onClick={this.eventHandler} href={url}>{dataStore.breadcrumbPath[key]}</a>
				</Breadcrumb.Item>
		}
	}, this)//next
}						
					</Breadcrumb>
				</div>
				
		);
	}
}//end class

export default BreadcrumbApp;
