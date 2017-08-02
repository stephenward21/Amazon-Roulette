import React, {Component} from 'react'
import { Form, FormGroup, ControlLabel, FormControl, Button, Col ,MenuItem, Jumbotron} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class Groups extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="jumbotron-group">
                <Jumbotron>
                    <h1>CREATE A GROUP, BRING THE PARTY</h1>
                    <p>From office parties and White Elephant budgets to bachelor/bachelorette gifts
                        and baby showers, AmazonRoulette raises the group to another level!!</p>
                    <p>Create a Group </p>
                    <p>Invite friends, family, co-workers</p>
                    <p>Leave the gifts to the Wheel!</p>
                    <p><Button bsStyle="primary">GET STARTED</Button></p>
                </Jumbotron>
            </div>
        )
    }
}

export default Groups;
