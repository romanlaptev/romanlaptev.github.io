import React, { Component } from 'react';
//import './Form.css’;

class DemoForm extends Component {
	
	constructor (props) {
	  super(props);
	  this.state = {
		email: "",
		password: "",
		formErrors: { email: '', password: ''},
		emailValid: false,
		passwordValid: false,
		formValid: false		
	  }
	  this.formSubmit = this.formSubmit.bind( this );
	}

	handleUserInput = (e) => {
console.log(this.state);
		const name = e.target.name;
		const value = e.target.value;
//console.log(name,  value);
		//this.setState( {[name]: value} );
		this.setState({[name]: value}, () => { this.validateField(name, value) });		
	}
	
	
	validateField(fieldName, value) {
		let fieldValidationErrors = this.state.formErrors;
		let emailValid = this.state.emailValid;
		let passwordValid = this.state.passwordValid;

		switch(fieldName) {
		  case 'email':
			emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
			fieldValidationErrors.email = emailValid ? '' : ' is invalid';
			break;
		  case 'password':
			passwordValid = value.length >= 6;
			fieldValidationErrors.password = passwordValid ? '': ' is too short';
			break;
		  default:
			break;
		}
		
		this.setState({formErrors: fieldValidationErrors,
						emailValid: emailValid,
						passwordValid: passwordValid
					  }, this.validateForm);
					  
	}//end validateField()

	validateForm() {
	this.setState({formValid: this.state.emailValid && this.state.passwordValid});
	}

	errorClass(error) {
	return(error.length === 0 ? '' : 'has-error');
	}
	
	formSubmit( event ) {
		event.preventDefault();
console.log("formSubmit", arguments);
console.log( this );
	}
	
	render () {
		return (
		 <form className="demoForm" action="" onSubmit={this.formSubmit}>
		 
			<div className="panel panel-default">
			  <FormErrors formErrors={this.state.formErrors} />
			</div>
			
		   <div className="form-group">
			 <label htmlFor="email">Email address</label>
			 
			 <input type="email" className="form-control" name="email" 
			 value={this.state.email} 
			 onChange={this.handleUserInput}/>
			 
		   </div>
		   <div className="form-group">
			 <label htmlFor="password">Password</label>
			 
			 <input type="password" className="form-control" name="password" 
			 value={this.state.password} 
			 onChange={this.handleUserInput}/>
			 
		   </div>
		   <button type="submit" className="btn btn-primary"> Sign up </button>
		 </form>
		)
	}
 
}//end class

const FormErrors = ({formErrors}) =>
<div className='formErrors'>
{Object.keys(formErrors).map((fieldName, i) => {
  if(formErrors[fieldName].length > 0){
	return (
	  <p className="alert alert-danger" key={i}>{fieldName} {formErrors[fieldName]}</p>
	)        
  } else {
	return '';
  }
})}
</div>
  
console.log(DemoForm);

export default DemoForm;