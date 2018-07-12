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
		this.props.updateBreadcrumb({
			"title": this.state.container["title"],
			"id": "container_" + this.state.container["id"]
		});
		
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
//console.log(this.props);
	}//end 

	componentDidUpdate(){
console.log("3. component Container DID update.");
//console.log(this.props);
	}//end 

	
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
	viewContainer = (data) => {
//console.log("container: ", this.state.container);
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
				
				return <li key={index}>
					<div className="bookmarks-container">
<a href={"#?q=view-container&id="+value.id} title={tooltip}>{value.title}</a>
<div className="announce">{value.annos[0]["value"]}</div>

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
