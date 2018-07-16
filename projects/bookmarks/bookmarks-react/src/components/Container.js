import React, { Component } from 'react';
import dataStore from "./DataStore";
import Link from "./Link";

//console.log("TEST1,", dataStore);
//console.log(Link);


class Container extends Component {
	
	constructor( props ){
console.log("class Container, constructor", props);

		super( props );
		
		if( props["id"] && props["id"] > 0){
			this.state = {
				container: this.getContainerByID( props["id"], dataStore["bookmarksArray"] )
			};
		}

		this.props.updateState({
			"title": this.state.container["title"],
			"id": "container_" + this.state.container["id"]
		}, "updateBreadcrumb");

//console.log("State:", this.state);

		dataStore.components["Container"] = this;
		
	};//end constructor

	
	componentWillMount(){
console.log("- component Container, before render.");
	}//end 
	
	componentDidMount(){
console.log("- component Container, after render.");
	}//end 
           
	shouldComponentUpdate(){
console.log("1. component Container SHOULD update.");
		return true;
	}//end 
           
	componentWillUpdate(){
console.log("2. component Container WILL update.");
console.log(this.props);
console.log(this.state);
	}//end 

	componentDidUpdate(){
console.log("3. component Container DID update.");
console.log(this.props);
console.log(this.state);
	}//end 


	getContainerByID = ( id, jsonObj ) => {
console.log("getContainerByID()", id);
		var arr2 = jsonObj["children"].find( function( element, index){
//console.log(arguments);
			if( element["id"] === parseInt( id ) ){
				return true;
			}
		}, this);//end filter
		return arr2;
	}//end getContainerByID()

/*
	getContainerByID = ( id, jsonObj ) => {
console.log("getContainerByID()", id);
			
		//var resContainer = [];
		if( jsonObj["children"] && jsonObj["children"].length > 0){
			for( var n = 0; n < jsonObj["children"].length; n++){
				var container = jsonObj["children"][n];
//console.log( "TEST1", container );
				if( container["id"] === parseInt( id ) ){
console.log( "TEST2", container["id"], id, container );
					return container;
					//resContainer = container;
					//break;
					//return resContainer;
				} 
				
				//recursive search ID
				if( container["children"] && container["children"].length > 0){
					this.getContainerByID( id, container );
				}
				
			}//next
		}
		//return resContainer;

	}//end getContainerByID()
*/

	_getContainerByID = ( id, jsonObj, postFunc ) => {
console.log("_getContainerByID()", id);
			
		if( jsonObj["children"] && jsonObj["children"].length > 0){
			for( var n = 0; n < jsonObj["children"].length; n++){
				var container = jsonObj["children"][n];
//console.log( "_TEST1", container );
				if( container["id"] === parseInt( id ) ){
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
//console.log("Container.eventHandler()", e);
		//dataStore.eventHandler(e, this);
		dataStore.sharedFunc["eventHandler"](e);

		e.preventDefault();		
	};//end eventHandler
	
	
	//viewContainer(){
	viewContainer = (data) => {
console.log("viewContainer(): ", data);
		//return <h1>Test!</h1>;
		return(
<div>
				<ul className="ant-select">
{ 

		data.map( function(value, index){
//console.log(  index, value );

			var dateAdded = dataStore.sharedFunc["parseDate"](value.dateAdded);
			var lastModified = dataStore.sharedFunc["parseDate"](value.lastModified);
			
			if( value.typeCode === 1){//URL
				
				//Skip RecentTags link
				if( value.uri.indexOf("place:") !== -1){ 
					return false;
				}
				
				
				return <li key={index}>
					<Link 
						title={value.title} 
						url={value.uri} 
						icon={value.icon}
						announce={value.annos[0]["value"]}
						dateAdded={dateAdded}
						lastModified={lastModified}
					/>
				</li>
			}

			if( value.typeCode === 2){//CONTAINER
				var tooltip = "added:" + dateAdded + ", last modified:" + lastModified;
				
				var announce = value.annos ? value.annos[0]["value"]:"001";
				//var announce = "000";
				//if(value.annos){
					//announce = value.annos[0]["value"];
				//}
				var url = dataStore.urlViewContainer.replace("{{id}}",value.id);
				return <li key={index}>
					<div className="bookmarks-container">
<a onClick={this.eventHandler} href={url} title={tooltip}>{value.title}</a>
<div className="announce">{announce}</div>

					</div>
				</li>
			}
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
		if( this.state.container["children"] ){
			return this.viewContainer( this.state.container["children"] );
		} else {
			//return <h1>no children...</h1>
			return this.viewContainer( [this.state.container] );
		}
	}
}//end class

export default Container;
