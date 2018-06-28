import React, { Component } from 'react';

import 'typeface-roboto';
import Button from '@material-ui/core/Button';

//import PropTypes from 'prop-types';
//import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


import TestSwitches from "./TestSwitches";
//console.log(TestSwitches);
import TestReactSelect from "./TestReactSelect";

import RadioButtonsGroup from "./TestRadioBtn";
console.log(RadioButtonsGroup);


//--------------------------------
class FormDialog extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <Button onClick={this.handleClickOpen}>Open form dialog</Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address here. We will send
              updates occasionally.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Subscribe
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}//end class

//--------------------------------
//--------------------------------


class App extends Component {
render() {
	return (
		<div className="App">
			<div className="panel">
				<Button variant="contained" color="primary"> Primary btn </Button>		
				<Button variant="contained" color="secondary"> Secondary btn </Button>		
			</div>
			
			<div className="panel">
				<h3>Grid test</h3>
				<Grid container spacing={24}>
				
					<Grid item xs={2}>1</Grid>
					
					<Grid item xs={5}>2</Grid>
					
					<Grid item xs={12}>
						<Paper>xs=12</Paper>
					</Grid>
					
					<Grid item xs={12} sm={6}>
						<Paper>xs=12 sm=6</Paper>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Paper>xs=12 sm=6</Paper>
					</Grid>
					<Grid item xs={6} sm={3}>
						<Paper>xs=6 sm=3</Paper>
					</Grid>
					<Grid item xs={6} sm={3}>
						<Paper>xs=6 sm=3</Paper>
					</Grid>
					<Grid item xs={6} sm={3}>
						<Paper>xs=6 sm=3</Paper>
					</Grid>
					<Grid item xs={6} sm={3}>
						<Paper>xs=6 sm=3</Paper>
					</Grid>
				</Grid>
			</div>
			
			<div className="panel">
				<h3>FormDialog test</h3>
<FormDialog />
			</div>

			<div className="panel">
				<h3>RadioButtonsGroup test</h3>
<RadioButtonsGroup />				
			</div>
			
			<div className="panel">
				<h3>Test switches</h3>
<TestSwitches />				
			</div>

			<div className="panel">
				<h3>Test ReactSelect</h3>
<TestReactSelect />
			</div>

		</div>
    );
  }
}//end class

export default App;
