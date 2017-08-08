import React, { Component } from 'react';
import { Form, FormGroup, ControlLabel, FormControl, Button, Col ,MenuItem} from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import RegisterAction from '../actions/RegisterAction';
import {connect} from 'react-redux';


class Register extends Component {
	constructor(props){
		super(props);
		this.state = {
			registerMessage: "",
			nameError: null,
			emailError: null,
			formError: false
		};
		this.handleRegistration = this.handleRegistration.bind(this);
	}

	handleRegistration(event){
		event.preventDefault();
		console.log('user submitted form')
		var name =event.target[0].value;
		var email =event.target[1].value;
		var address =event.target[2].value;
		var city =event.target[3].value;
		var state =event.target[4].value;
		var password =event.target[5].value;
		var error = false;

		//name
		if(name.length < 3){
			var nameError = 'error';
			error=true;
		}else{
			var nameError = 'success'
		}

		//email
		if(email.length < 3){
			var emailError = "error";
			error=true;
		}else{
			emailError = 'success'
		}

		if(error){
			this.setState({
				formError: true,
				emailError: emailError,
				nameError: nameError
			})
		}else{
			this.props.registerAction({
				name: name,
				email: email,
				address: address,
				city: city,
				state: state,
				password: password
			});
		}
	}

	componentWillReceiveProps(nextProps){
		console.log(nextProps.registerResponse)
		if(nextProps.registerResponse.msg === 'userInserted'){
			this.props.history.push('/home');
		}else if(nextProps.registerResponse.msg === 'userAlreadyExists'){
			console.log('used');
			this.setState({
				registerMessage: 'Sorry, this username is taken'
			})
		}
	}

	render(){
		
		return(
			<div className="register-wrapper">
				<h1 className="register-registerMessage">{this.state.registerMessage}</h1>
				<Form horizontal className="register-form-whole" onSubmit={this.handleRegistration}>
					<FormGroup className="register-form-name"controlId="formHorizontalName" validationState={this.state.nameError}>
						<Col  componentClass={ControlLabel} sm={2}>
							Name
						</Col>
						<Col sm={10}>
							<FormControl className="empty-form" type="text" name="fullName" placeholder="Full Name" />
						</Col>
					</FormGroup>
					<FormGroup controlId="formHorizontalName" validationState={this.state.emailError}>
						<Col componentClass={ControlLabel} sm={2}>
							Email
						</Col>
						<Col sm={10}>
							<FormControl className="empty-form" type="email" name="email" placeholder="Email" />
						</Col>
					</FormGroup>
					<FormGroup controlId="formHorizontalName">
						<Col componentClass={ControlLabel} sm={2}>
							Address
						</Col>
						<Col sm={10}>
							<FormControl className="empty-form" type="text" name="type" placeholder="Address" />
						</Col>
					</FormGroup>
					
					<FormGroup controlId="formHorizontalName">
						<Col componentClass={ControlLabel} sm={2}>
							City
						</Col>
						<Col sm={10}>
							<FormControl className="empty-form" type="text" name="city" placeholder="City" />
						</Col>
					</FormGroup>
					<FormGroup controlId="formHorizontalName">
						<Col componentClass={ControlLabel} sm={2}>
							State
						</Col>
						<Col sm={10}>
							<FormControl className="empty-form" type="text" name="state" placeholder="State" />
						</Col>
					</FormGroup>
					<FormGroup controlId="formHorizontalName">
						<Col componentClass={ControlLabel} sm={2}>
							Password
						</Col>
						<Col sm={10}>
							<FormControl className="empty-form" type="password" name="password" placeholder="Password" />
						</Col>
					</FormGroup>
					
					<FormGroup>
						<Col smOffset={2} sm={10}>
							<Button bsStyle="primary" bsSize="small" type="submit">
								SIGN UP!
							</Button>
						</Col>
					</FormGroup>
				</Form>
			</div>
		)
	}
}

function mapStateToProps(state){
	return{
		registerResponse: state.registerReducer
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		registerAction: RegisterAction
	},dispatch)
}

// export default Register;
export default connect(mapStateToProps, mapDispatchToProps)(Register);