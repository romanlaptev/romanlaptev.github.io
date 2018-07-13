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
		e.preventDefault();		
//console.log(e.target);
//<a href="#?q=view-container&id=79"

		var path = e.target.href.split("?");
		var parseStr = path[1]; 
//console.log( path, parseStr );

		if( parseStr.length > 0 ){
			
			dataStore["GET"] = parseGetParams( parseStr ); 
			var $_GET = parseGetParams(parseStr); 
//console.log( $_GET);

			switch( $_GET["q"] ){
				case "view-container":
					if( $_GET["id"] ){
						this._getContainerByID( $_GET["id"], dataStore["bookmarksArray"], 
							function( res, _this ){
//console.log("CHANGE container:", res, _this);
//console.log( res["id"], res["title"] );
								_this.setState({
									container: res
								});

//UPDATE Breadcrumb								
		_this.props.updateState({
			"title": res["title"],
			"id": "container_" + res["id"]
		}, "updateBreadcrumb");
								
						});
					}
				break;
				
				default:
console.log("error, no action...");
				break;
				
			}//end switch

		} else {
console.log( "Warn! error parse url in " + e.target.href );
		}
			
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
						dateAdded={value.dateAdded}
						lastModified={value.lastModified}
					/>
				</li>
			}

			if( value.typeCode === 2){//CONTAINER
				var tooltip = "added:" + value.dateAdded + ", last modified:" + value.lastModified;
				
				var announce = value.annos ? value.annos[0]["value"]:"001";
				//var announce = "000";
				//if(value.annos){
					//announce = value.annos[0]["value"];
				//}
				
				return <li key={index}>
					<div className="bookmarks-container">
<a onClick={this.eventHandler} href={"#?q=view-container&id="+value.id} title={tooltip}>{value.title}</a>
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



function parseGetParams( parseStr ) { 

	if( !parseStr ){
		var parse_url = window.location.search.substring(1).split("&"); 
	} else {
		var parse_url = parseStr.split("&"); 
	}
//console.log(parse_url);
	
	var $_GET = {}; 
	for(var n = 0; n < parse_url.length; n++) { 
	var getVar = parse_url[n].split("="); 
		//$_GET[ getVar[0] ] = typeof(getVar[1])=="undefined" ? "" : getVar[1]; 
		if( typeof(getVar[1])=="undefined" ){
			$_GET[ getVar[0] ] = "";
		} else {
		 $_GET[ getVar[0] ] = getVar[1];
		}
	}//next
	return $_GET; 
}//end parseGetParams() 
