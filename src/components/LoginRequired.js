import React, {Component} from 'react';
import {Grid,Col,Text,Form,FormGroup,FormControl,Button} from 'react-bootstrap'

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
                                You must login to spin! Please click the link above.
                            </p>


                        </Col>
                    </row>
                </Grid>

            </div>
        )
    }
}

export default Landing


