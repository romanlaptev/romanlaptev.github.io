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

	render(){
		
	//for( var key in dataStore.breadcrumbPath){
//console.log( key, dataStore.breadcrumbPath[key] );
	//}//next
		
		return(
		
				<div className="breadcrumb">
					<Breadcrumb>
{
	Object.keys( dataStore.breadcrumbPath ).map( function(key, index){
//console.log(key, index, dataStore.breadcrumbPath[key] );
		return <Breadcrumb.Item><a href="#?q=view-container&amp;id=">{dataStore.breadcrumbPath[key]}</a></Breadcrumb.Item>
	})//next
}						
					</Breadcrumb>
				</div>
				
		);
	}
}//end class

export default BreadcrumbApp;
