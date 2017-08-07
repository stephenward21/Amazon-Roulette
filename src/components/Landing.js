import React, {Component} from 'react';
import {Grid,Col,Text,Form,FormGroup,FormControl,Button} from 'react-bootstrap'

class Landing extends Component{
    constructor(props){
        super(props);
        this.state={
            formError: false
        }
    }

    handleLanding(event){
        event.preventDefault();

    }

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
                                <FormGroup>
                                    <Col mdOffset={4} md={7} className="landing-body-button-wrapper">
                                        <Button onClick={this.handleLanding} bsStyle="default" bsSize="small" type="submit" className="landing-body-button">
                                            LET ME SPIN!
                                        </Button>
                                    </Col>
                                </FormGroup>
                            </Form>
                        </Col>
                    </row>
                </Grid>

            </div>
        )
    }
}

export default Landing


