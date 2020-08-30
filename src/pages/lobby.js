import React, { Component } from "react";
// import Button from 'react-bootstrap/Button'
// import Card from "react-bootstrap/Card";
import { Row, ListGroup, Text, Toast, Col, Card, Container, Button, CardImg } from "react-bootstrap";
import { CopyToClipboard } from 'react-copy-to-clipboard';
// import Container from "react-bootstrap/Container";
import { INVITE_MSG, ADD_CONTESTANT, GET_CONTESTANTS, SOCK_JS,START_CONTEST } from '../constants';
import SockJS from "sockjs-client"
import SockJsClient from 'react-stomp';
import { TalkBox } from "react-talk";
import Navbar from '../components/navigation';
import '../css/lobby.css';
import PrimaryButton from '../components/primaryButton';
import startImg from '../assets/images/start-01-01.svg';

const stompClient = null
class Lobby extends Component {
    state = {
        roomId: '',
        copySuccess: false,
        contestants: []
    }

    handleStartContest = () => {
        

        var targetUrl = START_CONTEST
        var data = JSON.stringify({
            "roomId": this.state.roomId,
            "owner": localStorage.getItem("codeBattleId")
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
                    if(result.status=="success"){
                        
                    }
                },
                (error) => {
                    console.log(error);
                }
            )
    }

    componentWillMount() {
        //localStorage.getItem('loggedIn') == 'false' && this.props.history.push('/login');
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
        localStorage.setItem("roomId",roomId)
        this.setState({
            roomId: roomId
        });

        if(this.props.location.state){
            this.getContestants(roomId)
        }else{
            this.addContestant(roomId)
        }
    }
    
    render() {
        const wsSourceUrl = window.location.protocol + "//" + window.location.host + "/ws";
        console.log("wsSourceUrl", wsSourceUrl)
        const msg = INVITE_MSG + this.state.roomId;
        const roomID = this.state.roomId;
        const contestants = this.state.contestants;
        console.log(contestants);
        const numberOfParticipants = contestants.length;
        return (
            // <div className="row bg-light d-flex align-items-center justify-content-around" style={{ height: "92vh" }}>
     
            //     <SockJsClient url={SOCK_JS} topics={['/topic/'+roomID]}
            //         onMessage={(msg) => { 

            //             if(msg=="CONTEST_STARTED"){
            //                 this.props.history.push("/editor/"+roomID);
            //             }else if (msg == "CONTEST_ENDED") {
            //                 //TODO
            //                 this.props.history.push("/home");
            //             } 
            //             else{
            //                 var list = [...contestants,{"codeBattleId":msg}]
            //                 this.setState({
            //                     contestants:list
            //                 })
            //                 console.log("SockJS" + msg); 
            //             }
            //         }}
            //         ref={(client) => { this.clientRef = client }}
            //         onConnect={(e) => {
            //             console.log("Connected");
            //         }}
            //     />
            //     <Card style={{ width: "50%", minHeight: "300px", }}>
            //         <Card.Header><strong>Participants</strong></Card.Header>
            //         <Card.Body>
            //             <ListGroup style={{ overflow: "scroll", height: "600px", maxHeight: "600px" }}>
            //                 {contestants &&
            //                     contestants.map((contestant, index) => {
            //                         return (
            //                             <ListGroup.Item>
            //                                 {contestant.codeBattleId}
            //                             </ListGroup.Item>
            //                         );
            //                     })}
            //             </ListGroup>

            //         </Card.Body>
            //     </Card>
            //     <Card>
            //         <Card.Body>
            //             <div className="row mx-2">
            //                 <textarea className="col" id="copyContent" disabled defaultValue={this.state.roomId}></textarea>
            //                 <CopyToClipboard text={msg}>
            //                     <Button className="" variant="secondary" onClick={() => this.setState({ copySuccess: true })}>Copy</Button>
            //                 </CopyToClipboard>
            //             </div>
            //         </Card.Body>
            //         {this.props.location.state?<Button onClick={this.handleStartContest}>Let's Begin!</Button>:null}
            //     </Card>
            //     <Toast onClose={() => this.setState({ copySuccess: false })} show={this.state.copySuccess} delay={3000} autohide style={{ position: "absolute", bottom: "0" }}>
            //         <Toast.Header>
            //             <strong className="mr-auto">CodeBattle</strong>
            //         </Toast.Header>
            //         <Toast.Body>Woohoo, Copied! Share With Your Friends</Toast.Body>
            //     </Toast>
            // </div>


            <div className="lobby">
                <SockJsClient url={SOCK_JS} topics={['/topic/'+roomID]}
                    onMessage={(msg) => { 

                        if(msg=="CONTEST_STARTED"){
                            this.props.history.push("/editor/"+roomID);
                        }else if (msg == "CONTEST_ENDED") {
                            //TODO
                            this.props.history.push("/home");
                        } 
                        else{
                            var list = [...contestants,{"codeBattleId":msg}]
                            this.setState({
                                contestants:list
                            })
                            console.log("SockJS" + msg); 
                        }
                    }}
                    ref={(client) => { this.clientRef = client }}
                    onConnect={(e) => {
                        console.log("Connected");
                    }}
                />
                <Navbar bgColor={"dark"}/>

                <Toast onClose={() => this.setState({copySuccess:false})} show={this.state.copySuccess} delay={3000} autohide style={{position:"absolute",bottom:"0",right:"0"}}>
                    <Toast.Header>
                        <strong className="mr-auto">CodeBattle</strong>
                    </Toast.Header>
                    <Toast.Body>Woohoo, Copied! Share With Your Friends</Toast.Body>
                </Toast>

                <div className="row">
                    <div className="col-lg-9 col-12 order-2 order-lg-1">
                        <div className="listOfParticipants">
                            <Card>
                                <Card.Header className="text-center">All Participants<span className="numberOfParticipants d-flex justify-content-end">{numberOfParticipants}/100</span></Card.Header>
                                <ListGroup variant="flush" className="list text-center">
                                    {contestants &&
                                    contestants.map((contestant, index) => {
                                        return (
                                            <ListGroup.Item>
                                                {contestant.codeBattleId}
                                            </ListGroup.Item>
                                        );
                                    })}
                                </ListGroup>
                            </Card>
                        </div>
                    </div>
                    <div className="col-lg-3 col-12 lobbyRight order-1 order-lg-2">
                        <div className="copyRoomId">
                            <Card className="copyRoomIdCard">
                                <Card.Body>
                                    <Card.Text>
                                        <p>Copy the link and invite your friends to join the contest</p>
                                        <p className="roomId"> {this.state.roomId}</p>
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
                            {this.props.location.state?<PrimaryButton onClick={this.handleStartContest} buttonContent={"Start Contest"}/>:null}      
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Lobby;
