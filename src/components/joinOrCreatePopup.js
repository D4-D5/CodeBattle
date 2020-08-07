import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, Modal, Row, Col, Form } from 'react-bootstrap';
import { CREATE_LOBBY } from '../constants';
import { Route , withRouter} from 'react-router-dom';
// import '../css/cards.css'

//const history = useHistory();
const { v4: uuidv4 } = require('uuid');

class JoinContestPopup extends Component {

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
            <Modal show={showJoinContest} onHide={handleHideJoinContest} centered>
                <Row className="joinContest">
                    <Col>
                        <Modal.Header className="justify-content-center border-bottom-0 pb-0">
                            <Modal.Title className="text-center">Join/Create Contest
                            <p className="text-center">Join or create a new contest to compete.</p>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="pb-0">
                            <Form>
                                <Form.Group controlId="formRoomId" className="input">
                                    <Form.Control type="text" placeholder="Enter Room Id here to Join" />
                                </Form.Group>
                                <p className="my-2 justify-content-center">OR
                                <Button className="mb-2" variant="primary" onClick={this.createContest} >
                                        Create a new contest
                                </Button></p>
                            </Form>
                        </Modal.Body>

                    </Col>
                </Row>
            </Modal>
        );
    }
}

export default withRouter(JoinContestPopup);