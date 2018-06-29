import React, { Component } from 'react';

import { Button, Form } from 'semantic-ui-react';

import "semantic/dist/semantic.min.css";
import  "semantic-ui-calendar-react/dist/css/calendar.min.css";


import AccordionExampleStyled from "./AccordionExample";
import AccordionExampleMenu from "./AccordionExampleMenu";

//import { Grid, Segment } from 'semantic-ui-react';
import { Grid } from 'semantic-ui-react';

//import { Select } from 'semantic-ui-react'
//import { countryOptions } from 'common'
// [{ key: 'af', value: 'af', flag: 'af', text: 'Afghanistan' }, ...{}]

//const SelectExample = () => <Select placeholder='Select your country' options={countryOptions} />

//----------------------
import DateTimeExample from "./DateTimeExample";

//----------------------
import SidebarExampleSidebar from "./SidebarExampleSidebar";

//----------------------
import TableExampleSortable from "./TableExampleSortable";

//----------------------
import { Radio } from 'semantic-ui-react'
const RadioExampleToggle = () => <Radio toggle />


const ButtonExampleEmphasis = () => (
  <div className="panel">
    <Button primary>Primary</Button>
    <Button secondary>Secondary</Button>
  </div>
);

const FormExampleUnstackable = () => (
	<Form unstackable>
		<Form.Group widths={2}>
			<Form.Input label='First name' placeholder='First name' />
			<Form.Input label='Last name' placeholder='Last name' />
		</Form.Group>
		<Form.Checkbox label='I agree to the Terms and Conditions' />
		<Button type='submit'>Submit</Button>
	</Form>
);


class FormExampleClearOnSubmit extends Component {
  state = {}

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = () => this.setState({ email: '', name: '' })

  render() {
    const { name, email } = this.state

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group>
          <Form.Input placeholder='Name' name='name' value={name} onChange={this.handleChange} />
          <Form.Input placeholder='Email' name='email' value={email} onChange={this.handleChange} />
          <Form.Button content='Submit' />
        </Form.Group>
      </Form>
    )
  }
};//end class

//----------------------

class App extends Component {
  render() {
    return (
      <div className="App">
<ButtonExampleEmphasis />
		  <div className="panel">
				<FormExampleUnstackable />
		  </div>
		  
		  <div className="panel">
			<FormExampleClearOnSubmit />
		  </div>
		  
		  <div className="panel">
<h3>AccordionExampleStyled</h3>
<AccordionExampleStyled />
		  </div>
		  
		  <div className="panel">
<h3>AccordionExampleMenu</h3>
<AccordionExampleMenu />
		  </div>
		  
		<div className="panel">
			<Grid>
				<Grid.Row>
					<Grid.Column width={2}> column 1 </Grid.Column>
					<Grid.Column width={8}>
						<RadioExampleToggle />
					</Grid.Column>
					<Grid.Column width={6}>
						<h3>RadioExampleToggle</h3>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		</div>
			  
		<div className="panel">
			<h3>TableExampleSortable</h3>
			<TableExampleSortable />
		</div>
		
		<div className="panel">
			<h3>Sidebar Example</h3>
			<div className="fix1">
				<SidebarExampleSidebar />
			</div>
		</div>

		<div className="panel">
			<h3>DateTimeExample</h3>
			<DateTimeExample />
		</div>
		
		
	  </div>
    );
  }
}//end class

export default App;