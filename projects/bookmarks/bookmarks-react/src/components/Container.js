import React, { Component } from 'react';
import Bookmarks from "./DataContainer";
import Link from "./Link";

//console.log("TEST1,", Bookmarks);	
//console.log(Link);

class Container extends Component {
	
	constructor( props ){
		super( props );
		this.state = {
			bookmarks: Bookmarks
		};
	};//end constructor
	
	render(){
//console.log(this.props);		
		
		return(
<div>
				<div className="container panel">
					<h1>component Container, id {this.props.id}.</h1>
				</div>
				
				<ul className="ant-select">
{
//console.log(  this.state. )
				this.state.bookmarks.map( function(value, index){
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
							<div className="panel container">
								title={value.title}<br/>
								announce={value.announce}<br/>
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
	}
}//end class

export default Container;