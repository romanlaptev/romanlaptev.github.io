import React, { Component } from 'react';
import dataStore from "./DataStore";
import Link from "./Link";

//console.log("TEST1,", dataStore);
//console.log(Link);


class Container extends Component {
	
	constructor( props ){
console.log("class Container, constructor", props);

		super( props );
		
		if( props["root"] && props["root"].length > 0){
			this.state = {
				container: this.getContainerByName()
			};
		}
		
		if( props["id"] && props["id"] > 0){
			this.state = {
				container: this.getContainerByID()
			};
		}

//delete dataStore.breadcrumbPath["container_454"];
	};//end constructor
	
	getContainerByName = () => {
//console.log("container name(root): ", this.props.root);
		var arr2 = dataStore["bookmarksArray"].find( function( element, index){
			if( element["root"] === this.props.root ){
				return element;
			}
		}, this);//end filter
//console.log("arr2: ", arr2);
		return arr2;
	}//end getContainerByName()
	

	getContainerByID = () => {
		var arr2 = dataStore["bookmarksArray"].find( function( element, index){
//console.log(arguments);
			if( element["id"] === parseInt( this.prop.id ) ){
				return element;
			}
		}, this);//end filter
//console.log(arr2);
		return arr2;
	}//end getContainerByID()

	
	//viewContainer(){
	viewContainer = () => {
//console.log("container: ", this.state.container);
		//return <h1>Test!</h1>;
		return(
<div>
				<ul className="ant-select">
{ 

		this.state.container["children"].map( function(value, index){
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
					<div className="bookmarks-container">
						title={value.title}<br/>
						dateAdded={value.dateAdded}<br/>
						lastModified={value.lastModified}
					</div>
				</li>
			}
		})//next
		
}
				</ul>
	
</div>
		);
	}//end viewContainer()

	
	render(){
//console.log("State: ", this.state);
//console.log(this.props);		
		return this.viewContainer();
	}
}//end class

export default Container;
