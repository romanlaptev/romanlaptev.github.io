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

	// ReactDOM.render(React.createElement(
	  // 'h1',
	  // //null,
	  // {className: "style1"},
	  // 'Hello, React!'
	// ), document.getElementById('root'));

// var App = React.createClass({
	// render : function(){
		// return (<div className="style1">test</div>)
	// }
// });

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

//create App
class App extends React.Component{
	render() {
		//return <div className="style1">test</div>;
		return ( 
			<div className="panel panel-primary">
				<AppHeader/> 
				<AppBody/> 
				<AppBody/> 
				<AppBody/> 
			</div>
		);
	}
};

console.log( App );	
console.log(App.prototype.render, typeof App.prototype.render);	
console.log(App.prototype.render.toString() );	

//insert App
ReactDOM.render( <App/>, document.querySelector("#root") );