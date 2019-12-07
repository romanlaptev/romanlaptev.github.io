import React, { Component } from 'react';
import Link from "./Link";
import {dataStore} from "./DataStore";
//import {eventHandler, urlManager, parseDate} from "../utils";
import * as utils from "../utils";



class Container extends Component {
	
	constructor( props ){
//console.log("class Container, constructor", props);

		super(props);
		
		this.state = {
			container: null
		};

		dataStore.components["Container"] = this;
	};//end constructor

	
	componentWillMount(){
//console.log("- component Container, before render.");
	}//end 
	
	componentDidMount(){
//console.log("- component Container, after render.");
	}//end 
           
	shouldComponentUpdate(){
//console.log("1. component Container SHOULD update.");
		return true;
	}//end 
           
	componentWillUpdate(){
//console.log("2. component Container WILL update.");
//console.log(this.props);
//console.log(this.state);
	}//end 

	componentDidUpdate(){
//console.log("3. component Container DID update.");
//console.log(this.props);
//console.log(this.state);
	}//end 


	_getContainerByID = ( id, jsonObj, postFunc ) => {
//console.log("_getContainerByID()", id);
			
		if( jsonObj["children"] && jsonObj["children"].length > 0){
			for( var n = 0; n < jsonObj["children"].length; n++){
				var container = jsonObj["children"][n];
//console.log( "_TEST1", container );
				if( container["id"] === parseInt( id, 10 ) ){
//console.log( "_TEST2", container["id"], id, container );
					//return container;
					//dataStore["usedContainer"] = container; 
					if( typeof postFunc === "function"){
						postFunc( container, this);
					}
					break;
				} 
				
				//recursive search ID
				if( container["children"] && container["children"].length > 0){
					this._getContainerByID( id, container, postFunc );
				}
				
			}//next
		}
		//return resContainer;

	}//end _getContainerByID()

	eventHandler = (e) => {
//dataStore.logMsg = "Container.eventHandler(), "+e.target.href;
//utils._log("<p class='ant-alert ant-alert-info'>" + dataStore.logMsg + "</p>");
//console.log(dataStore.logMsg, e);
		utils.eventHandler(e);
		e.preventDefault();		
	};//end eventHandler
	
	
	//viewContainer(){
	viewContainer = (data) => {
//console.log("viewContainer(): ", data);
		//return <h1>Test!</h1>;
		return(
<div>
				<ul className="ant-select">
{ 

		data.map( function(value, index){
//console.log(  index, value );
			var out = "";
			var dateAdded = utils.parseDate(value.dateAdded);
			var lastModified = utils.parseDate(value.lastModified);
			
			var announce = value.annos ? value.annos[0]["value"] : "";
			//var announce = "000";
			//if(value.annos){
				//announce = value.annos[0]["value"];
			//}
			
			//if( value.typeCode === 1){//URL
			if( value.type === "text/x-moz-place"){//URL
				
				//Skip RecentTags link
				if( value.uri.indexOf("place:") !== -1){ 
					return false;
				}
				
				
				out = <li key={index}>
					<Link 
						title={value.title} 
						url={value.uri} 
						icon={value.icon}
						announce={announce}
						dateAdded={dateAdded}
						lastModified={lastModified}
					/>
				</li>
			}

			//if( value.typeCode === 2){//CONTAINER
			if( value.type === "text/x-moz-place-container"){//CONTAINER

				var tooltip = "added:" + dateAdded + ", last modified:" + lastModified;
				var url = dataStore.urlViewContainer.replace("{{id}}",value.id);

				out = <li key={index}>
					<div className="bookmarks-container btn-orange">
<a onClick={this.eventHandler} href={url} title={tooltip}>{value.title}</a>
<div className="announce">{announce}</div>

					</div>
				</li>
			}
			
			return out;
		}, this)//next
		
}
				</ul>
	
</div>
		);
	}//end viewContainer()

	
	render(){
//console.log("State: ", this.state);
//console.log(this.props);

//console.log("state.container.children: ", this.state.container["children"]);

		if( this.state.container ){
			if( this.state.container["children"] ){
				return this.viewContainer( this.state.container["children"] );
			} else {
				//return <h1>no children...</h1>
				return this.viewContainer( [this.state.container] );
			}
		} else {
			return <h1>test!!!</h1>;
		}
		
	}//end render()
	
}//end class

export default Container;
