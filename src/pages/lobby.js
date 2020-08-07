import React, { Component } from "react";
import Button from 'react-bootstrap/Button'
import Card from "react-bootstrap/Card";
import { Row, ListGroup, Text, Toast, Col } from "react-bootstrap";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Container from "react-bootstrap/Container";
import { INVITE_MSG, ADD_CONTESTANT, GET_CONTESTANTS, SOCK_JS } from '../constants';
import SockJS from "sockjs-client"
import SockJsClient from 'react-stomp';
import { TalkBox } from "react-talk";

const stompClient = null
class Lobby extends Component {
    state = {
        roomId: '',
        copySuccess: false,
        contestants: []
    }

    handleSubmit = () => {
        this.props.history.push("/editor");
    }

    componentWillMount() {
        localStorage.getItem('loggedIn') == 'false' && this.props.history.push('/login');
    }




    getContestants(roomId) {
        var targetUrl = GET_CONTESTANTS
        var data = new FormData()
        data.append("roomId", roomId)
        const requestOptions = {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': localStorage.getItem("tokenKey")
            },
            body: data
        };

        fetch(targetUrl, requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    this.setState({
                        contestants: result.message
                    })
                },
                (error) => {
                    console.log(error);
                }
            )
    }

    addContestant(roomId) {
        //alert(roomId)
        var targetUrl = ADD_CONTESTANT
        var data = JSON.stringify({
            "roomId": roomId,
            "codeBattleId": localStorage.getItem("codeBattleId")
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
                        this.getContestants(roomId)
                    } else {
                        let path = "/home";
                        this.props.history.push(path);
                    }

                },
                (error) => {
                    console.log(error);
                }
            )

    }

    componentDidMount() {
        let roomId = this.props.match.params.room_id;
        this.setState({
            roomId: roomId
        });
        this.addContestant(roomId)
    }
    
    render() {
        const wsSourceUrl = window.location.protocol + "//" + window.location.host + "/ws";
        console.log("wsSourceUrl", wsSourceUrl)
        const msg = INVITE_MSG + this.state.roomId;
        const roomID = this.state.roomId;
        const contestants = this.state.contestants;
        console.log(contestants)
        return (
            <div className="row bg-light d-flex align-items-center justify-content-around" style={{ height: "92vh" }}>
     
                <SockJsClient url={SOCK_JS} topics={['/topic/'+roomID]}
                    onMessage={(msg) => { 
                        var list = [...contestants,{"codeBattleId":msg}]
                        this.setState({
                            contestants:list
                        })
                        console.log("SockJS" + msg); 
                    }}
                    ref={(client) => { this.clientRef = client }}
                    onConnect={(e) => {
                        console.log("Connected");
                    }}
                />
                <Card style={{ width: "50%", minHeight: "300px", }}>
                    <Card.Header><strong>Participants</strong></Card.Header>
                    <Card.Body>
                        <ListGroup style={{ overflow: "scroll", height: "600px", maxHeight: "600px" }}>
                            {contestants &&
                                contestants.map((contestant, index) => {
                                    return (
                                        <ListGroup.Item>
                                            {contestant.codeBattleId}
                                        </ListGroup.Item>
                                    );
                                })}
                        </ListGroup>

                    </Card.Body>
                </Card>
                <Card>
                    <Card.Body>
                        <div className="row mx-2">
                            <textarea className="col" id="copyContent" disabled defaultValue={this.state.roomId}></textarea>
                            <CopyToClipboard text={msg}>
                                <Button className="" variant="secondary" onClick={() => this.setState({ copySuccess: true })}>Copy</Button>
                            </CopyToClipboard>
                        </div>
                    </Card.Body>
                    <Button onClick={this.handleSubmit}>Lets Begin!</Button>
                </Card>
                <Toast onClose={() => this.setState({ copySuccess: false })} show={this.state.copySuccess} delay={3000} autohide style={{ position: "absolute", bottom: "0" }}>
                    <Toast.Header>
                        <strong className="mr-auto">CodeBattle</strong>
                    </Toast.Header>
                    <Toast.Body>Woohoo, Copied! Share With Your Friends</Toast.Body>
                </Toast>
            </div>
        )
    }
}

export default Lobby;
