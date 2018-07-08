//import React from 'react';
import React, { Component } from 'react';
//import { string } from 'prop-types';

//const Link = ({ title, url }) => <a href={url} target="_balnk">{title}</a>;
//class Link extends React.Component {
class Link extends Component {
	render(){
//console.log(this.props);		
		var annos = "Annos!!!";
		
		return(
<div className="link">
	<a className="" href={this.props.url} target="_blank" 
title="created: {{dateAdded}}, modified:{{lastModified}}">
		<img className="icon-uri" src="{{iconuri}}" />
		{this.props.title}
	</a>
	<div className="annos">{annos}</div>
</div>
		);
	}
}//end class

// Link.propTypes = {
  // title: string.isRequired,
  // url: string.isRequired
// };

export default Link;