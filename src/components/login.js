import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import image from '../assets/images/abc.svg';
import { Form, Button, Modal, Row, Col, InputGroup } from 'react-bootstrap';
import '../css/modal.css'
import { LOGIN_USER } from "../constants";
import { Route, withRouter } from 'react-router-dom';
import Cookie from "js-cookie"
import axios from 'axios';

class Login extends Component {

  formDefault = {
    userName: { value: "", errorMsg: "", errorState: null },
    password: { value: "", errorMsg: "", errorState: null },
    validated: false
  }

  state = { ...this.formDefault }

  hideAndShowSignup = () => {
    this.props.handleCloseLogin();
    this.props.handleShowSignup();
  }



  handleSubmit = (e) => {
    e.preventDefault();

    this.setState({
      validated: true
    })

    if (this.isDataValid()) {
      this.sendDataToserver()
    }

  }

  isDataValid() {

    const userName = { ...this.state.userName };
    const password = { ...this.state.password };

    if (userName.value == "") {
      userName.errorMsg = "User name can't be blank"
      userName.errorState = false;
    } else {
      userName.errorState = true;
    }
    if (password.value == "") {
      password.errorMsg = "Password can't be blank"
      password.errorState = false;
    } else {
      password.errorState = true;
    }
    this.setState({
      userName: userName,
      password: password
    })

    return userName.errorState || password.errorState
  }

  sendDataToserver() {
    // var label_div = document.getElementById('error-div');
    // if (label_div.hasChildNodes()) {
    //     label_div.removeChild(label_div.childNodes[0]);
    // }

    var targetUrl = LOGIN_USER
    var userName = this.state.userName;
    var password = this.state.password;


    // alert(haveCodeforces);
    //if (this.isDataValid()) {
    const requestOptions = {
      headers: {
        'Content-Type': "application/json; charset=utf-8",
        'Access-Control-Allow-Origin': '*',
        'Authorization': localStorage.getItem("tokenKey")
      },

      body: JSON.stringify({
        "codeBattleId": userName.value,
        "password": password.value,
      })

    };
    // axios.post(targetUrl, {
    //   "codeBattleId": userName.value,
    //   "password": password.value,
    // }, { withCredentials: true },{headers:{
    //   'Content-Type': "application/json; charset=utf-8",
    //   'Access-Control-Allow-Origin': 'https://bc9f49b6ccbc.ngrok.io'
    // }})
    //   .then(
    //     (result) => {
    //       if (result.status == "success") {
    //         //localStorage.setItem('loggedIn', true);
    //         localStorage.setItem('codeBattleId', userName.value);
    //         //Cookie.set("token", result.message.tokenType + " " + result.message.accessToken);
    //         localStorage.setItem('tokenKey', result.message.tokenType + " " + result.message.accessToken);
    //         //this.props.history.push("/home");
    //         this.props.handleCloseLogin();
    //       }
    //       //this.props.history.push("/home");
    //       console.log(result);
    //     },
    //     (error) => {
    //       console.log(error);
    //     }
    //   )
    fetch(targetUrl, requestOptions)
      .then(
        (result) => {
          if (result.status == "success") {
            //localStorage.setItem('loggedIn', true);
            localStorage.setItem('codeBattleId', userName.value);
            //Cookie.set("token", result.message.tokenType + " " + result.message.accessToken);
            localStorage.setItem('tokenKey', result.message.tokenType + " " + result.message.accessToken);
            //this.props.history.push("/home");
            this.props.handleCloseLogin();
          }
          //this.props.history.push("/home");
          console.log(result);
        },
        (error) => {
          console.log(error);
        }
      )



  }
  handleTextChange = (e) => {
    this.setState({
      [e.target.id]: { ...this.state[e.target.id], value: e.target.value }
    })

  }


  render() {
    const { userName, password, validated } = this.state;
    const { handleCloseLogin, handleShowSignup, showLogin } = this.props

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

              <Form noValidate validated={false}>
                <Form.Group controlId="validationCustomUsername" className="input">
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

                <Form.Group controlId="formBasicPassword" className="input">
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
              </Form>


            </Modal.Body>
            <div className="justify-content-center text-center mb-2">
              <Button variant="primary" type="submit" onClick={this.handleSubmit}>
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

export default withRouter(Login);