//import React from '../node_modules/react/umd/react.development.js';
//import ReactDOM from '../node_modules/react-dom/umd/react-dom.development.js';
//import React from 'react';
//import ReactDOM from 'react-dom';

var msg = "React version: " + React.version;
console.log( msg );	

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

class App extends React.Component{
	render() {
		return <div className="style1">test</div>;
	}
};

console.log( App );	
console.log(App.prototype.render, typeof App.prototype.render);	
console.log(App.prototype.render.toString() );	

ReactDOM.render( <App/>, document.querySelector("#root") );