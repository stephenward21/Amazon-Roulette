import React, {Component} from 'react'
import GroupAction from '../actions/GroupAction'
import { Form, FormGroup, ControlLabel, FormControl, Button, Col ,MenuItem, Jumbotron} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class Groups extends Component{
    constructor(props){
        super(props);
        this.state={
            registerMessage: "",
            groupNameError: null,
            formError: false
        };
        this.handleGroup = this.handleGroup.bind(this);
    }

    handleGroup(event){
        event.preventDefault();
        console.log('user submitted');
        var groupName = event.target[0].value;
        var groupPassword = event.target[0].value;
        var error = false;

        if(groupName.length < 3){
			var groupNameError = 'error';
			error=true;
		}else{
			var groupNameError = 'success'
		}

		if(error){
            this.setState({
                formError: true,
                groupNameError: groupNameError
            })
        }else{
		    console.log(this.props.groupAction);
		    console.log(this.props.registerResponse);
		    this.props.groupAction({
		        groupName: groupName,
                groupPassword: groupPassword,
                token: this.props.registerResponse.token
            });
        }
    }

    componentWillReceiveProps(nextProps){
        console.log(nextProps.registerResponse)
        if(nextProps.registerResponse.groupInfo.msg === "groupJoined"){
            this.props.history.push('/home');
        }else if(nextProps.registerResponse.msg === "groupNameIsTaken"){
            this.setState({
                registerMessage: 'That name is already in use, please try again'
            })
        }
    }

    render(){
        return(
            <div id="jumbotron-group-container">
                <Jumbotron className="jumbotron-group-text">
                    <h1>CREATE A GROUP, BRING THE PARTY</h1>
                    <p>From office parties and White Elephant budgets to bachelor/bachelorette gifts
                        and baby showers, AmazonRoulette raises the group to another level!!</p>
                    <p>Create a Group </p>
                    <p>Invite friends, family, co-workers</p>
                    <p>Leave the gifts to the Wheel!</p>
                    <p><Button bsStyle="primary">GET STARTED</Button></p>
                </Jumbotron>
                <div className='group-register-wrapper'>
                    <h1 className="text-danger"></h1>
                    <Form horizontal className="group-form-whole" onSubmit={this.handleGroup}>
                        <FormGroup  controlId="formHorizontalName" validationState={this.state.groupNameError}>
                            <Col  md={2} componentClass={ControlLabel} >
                                 Group Name
                            </Col>
                            <Col  md={6}>
                                <FormControl className="empty-form" type="text" name="groupName" placeholder="Group Name" />
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="formHorizontalName">
                            <Col  md={2} componentClass={ControlLabel}>
                                Password
                            </Col>
                            <Col md={6}>
                                <FormControl className="empty-form" type="password" name="password" placeholder="Password" />
                            </Col>
                        </FormGroup>

                        <FormGroup>
                            <Col mdOffset={4} md={4}>
                                <Button className="group-register-button" bsStyle="primary" bsSize="small" type="submit">
                                    SIGN UP!
                                </Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        registerResponse: state.registerReducer
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        groupAction: GroupAction
    },dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Groups);
