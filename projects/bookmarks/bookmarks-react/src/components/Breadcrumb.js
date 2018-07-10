import React, { Component } from 'react';
//import bookmarksArray from "./DataContainer";

//console.log("TEST1,", Bookmarks);	
//console.log(Link);


class Breadcrumb extends Component {
	
	constructor( props ){
		super( props );
		
		this.state = {
			breadcrumbPath: {
				"container_2" : "Меню закладок"
			}
		};
		
	};//end constructor


	render(){
//console.log("State: ", this.state);
//console.log(this.props);		
		var title = this.state.breadcrumbPath["container_2"];
		return(
				<div className="panel">
					<ul className="breadcrumb breadcrumb-custom">
						<li><a href="#?q=view-container&amp;id=">{title}</a></li>
					</ul>				
				</div>
		);
	}
}//end class

export default Breadcrumb;
