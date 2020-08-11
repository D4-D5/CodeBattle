import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import image from '../assets/images/abc.svg';
import firebase from '../firebase.js';
import '../css/modal.css'
import { REGISTER_USER } from '../constants';
import { Form, FormControl, Button, Modal, Row, Col, InputGroup } from 'react-bootstrap';
import { Route , withRouter} from 'react-router-dom';

class SignUp extends Component {
    formDefault = {
        name: { value: "", errorMsg: "", errorState: null },
        userName: { value: "", errorMsg: "", errorState: null },
        email: { value: "", errorMsg: "", errorState: null },
        password: { value: "", errorMsg: "", errorState: null },
        phoneNumber: { value: "", errorMsg: "", errorState: null },
        codeforcesId: { value: "", errorMsg: "", errorState: null },
        haveCodeforces: { value: false, errorMsg: "", errorState: null },
        validated: false
    }

    state = { ...this.formDefault }

    handleSubmit = (e) => {
        const form = e.currentTarget;

        e.preventDefault();

        this.setState({
            validated: true
        })
        if (this.isDataValid()) {
            this.sendDataToserver();
        }

    }

    handleTextChange = (e) => {
        this.setState({
            [e.target.id]: { ...this.state[e.target.id], value: e.target.value }
        })

    }

    handleCheckChange = (e) => {
        this.setState({
            [e.target.id]: { ...this.state[e.target.id], value: e.target.checked }
        })
    }

