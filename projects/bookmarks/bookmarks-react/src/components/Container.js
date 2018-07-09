import React, { Component } from 'react';

class Container extends Component {
	render(){
//console.log(this.props);		
		
		return(
<div className="container panel">
	<h1>component Container, id {this.props.id}.</h1>
</div>
		);
	}
}//end class

export default Container;