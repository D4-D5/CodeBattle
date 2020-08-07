import React, { Component, isValidElement } from "react";
import firebase from '../firebase.js';
import { Container, Row, Form, Col, InputGroup, Button, Card } from "react-bootstrap";
import { REGISTER_USER } from '../constants';



export default class SignUp extends Component {
    
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


    componentDidMount() {
        localStorage.setItem('loggedIn', 'true');
        // this.setState({
        //     name:{value:"Ho gaya",errorMessage:"error aa gaya",errorState:true}
        // })
        // console.log(this.state.name);
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
        }else{
            name.errorState = true;
        }
        if (userName.value == "") {
            userName.errorMsg = "User name can't be blank"
            userName.errorState = false;
        }else{
            userName.errorState = true;
        }
        if (codeforcesId.value == "" && !haveCodeforces.value) {
            codeforcesId.errorMsg = "CodeforcesId can't be blank"
            codeforcesId.errorState = false;
        }else{
            codeforcesId.errorState = true;
        }
        if (phoneNumber.value.length != 10) {
            phoneNumber.errorMsg = "Incorrect phone number"
            phoneNumber.errorState = false;
        }else{
            phoneNumber.errorState = true;
        }
        if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email.value)) {
            email.errorMsg = "Incorrect Email"
            email.errorState = false;
        }else{
            email.errorState = true;
        }
        if (password.value.length.value < 8) {
            password.errorMsg = "Password must be 8 digits long"
            password.errorState = false;
        }else{
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
                "userRole":"PARTICIPANT"

            })

        };
        fetch(targetUrl, requestOptions)
        .then(res => res.json())
        .then(
            (result) => {
                if(result.status=="success"){
                    localStorage.setItem('loggedIn', true);
                    localStorage.setItem('codeBattleId', userName.value);
                    this.props.history.push("/home");
                }
                console.log(result);
            },
            (error) => {
                console.log(error);
            }
        )
    }
    render() {
        const { name, userName, email, password, codeforcesId, phoneNumber, haveCodeforces, validated } = this.state;
        // const xyz=true;
        //console.log(codeforcesId);
        //console.log(haveCodeforces);
        // console.log("final ",this.state.validated?!name.errorState:null);
        return (
            <div className=" bg-dark d-flex align-items-center justify-content-center" style={{ height: "92vh", minHeight: "450px" }}>
                <Card style={{ width: "100%", minWidth: "200px", maxWidth: "900px" }}>
                    <Card.Header>SIGN UP</Card.Header>
                    <Card.Body>
                        <Form noValidate validated={false} onSubmit={this.handleSubmit} className="">
                            <div className="row">
                                <Form.Group className="col-sm d-flex flex-column align-items-start" >
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
                                <Form.Group controlId="validationCustomUsername" className="col-sm d-flex flex-column align-items-start">
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
                            </div>
                            <div className="row">
                                <Form.Group controlId="formBasicEmail" className="col-sm-6 d-flex flex-column align-items-start">
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

                                <Form.Group controlId="formBasicPassword" className="col-sm-6 d-flex flex-column align-items-start">
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
                            </div>
                            <div className="row">
                                <Form.Group controlId="validationCustom01" className="col-sm d-flex flex-column align-items-start">
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
                                <Form.Group controlId="validationCustomUsername" className="col-sm d-flex flex-column align-items-start">
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
                            </div>
                            <Form.Row className="ml-1">
                                <Form.Group>
                                    <Form.Check 
                                    onChange={this.handleCheckChange}
                                    type="checkbox" 
                                    label="Do not have a codeforces account? " 
                                    id="haveCodeforces"
                                    
                                    />
                                </Form.Group>
                            </Form.Row>
                            {/* <div className="justify-content-center bg-info"> */}
                            <Button type="submit">Submit form</Button>
                            {/* </div> */}
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        );
        // return (
        //     <div className="auth-wrapper auth-inner " style={{ width: "50%" }} >
        //         <form onSubmit={this.handleSubmit} className="center">
        //             <h3>Sign Up</h3>
        //             <div className="row justify-content-md-center">
        //                 <div className="mr-2 form-group col-m-6">
        //                     <label>CodeWar Id</label>
        //                     <input type="text" id="userName" className="form-control" placeholder="Enter an unique userId here" onChange={this.handleTextChange} />
        //                 </div>

        //                 <div className="form-group col-m-6">
        //                     <label>Full Name</label>
        //                     <input type="text" id="name" className="form-control" placeholder="Enter your name here" onChange={this.handleTextChange} />
        //                 </div>
        //             </div>

        //             <div className="row justify-content-md-center">

        //                 <div className="form-group mr-2 col-m-6">
        //                     <label>Codeforces Id</label>
        //                     <input type="text" id="codeforcesId" className="form-control" placeholder="Enter your codeforces id here" onChange={this.handleTextChange} />
        //                 </div>
        //                 <div className="form-group mr-2 col-m-6">
        //                     <label>Phone Number</label>
        //                     <input type="text" className="form-control" id="phoneNumber" placeholder="Enter phone number (10 digits)" onChange={this.handleTextChange} />
        //                 </div>
        //             </div>


        //             <div className="form-group">
        //                 <label>Do not have a codeforces account? </label>
        //                 <input id="haveCodeforces" name="haveCodeforcesAccount" type="checkbox" onChange={this.handleCheckChange} />
        //             </div>



        //             <div className="row justify-content-md-center">
        //                 <div className="mr-2 form-group col-m-6">
        //                     <label>Email address</label>
        //                     <input type="email" id="email" className="form-control" placeholder="Enter your email here" onChange={this.handleTextChange} />
        //                 </div>

        //                 <div className="form-group col-m-6">
        //                     <label>Password</label>
        //                     <input type="password" id="password" className="form-control" placeholder="Enter your password here" onChange={this.handleTextChange} />
        //                 </div>
        //             </div>
        //             <div className="form-group" id="recaptcha"></div>

        //             <div>
        //                 <label id="error" ></label>
        //             </div>

        //             <button id="sign-button" className="btn btn-primary btn-block">Sign Up</button>
        //         </form>
        //         <p className="forgot-password text-right">
        //             Already registered <a href="#">sign in?</a>
        //         </p>
        //         {/* <label id="testing"></label> */}
        //     </div>
        // );
    }
}
