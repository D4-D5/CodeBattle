import React, { Component } from "react";
import firebase from '../firebase';
import { Card, Form, InputGroup } from "react-bootstrap";
import LoginGif from '../assets/login.gif'
//import { browserHistory } from "react-router";




export default class Login extends Component {

    formDefault = {
        userName: { value: "", errorMsg: "", errorState: null },
        password: { value: "", errorMsg: "", errorState: null },
        validated: false
    }

    state = { ...this.formDefault }

    handleSubmit = (e) => {
        e.preventDefault();


        this.setState({
            validated: true
        })

        if (this.isDataValid()) {
        }
        
    }

    handleTextChange = (e) => {  
        this.setState({
            [e.target.id]: { ...this.state[e.target.id], value: e.target.value }
        })
        
    }

    isDataValid() {
        var status = true
        const userName = { ...this.state.userName };
        const password = { ...this.state.password };

        if (userName.value == "") {
            userName.errorMsg = "User name can't be blank"
            userName.errorState = false;
        }else{
            userName.errorState = true;
        }
        if (password.value == "") {
            password.errorMsg = "Password can't be blank"
            password.errorState = false;
        }else{
            password.errorState = true;
        }
        this.setState({
            userName:userName,
            password:password
        })
        
        return userName.errorState||password.errorState
    }

    sendDataToserver() {
        // var label_div = document.getElementById('error-div');
        // if (label_div.hasChildNodes()) {
        //     label_div.removeChild(label_div.childNodes[0]);
        // }

        var targetUrl = 'https://d944618407f7.ngrok.io/api/login'
        var userName = this.state.userName;
        var password = this.state.password;


        // alert(haveCodeforces);
        //if (this.isDataValid()) {
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': "application/json; charset=utf-8",
                    'Access-Control-Allow-Origin': '*'
                },


                body: JSON.stringify({
                    "userName": userName,
                    "password": password,
                })

            };


            fetch(targetUrl, requestOptions).then(async response => {
                const data = await response.json();

                // check for error response
                if (!response.ok) {

                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    document.getElementById('error').textContent = data.reason;
                    console.log(data.reason)
                    return Promise.reject(error);
                } else {
                    localStorage.setItem('loggedIn', true);
                    this.props.history.push("/home");
                }


                // this.setState({ postId: data.id })
            })
                .catch(error => {
                    //this.setState({ errorMessage: error.toString() });
                    console.error('There was an error!', error.toString()
                    );
                });
        //}
    }

    render() {
        const { userName, password, validated } = this.state;
        return (
            <div className=" bg-dark d-flex align-items-center justify-content-center" style={{ height: "92vh", minHeight: "450px" }}>
                <Card style={{ width: "100%", minWidth: "200px", maxWidth: "500px", height: "100%" }}>
                    <Card.Header>SIGN IN</Card.Header>
                    {/* <lottie-player src="https://assets7.lottiefiles.com/packages/lf20_xRmNN8.json"  background="transparent"  speed="1"  style="width: 300px; height: 300px;"  loop controls autoplay></lottie-player> */}
                    <Card.Img variant="top" src={LoginGif} style={{ width: "80%", height: "50%", maxWidth: "350px" }} className="align-self-center" ></Card.Img>
                    <Card.Body>
                        <Form  noValidate validated={false} onSubmit={this.handleSubmit} className="">
                            <Form.Group controlId="validationCustomUsername" className="d-flex flex-column align-items-start">
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

                            <Form.Group controlId="formBasicPassword" className="d-flex flex-column align-items-start">
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
                            <button type="submit" className="btn btn-primary btn-block">Submit</button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}