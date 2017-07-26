import React, {Component} from 'react';
import Login from './Login';
import {Link} from 'react-router-dom';
import $ from 'jquery';
import {Modal, Button, Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'

class NavBar extends Component{
	constructor(props){
		super(props);
		this.state={
			showModal: false
		};

		this.open=this.open.bind(this)
		this.close=this.close.bind(this)
	}

	open(){
		this.setState({showModal: true});
	}

	close(){
		this.setState({showModal: false})
	}

	render(){
		return(
			<div>
				<Navbar inverse collapseOnSelect fixedTop>
					<Navbar.Header>
						<Navbar.Brand>
							<Link to="/" className="brand"><img className="logo-icon" src="/img/roulette-icon.png" /></Link>
						</Navbar.Brand>
                        <Navbar.Toggle />
					</Navbar.Header>
					<Navbar.Collapse>
						<Nav pullRight className="right-nav">
							<LinkContainer to="/register">
								<NavItem eventKey={1}>Register</NavItem>
							</LinkContainer>
                            <NavItem eventKey={2} onClick={this.open.showModal}>
								Login
							</NavItem>
								<div>
									<Modal className="modal-container"
									  show={this.state.showModal}
									  onHide={this.close}
									  animation={true}
									  bsSize="small">

									  <Modal.Header closeButton>
										<Modal.Title>Modal title</Modal.Title>
									  </Modal.Header>
										{Login}
									  <Modal.Footer>
										<Button onClick={this.close}>Close</Button>
										<Button bsStyle="primary">Save changes</Button>
									  </Modal.Footer>
									</Modal>
								</div>
							<NavItem eventKey={3}>
								Groups
							</NavItem>
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


export default NavBar