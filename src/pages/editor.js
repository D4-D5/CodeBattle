import React, { Component, useState } from 'react'
import AceEditor from "react-ace";
import { Base64 } from 'js-base64'
import { FaAngleUp } from 'react-icons/fa';
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-monokai";
import { Button, Card, Tabs, Tab, ButtonGroup, DropdownButton, Dropdown, Spinner } from 'react-bootstrap';
import ProblemSection from '../components/problemSection';
import SplitPane from 'react-split-pane';
import styled from "styled-components";
import Navbar from '../components/navigation';
import {GET_CONTEST_QUESTIONS} from '../constants';

var recur_cnt = 0;

const Wrapper = styled.div`
  .Resizer {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    background: #000;
    opacity: 0.2;
    z-index: 1;
    -moz-background-clip: padding;
    -webkit-background-clip: padding;
    background-clip: padding-box;
  }

  .Resizer:hover {
    -webkit-transition: all 2s ease;
    transition: all 2s ease;
  }

  .Resizer.horizontal {
    height: 11px;
    margin: -5px 0;
    border-top: 5px solid rgba(255, 255, 255, 0);
    border-bottom: 5px solid rgba(255, 255, 255, 0);
    cursor: row-resize;
    width: 100%;
  }

  .Resizer.horizontal:hover {
    border-top: 5px solid rgba(0, 0, 0, 0.5);
    border-bottom: 5px solid rgba(0, 0, 0, 0.5);
  }

  .Resizer.vertical {
    width: 11px;
    margin: 0 -5px;
    border-left: 5px solid rgba(255, 255, 255, 0);
    border-right: 5px solid rgba(255, 255, 255, 0);
    cursor: col-resize;
  }

  .Resizer.vertical:hover {
    border-left: 5px solid rgba(0, 0, 0, 0.5);
    border-right: 5px solid rgba(0, 0, 0, 0.5);
  }
  ${'' /* .Pane1 {
    background-color: blue;
  }
  .Pane2 {
    background-color: red;
  } */}
`;


function getASubmission(token) {
    // const code = this.state.code
    recur_cnt = recur_cnt + 1;

    console.log(token);
    var targetUrl = "https://judge0.p.rapidapi.com/submissions/" + token + "?base64_encoded=true";
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': "application/json; charset=utf-8",
            "x-rapidapi-host": "judge0.p.rapidapi.com",
            "x-rapidapi-key": "b946b6f0e6msh1224e8239afb55ap159f6cjsn00c7abe84edf",
            "accept": "application/json"
        },
    };


    fetch(targetUrl, requestOptions)
        .then(res => res.json())
        .then(
            (result) => {
                console.log(result);
                if (result.status.id < 3) {
                    if (recur_cnt < 10) {
                        console.log("processing");
                        setTimeout(() => {
                            getASubmission(token)
                        }, 200);
                    }
                    else {
                        console.log("Exceeded -> ", recur_cnt)
                        recur_cnt = 0;
                    }
                }
                else if (result.status.id === 3) {
                    var output = result.stdout;
                    var container = document.getElementById("output");
                    container.innerHTML = Base64.decode(output);
                }
                else if (result.compile_output) {
                    var output = result.compile_output;
                    var container = document.getElementById("output");
                    container.innerHTML = Base64.decode(output);
                }
                else {
                    console.log(result.status.description);
                }
            },
            (error) => {
                console.log(error);
            }
        )
}


function UserGreeting(props) {
    const [activetab, setActivetab] = useState('result');
    return (
        <Card style={{ position: 'absolute', bottom: 39, right: 0, left: 40, top: "50%" }}>
            <Card.Header>
                <Tabs
                    id="controlled-tab-example"
                    activeKey={activetab}
                    onSelect={(activetab) => setActivetab(activetab)}
                >
                    <Tab eventKey="testcase" title="Test Cases">
                    </Tab>
                    <Tab eventKey="result" title="Result">
                    </Tab>
                </Tabs>
            </Card.Header>
            <Card.Body>
                {activetab === "testcase" ? <div><textarea></textarea></div> : null}
            </Card.Body>
        </Card>
    );
}



class Editor extends Component {


