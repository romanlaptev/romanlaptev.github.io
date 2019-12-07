//import React from 'react';
import React, { Component } from 'react';
//import { string } from 'prop-types';

//const Link = ({ title, url }) => <a href={url} target="_balnk">{title}</a>;
//class Link extends React.Component {
class Link extends Component {
	render(){
//console.log(this.props);		
		var linkTitle = "added:" + this.props.dateAdded + ", last modified:" + this.props.lastModified;
		
		return(
<div className="link">
	<a className="" href={this.props.url} target="_blank" title={linkTitle}>
		<img className="icon-uri" src={this.props.icon} alt=""/>
		<span>{this.props.title}</span>
	</a>
	<div className="announce">{this.props.announce}</div>
</div>
		);
	}
}//end class

// Link.propTypes = {
  // title: string.isRequired,
  // url: string.isRequired
// };

export default Link;
