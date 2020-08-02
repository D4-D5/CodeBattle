import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import image from '../assets/images/abc.svg';
import { Form, Button, Modal, Row, Col } from 'react-bootstrap';
import '../css/modal.css'

class Login extends Component {
 
  hideAndShowSignup = () => {
    this.props.handleCloseLogin();
    this.props.handleShowSignup();
  }
  render() {
    const {handleCloseLogin,handleShowSignup,showLogin} = this.props
   
    return (
      <Modal show={showLogin} onHide={handleCloseLogin} centered>
        <Row className="login">
          <Col sm={6} className="border-right modal-right d-flex align-items-center modal_image">
            <img src={image} className="img-fluid login_img" alt=""></img>
          </Col>
          <Col sm={6}>
            <Modal.Header className="justify-content-center border-bottom-0 pb-0">
              <Modal.Title className="text-center">Login
                <p className="text-center">Join the best coding community</p>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="pb-0">
              <Form>
                <Form.Group controlId="formEmail" className="input">
                  <Form.Control type="email" placeholder="email@example.com" />
                </Form.Group>

                <Form.Group controlId="formPassword" className="input">
                  <Form.Control type="password" placeholder="Password" />
                  <Form.Text className="text-muted d-flex justify-content-end">
                    Forgot Password
                  </Form.Text>
                </Form.Group>
              </Form>
            </Modal.Body>
            <div className="justify-content-center text-center mb-2">
              <Button variant="primary" onClick={handleCloseLogin} type="submit">
                Login
              </Button>
              <p className="my-2 justify-content-end">Don't have an account?
              <Button className="mb-2" variant="primary" type="submit" onClick={this.hideAndShowSignup}>
                  Sign Up
              </Button></p>
            </div>
          </Col>
        </Row>
      </Modal>
    );
  }
}

export default Login;