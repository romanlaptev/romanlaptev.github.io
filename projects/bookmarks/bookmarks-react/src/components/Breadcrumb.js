import React, { Component } from 'react';
import { Breadcrumb } from 'antd';

import dataStore from "./DataStore";

  
class BreadcrumbApp extends Component {

/*	
	constructor( props ){
		super( props );
		
		this.state = {
			breadcrumbPath: {
				"container_2" : "Меню закладок"
			}
		};
		
	};//end constructor
*/

//https://metanit.com/web/react/2.6.php
	componentWillMount(){
console.log("- component Breadcrumb (BreadcrumbApp), before render.");
	}
	
	componentDidMount(){
console.log("- component Breadcrumb (BreadcrumbApp), after render.");
	}
           
	shouldComponentUpdate(){
console.log("1. component Breadcrumb (BreadcrumbApp) SHOULD update.");
		return true;
	}
           
	componentWillUpdate(){
console.log("2. component Breadcrumb (BreadcrumbApp) WILL update.");
	}

	componentDidUpdate(){
console.log("3. component Breadcrumb (BreadcrumbApp) DID update.");
	}
           
	render(){
//console.log(this.props);
		
	//for( var key in dataStore.breadcrumbPath){
//console.log( key, dataStore.breadcrumbPath[key] );
	//}//next
		
		return(
		
				<div className="breadcrumb">
					<Breadcrumb>
{
	Object.keys( dataStore.breadcrumbPath ).map( function(key, index){
//console.log(key, index, dataStore.breadcrumbPath[key] );
		return <Breadcrumb.Item key={key}><a href="#?q=view-container&amp;id=">{dataStore.breadcrumbPath[key]}</a></Breadcrumb.Item>
	})//next
}						
					</Breadcrumb>
				</div>
				
		);
	}
}//end class

export default BreadcrumbApp;
