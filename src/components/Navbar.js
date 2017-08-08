import React, {Component} from 'react';
import Login from './Login';
import {Link} from 'react-router-dom';
import $ from 'jquery';
import {Modal, Button, Navbar, Nav, NavItem, NavDropdown, MenuItem, Form, FormGroup, ControlLabel, FormControl, Col} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import {bindActionCreators} from 'redux';
import LoginAction from '../actions/LoginAction';
import {connect} from 'react-redux';

class NavBar extends Component{
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
		this.open=this.open.bind(this);
		this.close=this.close.bind(this)
	}

	open(){
		this.setState({showModal: true});
	}

	close(){
		this.setState({showModal: false})
	}

	handleLogin(loginData){

            this.props.LoginAction(
                loginData
            )
    }

    componentWillReceiveProps(nextProps){
		console.log(nextProps.registerResponse.msg);
        if(nextProps.registerResponse.msg === 'loginSuccess'){
        	console.log('success');
			// this.props.getCart(nextProps.registerResponse.token)
			this.close();
			this.props.history.push('/home');
			console.log('success')
		}else if(nextProps.registerResponse.msg === 'userAlreadyExists'){
			console.log("User name taken!")
			this.setState({
				registerMessage: "Please enter the correct email and password"
			})
		}
    }

	render(){
		return(
			<div>
				<Navbar inverse collapseOnSelect fixedTop>
					<Navbar.Header>
						<Navbar.Brand>
							<Link to="/home" className="brand"><img className="logo-icon" src="/img/roulette-icon.png" /></Link>
						</Navbar.Brand>
                        <Navbar.Toggle />
					</Navbar.Header>
					<Navbar.Collapse className="navBar">
						<Nav pullRight className="right-nav">
							<LinkContainer to="/register">
								<NavItem eventKey={1}>Register</NavItem>
							</LinkContainer>
							<NavItem eventKey={2} onClick={this.open}>
								Login
							</NavItem>
								<Modal
									className="modal-container"
									show={this.state.showModal}
									onHide={this.close}
									animation={true}
									bsSize="small"
									onSubmit={this.handleLogin}>
									<Modal.Header closeButton>
										<Modal.Title>Please Sign In</Modal.Title>
									</Modal.Header>
									<Modal.Body>
										<Login loginFunction={this.handleLogin} closeFunction={this.close}/>
									</Modal.Body>
								</Modal>
							<LinkContainer to="/groups">
								<NavItem eventKey={3}>
									Groups
								</NavItem>
							</LinkContainer>
							<NavItem eventKey={2}>
								About Us
							</NavItem>
						</Nav>
					</Navbar.Collapse>
				</Navbar>
			</div>
		);
	}
}

function mapStateToProps(state){
    return{
        registerResponse: state.registerReducer
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        LoginAction: LoginAction
    },dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(NavBar)