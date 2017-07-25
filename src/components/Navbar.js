import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import $ from 'jquery';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';


class NavBar extends Component{
	constructor(props){
		super(props);
	}
	render(){
		return(
			<div>
				<Navbar inverse collapseOnSelect fixedTop>
					<Navbar.Header>
						<Navbar.Brand>
							site logo here
						</Navbar.Brand>
                        <Navbar.Toggle />
					</Navbar.Header>
					<Navbar.Collapse>
						<Nav pullRight>
							<NavItem eventKey={1}>
								About
							</NavItem>
                            <NavItem eventKey={2}>
								Contact
							</NavItem>
						</Nav>
					</Navbar.Collapse>
				</Navbar>
			</div>
		)
	}
}


export default NavBar