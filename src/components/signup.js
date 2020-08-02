import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import image from '../assets/images/abc.svg';
import '../css/modal.css'
import {Form, FormControl, Button, Modal, Row, Col} from 'react-bootstrap';

function SignUp({showSignup, handleCloseSignup, handleShowLogin}) {

    const hideAndShowLogin = () => {
        handleCloseSignup();
        handleShowLogin();
    }
    console.log('Sign up page=>', showSignup);
    return (      
    <Modal show={showSignup} onHide={handleCloseSignup} centered>
        <Row>
            <Col sm={6} className="d-flex align-items-center border-right modal_image">
            <img src={image} className="img-fluid" alt=""></img>
            </Col>
            <Col sm={6}>
            <Modal.Header className="justify-content-center border-bottom-0 text-center pb-0">
                <Modal.Title >Sign Up
                <p className="text-center">Join the best coding community</p>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="pb-0">
                <Form>
                <Form.Group controlId="formName">
                    <Form.Control type="text" placeholder="Full Name" />
                </Form.Group>

                <Form.Group controlId="formEmail">
                    <Form.Control type="email" placeholder="email@example.com" />
                </Form.Group>

                <Form.Group controlId="formId" className="mb-0">
                    <Form.Control type="text" placeholder="Codeforces ID"/>
                </Form.Group>

                <Form.Group controlId="formCheckbox">
                    <Form.Check type="checkbox" className="text-muted" label="Do not have a codeforces account" />
                </Form.Group>
                </Form>

                <Form>
                <Form.Group controlId="formUsername">
                    <FormControl type="text" placeholder="Username" />
                </Form.Group>

                <Form.Group controlId="formPassword">
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>

                <Form.Group controlId="formNumber">
                    <Form.Control type="phoneNumber" placeholder="Phone Number" />
                </Form.Group>
                </Form>
            </Modal.Body>
            <div className="justify-content-center text-center">
                <Button variant="primary" type="submit" onClick={handleCloseSignup}>
                Sign Up
                </Button>
                <p className="my-2 justify-content-end">Already have an account?                       
                <Button className="mb-2" variant="primary" type="submit" onClick={hideAndShowLogin}>
                    Login
                </Button>
                </p>
            </div>
            </Col>
        </Row>
    </Modal>
  );
}
  
export default SignUp;