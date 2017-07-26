import React, { Component } from 'react';
import { Modal, Button, Form, FormGroup, ControlLabel, FormControl, Col } from 'react-bootstrap';

class LogIn extends Component{

render() {
  return(
<Form horizontal>
    <FormGroup controlId="formHorizontalName" >
        <Col componentClass={ControlLabel} sm={2}>
            Email
        </Col>
        <Col sm={10}>
            <FormControl type="email" name="email" placeholder="Email" />
        </Col>
    </FormGroup>
    <FormGroup controlId="formHorizontalName" >
        <Col componentClass={ControlLabel} sm={2}>
            Password
        </Col>
        <Col sm={10}>
            <FormControl type="Password" name="Password" placeholder="Password" />
        </Col>
    </FormGroup>
</Form>
  );
 }
}

export default LogIn;


