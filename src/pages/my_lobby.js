import React, { Component } from "react";
// import Button from 'react-bootstrap/Button'
// import Card from "react-bootstrap/Card";
import { Row, ListGroup, Text, Toast, Col, Card, Container, Button, CardImg } from "react-bootstrap";
import {CopyToClipboard} from 'react-copy-to-clipboard';
// import Container from "react-bootstrap/Container";
// import {INVITE_MSG} from '../constants';
import Navbar from '../components/navbar';
import '../css/lobby.css';
import PrimaryButton from '../components/primaryButton';
import startImg from '../assets/images/start-01-01.svg';



class Lobby extends Component {
    state = {
        // roomId: '',
        copySuccess:false,
        participants: ["palash","mohit","lokesh","aman","yash","palash","mohit","lokesh","aman","yash","vishvendra"]
    }

    // handleSubmit = () => {
    //     this.props.history.push("/editor");
    // }
    
    // componentWillMount() {
    //     localStorage.getItem('loggedIn') == 'false' && this.props.history.push('/login');
    // }
    // componentDidMount() {
    //     let roomId = this.props.match.params.room_id;
    //     this.setState({
    //         roomId: roomId
    //     });
    // }
    //   alertClicked() {
    //     alert('You clicked the third ListGroupItem');
    //   }
    render() {
        const participantsList = this.state.participants;
        const list = participantsList.map(participant => {
            return(
            <ListGroup.Item><a href="" >{participant}</a></ListGroup.Item>
            )
        })
        const numberOfParticipants = participantsList.length;
        const msg = "compete with ur friends";
        return (
            <div className="lobby">
                <Navbar bgColor={"dark"}/>
                {/* <Container className="copyRoomId d-flex justify-content-center">
                    <Card className="copyRoomIdCard">
                        <Card.Body>
                            <Card.Text>
                                <p className="m-0">Defn415561usnvGn</p>
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer className="p-0 d-flex">
                            <CopyToClipboard text={msg}>
                                <Button className="copyRoomIdBtn" variant="secondary" onClick={() => this.setState({copySuccess: true})}>Copy</Button>
                            </CopyToClipboard>
                        </Card.Footer>
                    </Card>
                </Container>
                <Container className="listOfParticipants text-center">
                    <PrimaryButton buttonContent={"Start Contest"}/>
                    <Card>
                        <Card.Header>All Participants<span className="numberOfParticipants d-flex justify-content-end">{numberOfParticipants}/100</span></Card.Header>
                        <ListGroup variant="flush" className="list">
                            {list}
                        </ListGroup>
                    </Card>
                </Container> */}
                <Toast onClose={() => this.setState({copySuccess:false})} show={this.state.copySuccess} delay={3000} autohide style={{position:"absolute",bottom:"0",right:"0"}}>
                    <Toast.Header>
                        <strong className="mr-auto">CodeBattle</strong>
                    </Toast.Header>
                    <Toast.Body>Woohoo, Copied! Share With Your Friends</Toast.Body>
                </Toast>
                {/* <h2 className="mt-5 lobbyHeader">Waiting for other participant to join the contest</h2> */}
                <div className="row">
                    <div className="col-lg-9 col-12 order-2 order-lg-1">
                        <div className="listOfParticipants">
                            {/* <PrimaryButton buttonContent={"Start Contest"}/> */}
                            <Card>
                                <Card.Header className="text-center">All Participants<span className="numberOfParticipants d-flex justify-content-end">{numberOfParticipants}/100</span></Card.Header>
                                <ListGroup variant="flush" className="list text-center">
                                    {list}
                                </ListGroup>
                            </Card>
                        </div>
                    </div>
                    <div className="col-lg-3 col-12 lobbyRight order-1 order-lg-2">
                        <div className="copyRoomId">
                            <Card className="copyRoomIdCard">
                                <Card.Body>
                                    {/* <Card.Title>CodeBattle</Card.Title> */}
                                    <Card.Text>
                                        <p>Copy the link and invite your friends to join the contest</p>
                                        <p className="roomId"> ce9d6f69-21af-4aaf-b630-f8a7b7376064</p>
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer className="p-0 d-flex">
                                    <CopyToClipboard text={msg}>
                                        <Button className="copyRoomIdBtn" variant="secondary" onClick={() => this.setState({copySuccess: true})}>Copy</Button>
                                    </CopyToClipboard>
                                </Card.Footer>
                            </Card>
                        </div>
                        <div>
                            <img src={startImg} className="startImg img-fluid"/>
                            <PrimaryButton buttonContent={"Start Contest"}/>        
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default Lobby;
