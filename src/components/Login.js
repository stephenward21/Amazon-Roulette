import React, { Component } from 'react';
import { Modal, Button, Form, FormGroup, ControlLabel, FormControl, Col } from 'react-bootstrap';
import NavBar from './Navbar';
// import './GenericModal.scss';

class LogIn extends Component {
  constructor(props) {
  super(props);

  this.state = {
    showModal: false
  };

  this.open = this.open.bind(this);
  this.close = this.close.bind(this);
}


open() {
  this.setState({showModal: true});
}

close() {
  this.setState({showModal: false});
}

render() {
  return(
    <div>
        <Modal.Body>
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
        </Modal.Body>













      {/*<div>I am a Bootstrap Modal</div>*/}
      {/*<Button onClick={this.open}>Show Modal</Button>*/}
      {/*<div>*/}
        {/*<Modal className="modal-container"*/}
          {/*show={this.state.showModal}*/}
          {/*onHide={this.close}*/}
          {/*animation={true}*/}
          {/*bsSize="small">*/}

          {/*<Modal.Header closeButton>*/}
            {/*<Modal.Title>Modal title</Modal.Title>*/}
          {/*</Modal.Header>*/}

          {/*<Modal.Body>*/}
            {/*One of fine body.........*/}
          {/*</Modal.Body>*/}

          {/*<Modal.Footer>*/}
            {/*<Button onClick={this.close}>Close</Button>*/}
            {/*<Button bsStyle="primary">Save changes</Button>*/}
          {/*</Modal.Footer>*/}
        {/*</Modal>*/}
      {/*</div>*/}
    </div>
  );
 }
}

export default LogIn;











// import React, { Component } from 'react';
// import {Modal, Form, FormGroup, ControlLabel, FormControl, Button, Col} from 'react-bootstrap';
//
//
// class Login extends Component{
//     constructor(props){
//         super(props);
//     }
//     render(){
//         return(
//             <div>
//                 <Modal show={this.state.showModal} onHide={this.close}>
//                     <Modal.Header closeButton>
//                         <Modal.Title> LOG IN</Modal.Title>
//                     </Modal.Header>
//                     <Modal.Body>
                        {/*<Form horizontal>*/}
                            {/*<FormGroup controlId="formHorizontalName" >*/}
					            {/*<Col componentClass={ControlLabel} sm={2}>*/}
						            {/*Email*/}
					            {/*</Col>*/}
                                {/*<Col sm={10}>*/}
                                    {/*<FormControl type="email" name="email" placeholder="Email" />*/}
                                {/*</Col>*/}
                            {/*</FormGroup>*/}
                            {/*<FormGroup controlId="formHorizontalName" >*/}
                                {/*<Col componentClass={ControlLabel} sm={2}>*/}
                                    {/*Password*/}
                                {/*</Col>*/}
                                {/*<Col sm={10}>*/}
                                    {/*<FormControl type="Password" name="Password" placeholder="Password" />*/}
                                {/*</Col>*/}
				            {/*</FormGroup>*/}
                        {/*</Form>*/}
//                     </Modal.Body>
//                     <Modal.Footer>
//                         <Button onClick={this.close}>Log In</Button>
//                     </Modal.Footer>
//                 </Modal>
//             </div>
//         )
//     }
// }
//
// export default Login



