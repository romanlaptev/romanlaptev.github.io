import React, { Component } from 'react';

//import '../node_modules/bootstrap/dist/css/bootstrap.min.css"';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
//import Button from 'react-bootstrap/lib/Button';
//console.log( Button );

import {Button, ButtonToolbar} from 'react-bootstrap';
import {FormGroup, ControlLabel, FormControl, HelpBlock} from 'react-bootstrap';
import { Popover, Tooltip, Modal, OverlayTrigger } from 'react-bootstrap';
  
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
//--------------------------------
class Form1 extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.handleChange = this.handleChange.bind(this);
		this.state = {
			value: ''
		};
	}

	getValidationState() {
		const length = this.state.value.length;
		if (length > 10) return 'success';
			else if (length > 5) return 'warning';
				else if (length > 0) return 'error';
		return null;
	}

	handleChange(e) {
		this.setState({ value: e.target.value });
	}

	render() {
		return (
		<form>
			<FormGroup
				controlId="formBasicText"
				validationState={this.getValidationState()}
			>
				<ControlLabel>Working example with validation</ControlLabel>
				<FormControl
					type="text"
					value={this.state.value}
					placeholder="Enter text"
					onChange={this.handleChange}
				/>
				<FormControl.Feedback />
				<HelpBlock>Validation is based on string length.</HelpBlock>
			</FormGroup>
		</form>
	);
	}
}//end class

//--------------------------------
class Modal1 extends React.Component {
	constructor(props, context) {
		super(props, context);

		this.handleShow = this.handleShow.bind(this);
		this.handleClose = this.handleClose.bind(this);

		this.state = {
		show: false
		};
	}

	handleClose() {
		this.setState({ show: false });
	}

	handleShow() {
		this.setState({ show: true });
	}

	render() {
		const popover = (
		<Popover id="modal-popover" title="popover">
			very popover. such engagement
		</Popover>
		);
		
		const tooltip = <Tooltip id="modal-tooltip">wow.</Tooltip>;

		return (
		<div>
			<p>Click to get the full Modal experience!</p>

			<Button bsStyle="primary" bsSize="large" onClick={this.handleShow}>
				Launch demo modal
			</Button>

			<Modal show={this.state.show} onHide={this.handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Modal heading</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<h4>Text in a modal</h4>
<p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>

				<h4>Popover in a modal</h4>
			<p>
				there is a{' '}
				<OverlayTrigger overlay={popover}>
					<a href="#popover">popover</a>
				</OverlayTrigger>{' '}
				here
			</p>

				<h4>Tooltips in a modal</h4>
				<p>
				  there is a{' '}
				  <OverlayTrigger overlay={tooltip}>
					<a href="#tooltip">tooltip</a>
				  </OverlayTrigger>{' '}
				  here
				</p>

            <hr />

            <h4>Overflowing text to show scroll behavior</h4>
            <p>
              Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
              dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
              ac consectetur ac, vestibulum at eros.
            </p>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur
              et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor
              auctor.
            </p>
            <p>
              Aenean lacinia bibendum nulla sed consectetur. Praesent commodo
              cursus magna, vel scelerisque nisl consectetur et. Donec sed odio
              dui. Donec ullamcorper nulla non metus auctor fringilla.
            </p>
            <p>
              Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
              dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
              ac consectetur ac, vestibulum at eros.
            </p>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur
              et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor
              auctor.
            </p>
            <p>
              Aenean lacinia bibendum nulla sed consectetur. Praesent commodo
              cursus magna, vel scelerisque nisl consectetur et. Donec sed odio
              dui. Donec ullamcorper nulla non metus auctor fringilla.
            </p>
            <p>
              Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
              dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
              ac consectetur ac, vestibulum at eros.
            </p>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur
              et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor
              auctor.
            </p>
            <p>
              Aenean lacinia bibendum nulla sed consectetur. Praesent commodo
              cursus magna, vel scelerisque nisl consectetur et. Donec sed odio
              dui. Donec ullamcorper nulla non metus auctor fringilla.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

//--------------------------------
class App extends Component {
  render() {
    return (
      <div className="App">
	  
		<div className="panel panel-primary">
			<div className="panel-body">
				<Button1/>
				<Button2/>
			</div>
		</div>
		
		<div className="panel panel-primary">
			<div className="panel-heading">
				<h2>Form1</h2>
			</div>
			<div className="panel-body row">
				<div className="col-xs-6">
<Form1 />			
				</div>
				<div className="col-xs-6">
<Modal1 />				
				</div>
			</div>
		</div>
		
      </div>
    );
  }
}

export default App;
