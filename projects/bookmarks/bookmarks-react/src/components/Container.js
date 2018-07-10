import React, { Component } from 'react';
import bookmarksArray from "./DataContainer";
import Link from "./Link";

//console.log("TEST1,", Bookmarks);	
//console.log(Link);


class Container extends Component {
	
	constructor( props ){
		super( props );
		
		if( props["root"] && props["root"].length > 0){
			this.state = {
				container: _getContainerByName( props["root"] )
			};
		}
		
		if( props["id"] && props["id"] > 0){
			this.state = {
				container: _getContainerByID( props["id"] )
			};
		}
		
	};//end constructor
	
	
	//viewContainer(){
	viewContainer = () => {
//console.log("container: ", this.state.container);
		//return <h1>Test!</h1>;
		return(
<div>
				<div className="container panel">
					<h1>component Container, root: {this.props.root}</h1>
				</div>
				
				<ul className="ant-select">
{ 
		this.state.container.map( function(value, index){
console.log(  index, value );
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
					<div className="panel container">
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



function _getContainerByName( name ){
//console.log("container name(root): ", name);
	
	var arr2 = bookmarksArray.filter( function( element, index){
//console.log(arguments);
		if( element["root"] === name){
			return element;
		}
	});//end filter
//console.log(arr2);

	return arr2;
}//end _getContainerByName()

function _getContainerByID( id ){
	var arr2 = bookmarksArray.filter( function( element, index){
//console.log(arguments);
		if( element["id"] === parseInt(id) ){
			return element;
		}
	});//end filter
//console.log(arr2);

	return arr2;
}//end _getContainerByID()
