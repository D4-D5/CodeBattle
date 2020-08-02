import React, { Component } from "react";
import Button from 'react-bootstrap/Button'
import Card from "react-bootstrap/Card";
import { Row, ListGroup, Text, Toast, Col } from "react-bootstrap";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Container from "react-bootstrap/Container";
import {INVITE_MSG} from '../constants';



class Lobby extends Component {
    state = {
        roomId: '',
        copySuccess:false
    }

    handleSubmit = () => {
        this.props.history.push("/editor");
    }
    
    componentWillMount() {
        localStorage.getItem('loggedIn') == 'false' && this.props.history.push('/login');
    }
    componentDidMount() {
        let roomId = this.props.match.params.room_id;
        //   alert(roomId);
        this.setState({
            roomId: roomId
        });
    }
    //   alertClicked() {
    //     alert('You clicked the third ListGroupItem');
    //   }
    render() {
    const msg = INVITE_MSG+this.state.roomId;
        return (
            <div className="row bg-light d-flex align-items-center justify-content-around" style={{ height: "92vh" }}>
                <Card style={{ width: "50%",minHeight:"300px", }}>
                    <Card.Header><strong>Participants</strong></Card.Header>
                    <Card.Body>
                        <ListGroup style={{overflow:"scroll",height:"100%",maxHeight:"300px"}}>
                            <ListGroup.Item action href="">
                                Link 1
                            </ListGroup.Item>
                            <ListGroup.Item action href="">
                                Link 1
                            </ListGroup.Item>
                            <ListGroup.Item action href="">
                                Link 1
                            </ListGroup.Item>
                            <ListGroup.Item action href="">
                                Link 1
                            </ListGroup.Item>
                            
                        </ListGroup>
                    </Card.Body>
                </Card>
                <Card>
                <Card.Body>
                    <div className="row mx-2">
                        <textarea className="col" id="copyContent" disabled defaultValue={this.state.roomId}></textarea>
                        <CopyToClipboard text={msg}>
                        <Button className="" variant="secondary" onClick={() => this.setState({copySuccess: true})}>Copy</Button>
                        </CopyToClipboard>
                    </div>
                    </Card.Body>
                    <Button onClick={this.handleSubmit}>Lets Begin!</Button>
                </Card>
        <Toast onClose={() => this.setState({copySuccess:false})} show={this.state.copySuccess} delay={3000} autohide style={{position:"absolute",bottom:"0"}}>
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