    isDataValid = () => {
        const name = { ...this.state.name };
        const userName = { ...this.state.userName };
        const codeforcesId = { ...this.state.codeforcesId };
        const phoneNumber = { ...this.state.phoneNumber };
        const email = { ...this.state.email };
        const password = { ...this.state.password };
        const haveCodeforces = { ...this.state.haveCodeforces };

        var status = true
        //var error = "Unknown Error"
        if (name.value == "") {
            name.errorMsg = "Name can't be blank"
            name.errorState = false;
        } else {
            name.errorState = true;
        }
        if (userName.value == "") {
            userName.errorMsg = "User name can't be blank"
            userName.errorState = false;
        } else {
            userName.errorState = true;
        }
        if (codeforcesId.value == "" && !haveCodeforces.value) {
            codeforcesId.errorMsg = "CodeforcesId can't be blank"
            codeforcesId.errorState = false;
        } else {
            codeforcesId.errorState = true;
        }
        if (phoneNumber.value.length != 10) {
            phoneNumber.errorMsg = "Incorrect phone number"
            phoneNumber.errorState = false;
        } else {
            phoneNumber.errorState = true;
        }
        if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email.value)) {
            email.errorMsg = "Incorrect Email"
            email.errorState = false;
        } else {
            email.errorState = true;
        }
        if (password.value.length < 8) {
            password.errorMsg = "Password must be 8 digits long"
            password.errorState = false;
        } else {
            password.errorState = true;
        }
        this.setState({
            name: name,
            userName: userName,
            codeforcesId: codeforcesId,
            phoneNumber: phoneNumber,
            email: email,
            haveCodeforces: haveCodeforces,
            password: password
        })
        // if (!status) {
        //     document.getElementById('error').textContent = error
        // }
        return name.errorState || userName.errorState || codeforcesId.errorState || phoneNumber.errorState || email.errorState || haveCodeforces.errorState || password.errorState

    }
    phoneSignin = () => {
        let recaptcha = new firebase.auth.RecaptchaVerifier('recaptcha');
        let number = document.getElementById('phone-number').value;
        number = "+91" + number;
        firebase.auth().signInWithPhoneNumber(number, recaptcha)
            .then(function (e) {
                let code = prompt('Enter the OTP :' + number);
                e.confirm(code).then(function (res) {
                    // console.log(res.user, 'user');
                    // document.getElementById('testing').textContent = res.user.phoneNumber;


                }).catch((err) => {
                    // console.log(err);
                })
            })
    }


    sendDataToserver() {
        //document.getElementById('error').textContent = "";
        var targetUrl = REGISTER_USER
        const { name, userName, email, password, phoneNumber, codeforcesId, haveCodeforces } = this.state;

        //console.log(name)
        if (this.isDataValid()) {
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': "application/json; charset=utf-8",
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': localStorage.getItem("tokenKey")
                },


                body: JSON.stringify({
                    "name": name.value,
                    "codeBattleId": userName.value,
                    "email": email.value,
                    "password": password.value,
                    "countryCode": '+91',
                    "phoneNumber": phoneNumber.value,
                    "codeforcesId": codeforcesId.value,
                    "userRole": "PARTICIPANT"

                })

            };
            fetch(targetUrl, requestOptions)    
                .then(res => res.json())
                .then(
                    (result) => {
                        if (result.status == "success") {
                            localStorage.setItem('loggedIn', true);
                            localStorage.setItem('codeBattleId', userName.value);
                            // this.props.history.push("/home");
                            this.props.handleCloseSignup();
                        }
                        console.log(result);
                    },
                    (error) => {
                        console.log(error);
                    }
                )
        }
    }
    hideAndShowLogin = () => {
        const { showSignup, handleCloseSignup, handleShowLogin } = this.props
        handleCloseSignup();
        handleShowLogin();
    }

    render() {
        const { name, userName, email, password, codeforcesId, phoneNumber, haveCodeforces, validated } = this.state;
        const { showSignup, handleCloseSignup, handleShowLogin } = this.props
        console.log('Sign up page=>', showSignup);
        return (
            <Modal show={showSignup} onHide={handleCloseSignup} centered>
                <Row>
                    <Col sm={6} className="d-flex align-items-center border-right modal_image">
                        <img src={image} className="img-fluid" alt=""></img>
                    </Col>
                    <Col sm={6}>
                        <Modal.Header className="justify-content-center border-bottom-0 text-center pb-0" closeButton>
                            <Modal.Title >Sign Up
                            <p className="text-center">Join the best coding community</p>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="pb-0">
                            <Form noValidate validated={false} onSubmit={this.handleSubmit} >

                                <Form.Group >
                                    <Form.Label className="mr=auto">Full name</Form.Label>
                                    <Form.Control
                                        onChange={this.handleTextChange}
                                        isValid={validated ? name.errorState : null}
                                        isInvalid={validated ? !name.errorState : null}
                                        id="name"
                                        type="text"
                                        placeholder="Full name" />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    <Form.Control.Feedback type="invalid">
                                        {name.errorMsg}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email"
                                        id="email"
                                        onChange={this.handleTextChange}
                                        isValid={validated ? email.errorState : null}
                                        isInvalid={validated ? !email.errorState : null}
                                    />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    <Form.Control.Feedback type="invalid">
                                        {email.errorMsg}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId="validationCustom01">
                                    <Form.Label>Codeforces Id</Form.Label>
                                    <Form.Control
                                        id="codeforcesId"
                                        onChange={this.handleTextChange}
                                        isValid={validated ? codeforcesId.errorState : null}
                                        isInvalid={validated ? !codeforcesId.errorState : null}
                                        type="text"
                                        placeholder="CodeForce Id"
                                    />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    <Form.Control.Feedback type="invalid">
                                        {codeforcesId.errorMsg}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Check
                                        onChange={this.handleCheckChange}
                                        type="checkbox"
                                        label="Do not have a codeforces account? "
                                        id="haveCodeforces"

                                    />
                                </Form.Group>
                            </Form>

                            <Form>
                                <Form.Group controlId="validationCustomUsername">
                                    <Form.Label className="">Username</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control

                                            onChange={this.handleTextChange}
                                            isValid={validated ? userName.errorState : null}
                                            isInvalid={validated ? !userName.errorState : null}
                                            id="userName"
                                            type="text"
                                            placeholder="Username"
                                            aria-describedby="inputGroupPrepend"
                                        />

                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        <Form.Control.Feedback type="invalid">
                                            {userName.errorMsg}
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>


                                <Form.Group controlId="formBasicPassword" >
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password"
                                        id="password"
                                        onChange={this.handleTextChange}
                                        isValid={validated ? password.errorState : null}
                                        isInvalid={validated ? !password.errorState : null} />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    <Form.Control.Feedback type="invalid">
                                        {password.errorMsg}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId="validationCustomUsername">
                                    <Form.Label>Phone Number</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text id="inputGroupPrepend">+91</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control
                                            id="phoneNumber"
                                            type="text"
                                            placeholder="Phone Number"
                                            aria-describedby="inputGroupPrepend"
                                            onChange={this.handleTextChange}
                                            isValid={validated ? phoneNumber.errorState : null}
                                            isInvalid={validated ? !phoneNumber.errorState : null}
                                        // minLength={10}
                                        // maxLength={10}
                                        // pattern="^\d{10}$"
                                        />

                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        <Form.Control.Feedback type="invalid">
                                            {phoneNumber.errorMsg}
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <div className="justify-content-center text-center">
                            <Button variant="primary" type="submit" onClick={this.handleSubmit}>
                                Sign Up
                            </Button>
                            <p className="my-2 justify-content-end">Already have an account?
                            <Button className="mb-2 ml-2" variant="primary" type="submit" onClick={this.hideAndShowLogin}>
                                    Login
                            </Button>
                            </p>
                        </div>
                    </Col>
                </Row>
            </Modal>
        );
    }
}

export default withRouter(SignUp);