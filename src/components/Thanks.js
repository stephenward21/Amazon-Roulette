import React from 'react';
import { Button } from 'react-bootstrap';

function Thanks()  {	
	return(
		<div className="landing-container">
			<h1 className = "landing-body-middle-text"> Thanks for taking a Spin!</h1>
			<h2 className = "landing-body-middle-text"> You should expect your package in the next 48/72 hours!</h2>
			<Button bsStyle="default" bsSize="small" type="submit" className="return-home" href="/home">
                                    Return Home
            </Button>
		</div>

	)
	
}

export default Thanks;

