//import React from '../node_modules/react/umd/react.development.js';
//import ReactDOM from '../node_modules/react-dom/umd/react-dom.development.js';
//import React from 'react';
//import ReactDOM from 'react-dom';
//import ‘bootstrap/dist/css/bootstrap.css’; 
//import ‘bootstrap/dist/css/bootstrap-theme.css’;

// ReactDOM.render(
  // <h1>Hello, world!</h1>,
  // document.getElementById('root')
// );

//component App
class AppHeader extends React.Component{
	render(){
		return(
		<div className="panel-heading"><h2>Application1</h2></div>
		)
	}
};

class AppBody extends React.Component{
	render(){
		return(
			<div className="panel-body">...App-body...</div>
		)
	}
};

//define component, functional variant
function AppFooter(){
	return <div className="panel-footer">...App-footer...</div>
};

//define component, arrow function
const Button1 =() => {
	return(
		<button className="btn btn-large btn-danger">101</button>
	)
};

//create App
class App extends React.Component{
	render() {
		return ( 
			<div>
				<div className="panel panel-primary">
					<AppHeader/> 
					<AppBody/> 
					<AppBody/> 
					<AppBody/> 
					<AppFooter/>
				</div>
				<Button1 />
			</div>
		);
	}
};

console.log( App );	
console.log(App.prototype.render, typeof App.prototype.render);	
console.log(App.prototype.render.toString() );	

//insert App
ReactDOM.render( <App/>, document.querySelector("#root") );


// var App2 = React.createClass({
	// render : function(){
		// return (<div className="style1">create component, use method <b>React.createClass</b></div>)
	// }
// });
// ReactDOM.render( <App/>, document.querySelector("#app2") );

var App2 = React.createElement( "h1", {className: "style1"}, "Hello, React!");
ReactDOM.render( App2, document.querySelector("#app2") );