    state = {
        code: "",
        input: "",
        roomId:"",
        questions:[],
        status:"IDLE"
    }
    defaultCPP = '#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n\tcout<<"War Begin!";\n\treturn 0;\n}';
    onChange = (newValue) => {
        // console.log(newValue);
        this.setState({
            code: newValue
        })
    }

    handleTextInput = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        console.log(this.state.code);
        recur_cnt = 0;
        this.sendDataToServer();

    }

    getContestQuestions = (roomId) =>{
        var targetUrl = GET_CONTEST_QUESTIONS
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
                    if(result.status=="success"){
                        this.setState({
                            questions:result.message,
                            status:"DONE"
                        })
                    }
                },
                (error) => {
                    console.log(error);
                }
            )
    }
    
    componentWillMount() {
        let roomId = this.props.match.params.room_id;
        this.setState({
            roomId: roomId
        });
        this.getContestQuestions(roomId)
    }



    sendDataToServer = () => {
        const { code, input } = this.state;
        var targetUrl = "https://judge0.p.rapidapi.com/submissions"
        var data = JSON.stringify({
            "language_id": 54,
            "source_code": code,
            "stdin": input
        });

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': "application/json; charset=utf-8",
                "x-rapidapi-host": "judge0.p.rapidapi.com",
                "x-rapidapi-key": "b946b6f0e6msh1224e8239afb55ap159f6cjsn00c7abe84edf",
                "accept": "application/json"
            },
            body: data
        };

        fetch(targetUrl, requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result.token);
                    setTimeout(() => {
                        getASubmission(result.token)
                    }, 200);
                    //   getASubmission(result.token);
                },
                (error) => {
                    console.log(error);
                }
            )
    }
    render() {
        const {questions,status} = this.state;
        // console.log(questions[0]);
        return (
            
            <div className="row">
                <Wrapper>
                    <SplitPane split="vertical" defaultSize="50%" minSize="300">
                        
                        <div className="w-100" style={{height:"92vh"}}>

                        {status==="DONE"?<ProblemSection questions={questions}/>:<Spinner animation="border" />}

                        </div>
                        
                        <div className="w-100" style={{ height: "92vh" }}>
                            <Card className="h-100">
                                <Card.Header>
                                    <ButtonGroup style={{ float: 'right' }} size="sm">
                                        <DropdownButton as={ButtonGroup} title="Language" variant="outline-secondary" size="sm">
                                            <Dropdown.Item eventKey="1">C++</Dropdown.Item>
                                            <Dropdown.Item eventKey="2">JAVA</Dropdown.Item>
                                        </DropdownButton>
                                        <DropdownButton as={ButtonGroup} title="Theme" variant="outline-secondary">
                                            <Dropdown.Item eventKey="1">Dark</Dropdown.Item>
                                            <Dropdown.Item eventKey="2">Light</Dropdown.Item>
                                        </DropdownButton>
                                    </ButtonGroup>
                                </Card.Header>

                                <AceEditor
                                    placeholder="Write your code from here"
                                    width="100%"
                                    height="100%"
                                    mode="c_cpp"
                                    theme="monokai"
                                    name="blah2"
                                    onLoad={this.onLoad}
                                    onChange={this.onChange}
                                    fontSize={16}
                                    showPrintMargin={true}
                                    showGutter={true}
                                    highlightActiveLine={true}
                                    value={this.defaultCPP}
                                    setOptions={{
                                        enableBasicAutocompletion: true,
                                        enableLiveAutocompletion: true,
                                        enableSnippets: true,
                                        showLineNumbers: true,
                                        tabSize: 2,
                                    }} />
                                {this.state.isPaneOpen ? <UserGreeting /> : null}
                                <ButtonGroup>
                                    <Button variant="outline-info" onClick={() => this.setState({ isPaneOpen: !this.state.isPaneOpen })}>
                                        console <FaAngleUp />
                                    </Button>
                                    <Button variant="secondary" onClick={null}>Run Code</Button>
                                    <Button>Submit</Button>
                                </ButtonGroup>
                            </Card>
                        </div>
                    </SplitPane>
                </Wrapper>
            </div>
        )
    }
}

export default Editor;
