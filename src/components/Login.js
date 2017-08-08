import React, { Component } from 'react';
import { Modal, Button, ButtonToolbar, Form, FormGroup, ControlLabel, FormControl, Col } from 'react-bootstrap';
import {bindActionCreators} from 'redux';

class LogIn extends Component{
    constructor(props){
        super(props);
        this.state={
			showModal: false,
			registerMessage: "",
            passwordError: null,
            emailError: null,
            formError: false
		};
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin(){
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        var error = false;
        console.log('called');

        // Email
        if(email.length < 3){
            var emailError = "error";
            error = true;
        }else{
            var emailError = "success";
        }

        //Password
        if(password.length === 0){
            var passwordError = "error";
            error = true;
        }else{
            var passwordError = "success";
        }

        if(error){
            this.setState({
                formError: true,
                emailError: emailError,
                passwordError: passwordError
            })
        }else{
            this.props.loginFunction({
                email: email,
                password: password
            })
        }
    }

render() {
    return(
      <Form className="login-form-wrapper" horizontal onSubmit={this.handleLogin}>
        <FormGroup >
            <Col className="email-title" componentClass={ControlLabel} sm={4}>
                Email
            </Col>
            <Col sm={10}>
                <FormControl id="email" type="email" name="email" placeholder="Email" />
            </Col>
        </FormGroup>
        <FormGroup>
            <Col componentClass={ControlLabel} sm={4}>
                Password
            </Col>
            <Col sm={10}>
                <FormControl id="password" type="Password" name="loginPassword" placeholder="Password" />
            </Col>
            <Col>
                <ButtonToolbar className="login-buttons">
                    <Button className="login-button" bsStyle="primary" onClick={this.handleLogin}>Login</Button>
                    <Button  className="close-button" onClick={this.props.closeFunction}>Close</Button>
                </ButtonToolbar>
            </Col>
        </FormGroup>
      </Form>
    );
  }
}

{/*// function mapStateToProps(state){*/}
//     return{
//         registerResponse: state.registerReducer
//     }
// }
//
// function mapDispatchToProps(dispatch){
//     return bindActionCreators({
//         LoginAction: LoginAction
//     },dispatch)
// }

export default (LogIn);


