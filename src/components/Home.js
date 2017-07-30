import React, { Component } from 'react';
import $ from 'jquery';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import drawRoulette from '../roulette';



class Home extends Component{
	constructor(props) {
		super(props);
		this.state = {
			options: []
		}
		

	}
	componentDidMount() {
		drawRoulette()
	}	
	


	render(){

		
		return(
			<div>
				<div className="buttons">
				  <DropdownButton bsStyle="primary" className="butt" title='Minimum Price'id={`dropdown-basic`}>
				     <MenuItem eventKey="1">$10</MenuItem>
				     <MenuItem eventKey="2">$20</MenuItem>
				     <MenuItem eventKey="3">$30</MenuItem>
				     <MenuItem eventKey="4">$40</MenuItem>
				     <MenuItem eventKey="5">$50</MenuItem>
				     <MenuItem eventKey="6">$75</MenuItem>
				     <MenuItem eventKey="7">$100</MenuItem>
				     <MenuItem eventKey="8">$125</MenuItem>
				     <MenuItem eventKey="9">$150</MenuItem>
				     <MenuItem eventKey="10">$200</MenuItem>
				     <MenuItem eventKey="11">$250</MenuItem>
				   </DropdownButton>
				   <DropdownButton bsStyle="primary" className="butt" title='Maximum Price'id={`dropdown-basic`}>
				     <MenuItem eventKey="1">$20</MenuItem>
				     <MenuItem eventKey="2">$30</MenuItem>
				     <MenuItem eventKey="3">$40</MenuItem>
				     <MenuItem eventKey="4">$50</MenuItem>
				     <MenuItem eventKey="5">$75</MenuItem>
				     <MenuItem eventKey="6">$100</MenuItem>
				     <MenuItem eventKey="7">$125</MenuItem>
				     <MenuItem eventKey="8">$150</MenuItem>
				     <MenuItem eventKey="9">$200</MenuItem>
				     <MenuItem eventKey="10">$250</MenuItem>
				     <MenuItem eventKey="11">$300+</MenuItem>
				   </DropdownButton>
				    <DropdownButton bsStyle="primary" className="butt" title='Category'id={`dropdown-basic`}>
				     <MenuItem eventKey="1">Electronics</MenuItem>
				     <MenuItem eventKey="2">Games</MenuItem>
				     <MenuItem eventKey="3">Books</MenuItem>
				     <MenuItem eventKey="4">Outdoors</MenuItem>
				     <MenuItem eventKey="5">Jewelry</MenuItem>
				     <MenuItem eventKey="6">Kindles</MenuItem>
				     <MenuItem eventKey="7">Movies</MenuItem>
				     <MenuItem eventKey="8">Music</MenuItem>
				     <MenuItem eventKey="9">Kids</MenuItem>
				   </DropdownButton>
				</div>
				<canvas className="canvas" width="500px" height="500px" id="canvas"/>
				<input className="btn btn-primary" type="button" value="spin" id='spin' onClick={drawRoulette.spin} />
			</div>
		)
	}

}




export default Home;