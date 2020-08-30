import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, Modal, Row, Col, Form } from 'react-bootstrap';
import { CREATE_LOBBY, ADD_CONTESTANT } from '../constants';
import { Route, withRouter } from 'react-router-dom';
// import '../css/cards.css'
import Cookie from "js-cookie";
import '../css/joinOrCreatePopup.css';
import PrimaryButton from '../components/primaryButton.js';

//const history = useHistory();
const { v4: uuidv4 } = require('uuid');

class JoinContestPopup extends Component {

    state = {
        roomID: "",
        disabled: true
    }
    handleRoomIDChange = (e) => {
        this.setState({
            roomID: e.target.value
        })
    }
    createContest = () => {
        var roomID = uuidv4();
        var targetUrl = CREATE_LOBBY
        var data = JSON.stringify({
            "roomId": roomID,
            "owner": localStorage.getItem("codeBattleId"),
            "contestType": "PRACTICE_FRIENDS"
        });
        const token =  Cookie.get("token") ? Cookie.get("token") : null;
        const requestOptions = {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': "application/json; charset=utf-8",
                'Authorization': localStorage.getItem("tokenKey")
            },
            body: data,            
        };

        fetch(targetUrl, requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    if (result.status == "success") {
                        let path = "\lobby";
                        roomID = "/" + roomID

                        this.props.history.push({
                            pathname: path + roomID,
                            state: {
                                isOwner: true
                            }
                        });
                    }

                },
                (error) => {
                    console.log(error);
                }
            )

    }
    joinContest = () => {
        let path = "/lobby/"+this.state.roomID;
        this.props.history.push(path);
    }
    render() {

        const { showJoinContest, handleShowJoinContest, handleHideJoinContest, roomID } = this.props

        return (
            // <Modal show={showJoinContest} onHide={handleHideJoinContest} centered>
            //     <Row className="joinContest">
            //         <Col>
            //             <Modal.Header className="justify-content-center border-bottom-0 pb-0">
            //                 <Modal.Title className="text-center">Join/Create Contest
            //                 <p className="text-center">Join or create a new contest to compete.</p>
            //                 </Modal.Title>
            //             </Modal.Header>
            //             <Modal.Body className="pb-0">
            //                 <Form>
            //                     <Form.Group controlId="formRoomId" className="input">
            //                         <Form.Control type="text" placeholder="Enter Room Id here to Join" value={roomID} onChange={(e) => this.handleRoomIDChange(e)} />
            //                     </Form.Group>
            //                     <p className="my-2 justify-content-center">OR
            //                     <Button className="mb-2" variant="primary" onClick={this.createContest} >
            //                             Create a new contest
            //                     </Button></p>
            //                     <Button className="mb-2" variant="primary" onClick={this.joinContest} >
            //                         Join
            //                     </Button>
            //                 </Form>
            //             </Modal.Body>

            //         </Col>
            //     </Row>
            // </Modal>

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
                            <Form.Control type="text" placeholder="Enter Room Id here to Join"
                            value={roomID} onChange={(e) => this.handleRoomIDChange(e)} onKeyPress={()=> this.setState({disabled: false})}/>
                        </Form.Group>
                    </Form>
                    <PrimaryButton buttonContent={"Join"} disabled={this.state.disabled} onClick={this.joinContest}/>
                </div>
                <p className="mb-1 d-flex justify-content-center">OR</p>
                    <PrimaryButton buttonContent={"Create a new contest"} disabled={false} onClick={this.createContest} />

            </Modal.Body>
        </Modal>

        </div>
        );
    }
}

export default withRouter(JoinContestPopup);