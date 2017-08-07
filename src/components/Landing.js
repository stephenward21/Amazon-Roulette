import React, {Component} from 'react';
import {Grid,Col,Text} from 'react-bootstrap'

class Landing extends Component{
    constructor(props){
        super(props);
    }

    render() {
        return(
            <div className="landing-container">
                <Grid className="landing-body">
                    <row className="landing-body-top">
                        <Col md={4} mdOffset={4} className="landing-icon">
                            <img className="landing-icon-img" src="/img/roulette-icon.png"></img>
                        </Col>
                        <Col className="landing-icon-text">
                            Amazon
                            Roulette
                        </Col>
                    </row>
                    <row className="landing-body-middle">
                        <Col md={4} mdOffset={4} className>

                        </Col>
                    </row>
                </Grid>

            </div>
        )
    }
}

export default Landing


