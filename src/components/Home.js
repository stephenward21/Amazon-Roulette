import React, { Component } from 'react';
import $ from 'jquery';
import { DropdownButton, MenuItem, Jumbotron } from 'react-bootstrap';
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
				<Jumbotron>
					<h1 className="home-page-title">AMAZON ROULETTE</h1>
					<p>The second most fun you'll have playing Roulette</p>
				</Jumbotron>
				<div className="buttons">
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