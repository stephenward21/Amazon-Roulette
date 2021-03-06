import React, {Component} from 'react';
import {Grid,Col,Text,Form,FormGroup,FormControl,Button} from 'react-bootstrap'
import {Link} from 'react-router-dom';

class Landing extends Component{
    constructor(props){
        super(props);
        this.state={
            formError: false
        };
        // this.handleLanding = this.handleLanding.bind(this);
    }

    // handleLanding(event){
    //     console.log(event);
    //     event.preventDefault();
    //     var name = event.target[0].value;
    //     var error = false;
    //
    //     //name
		// if(name.length < 3){
		//     console.log(error)
		// 	error=true;
		// }else{
    //         this.props.history.push('/home');
		// }
    //

    // }

    render() {
        return(
            <div className="landing-container">
                <Grid className="landing-body">
                    <row className="landing-body-top">
                        <Col md={8} mdOffset={2} className="landing-icon-text">
                            Amazon Roulette
                        </Col>
                    </row>
                    <row className="landing-body-middle">
                        <Col md={8} mdOffset={2} className="landing-body-middle-container">
                            <p className="landing-body-middle-text">
                                Enter your name to take a spin.
                            </p>
                            <Form horizontal className="landing-form" >
                                <FormGroup className="landing-input"controlId="formHorizontalName">
                                    <Col md={8} mdOffset={3}>
                                        <FormControl className="empty-form" type="text" name="fullName" />
                                    </Col>
                                </FormGroup>
                            </Form>
                            <Col mdOffset={4} md={7} className="landing-body-button-container">
                                <Link to="/home">
                                    <Button bsStyle="default" bsSize="small" type="submit" className="landing-body-button">
                                    LET ME SPIN!
                                    </Button>
                                </Link>
                            </Col>
                        </Col>
                    </row>
                </Grid>

            </div>
        )
    }
}

export default Landing


