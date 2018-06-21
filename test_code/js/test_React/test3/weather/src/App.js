import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

console.log(logo);	  

var phones = [
    {
        "imageUrl": "../../images/phones/motorola-xoom-with-wi-fi.0.jpg", 
        "name": "Motorola XOOM\u2122 with Wi-Fi"
    }, 
    {
        "imageUrl": "../../images/phones/motorola-xoom.0.jpg", 
        "name": "MOTOROLA XOOM\u2122", 
    }, 
    {
        "imageUrl": "../../images/phones/motorola-atrix-4g.0.jpg", 
        "name": "MOTOROLA ATRIX\u2122 4G"
    }
];
//console.log(phones);	  

const PLACES = [
  { name: "Palo Alto", zip: "94303" },
  { name: "San Jose", zip: "94088" },
  { name: "Santa Cruz", zip: "95062" },
  { name: "Honolulu", zip: "96803" }
];

class App extends Component {
	
	constructor() {
		super();
		this.state = {
			activePlace: 0,
		};
	}
	
	render() {
		const activePlace = this.state.activePlace;
		return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React <span id="version"></span></h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
		
		{PLACES.map((place, index) => (
			<button
			className="btn btn-primary"
			key={index}
			onClick={ () => {
console.log('Clicked index '+index);
				this.setState({ activePlace: index });
			} }
			>
			  {place.name}
			</button>
		))}
	
		<WeatherDisplay
			key={activePlace}
			zip={PLACES[activePlace].zip}
		/>

		<Test1 arg1="123"/>
		<ul>
		{
			phones.map( function( phone, index){
//console.log(phone, index);
				return <li key={index}> {index}. {phone["name"]}, {phone["imageUrl"]} </li>
			})
		}
		</ul>
		
	</div>
	  
    );
  }
}

export default App;


class WeatherDisplay extends Component {
	render() {
		return (
			<h1>Displaying weather for city {this.props.zip}</h1>
		);
	}
}

class Test1 extends Component{
	render(){
console.log(this.props);		
		var out = <p>Test1, arg1: {this.props.arg1} </p>;
		return out;
	}
}//end class

// class Test2 extends Component{
	// render(){
		// return(<p>Test2!!!!!</p>);
	// }
// }//end class

// ReactDOM.render(
	// <Test2 />, document.querySelector("#test2"), function(){
// console.log(arguments);		
	// }
// );