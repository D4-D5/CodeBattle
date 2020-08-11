import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, Modal, Row, Col, Form } from 'react-bootstrap';
import { CREATE_LOBBY } from '../constants';
import { Route , withRouter} from 'react-router-dom';
import '../css/joinOrCreatePopup.css';
import PrimaryButton from '../components/primaryButton.js';

//const history = useHistory();
const { v4: uuidv4 } = require('uuid');

class JoinContestPopup extends Component {
    state={
        disabled: true
    }


    createContest = () => {
        var roomID = uuidv4();
        var targetUrl = CREATE_LOBBY
        var data = JSON.stringify({
            "roomId": roomID,
            "owner": localStorage.getItem("codeBattleId"),
            "contestType": "PRACTICE_FRIENDS"
        });
        const requestOptions = {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': "application/json; charset=utf-8",
                'Authorization': localStorage.getItem("tokenKey")
            },
            body: data
        };

        fetch(targetUrl, requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    if (result.status == "success") {
                        let path = "\lobby";
                        roomID = "/" + roomID
                        this.props.history.push(path + roomID);
                    }

                },
                (error) => {
                    console.log(error);
                }
            )

   }
    render() {

        const { showJoinContest, handleShowJoinContest, handleHideJoinContest } = this.props

        return (
            <div>
                <Modal show={showJoinContest} onHide={handleHideJoinContest} centered className="joinOrCreatePopup">
                    <Modal.Header className="justify-content-center border-bottom-0 pb-0" closeButton>
                        <Modal.Title className="text-center">Join/Create Contest
                        <p className="text-center">Join or create a new contest to compete.</p>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="pb-0">
                        <div className="row justify-content-center">                            
                            <Form className="col-9">
                                <Form.Group controlId="formRoomId" className="input">
                                    <Form.Control type="text" placeholder="Enter Room Id here to Join" onKeyPress={()=> this.setState({disabled: false})}/>
                                </Form.Group>
                            </Form>
                            <PrimaryButton buttonContent={"Join"} disabled={this.state.disabled}/>
                        </div>
                        <p className="mb-1 d-flex justify-content-center">OR</p>
                        <PrimaryButton buttonContent={"Create a new contest"} disabled={false} onClick={this.createContest}/>
                    </Modal.Body>
                </Modal>
                
            </div>
        );
    }
}

export default withRouter(JoinContestPopup);