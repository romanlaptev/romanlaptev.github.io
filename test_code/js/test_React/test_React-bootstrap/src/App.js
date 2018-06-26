import React, { Component } from 'react';

//import '../node_modules/bootstrap/dist/css/bootstrap.min.css"';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
//import Button from 'react-bootstrap/lib/Button';
//console.log( Button );

import {Button, ButtonToolbar} from 'react-bootstrap';

class Button1 extends React.Component {
	render() {
		return (
      <Button bsStyle="primary"> Button1 </Button>
    );
  }
}

class Button2 extends React.Component {
	render() {
		return (
			<ButtonToolbar>
			  <Button>Default</Button>
			  <Button bsStyle="primary" bsSize="large">Primary</Button>
			  <Button bsStyle="success">Success</Button>
			  <Button bsStyle="info">Info</Button>
			  <Button bsStyle="warning">Warning</Button>
			  <Button bsStyle="danger">Danger</Button>
			  <Button bsStyle="link">Link</Button>
			</ButtonToolbar>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
		<Button1/>
		<Button2/>
      </div>
    );
  }
}

export default App;
