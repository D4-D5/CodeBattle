import React, { Component, useState } from 'react'
import AceEditor from "react-ace";
import { Base64 } from 'js-base64'
import { FaAngleUp } from 'react-icons/fa';
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-xcode";
import "ace-builds/src-noconflict/theme-terminal";
import { Button, Card, Tabs, Tab, ButtonGroup, DropdownButton, Dropdown, Spinner } from 'react-bootstrap';
import ProblemSection from '../components/problemSection';
import SplitPane from 'react-split-pane';
import styled from "styled-components";
import { GET_CONTEST_QUESTIONS, SUBMIT_PROBLEM, SOCK_JS } from '../constants';
import SockJsClient from 'react-stomp';
import Countdown from 'react-countdown';
import '../css/editor.css';
import PrimaryButton from '../components/primaryButton';

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



function ProblemConsole({ output }) {
    const [activetab, setActivetab] = useState('result');
    return (
        <Card style={{ position: 'absolute', bottom: 39, right: 1, left: 1, top: "50%", zIndex: "4" }} className="consoleCard">
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
                {activetab === "result" ? <div>{output}</div> : null}
            </Card.Body>
        </Card>
    );
}



class Editor extends Component {


    state = {
        code: '#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n\tcout<<"War Begin!";\n\treturn 0;\n}',
        input: "",
        roomId: "",
        questions: [],
        status: "IDLE",
        output: "",
        languageId: "54",
        theme: "monokai",
        languageName: "c_cpp",
        languageTitle: "C++ (GCC 9.2.0)"
    }
    defaultCPP = '';
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

    hadleCompile = (e) => {
        console.log(this.state.code);
        recur_cnt = 0;
        this.setState({ isPaneOpen: !this.state.isPaneOpen })
        this.createSubmission();

    }
    hadleSubmit = (e) => {
        console.log(this.state.code);
        recur_cnt = 0;
        this.setState({ isPaneOpen: !this.state.isPaneOpen })
        this.submitSolutionToServer();

    }

    submitSolutionToServer = (e) => {
        var targetUrl = SUBMIT_PROBLEM

        var data = JSON.stringify({
            "problemId": localStorage.getItem("currentQuestionId"),
            "codeBattleId": localStorage.getItem("codeBattleId"),
            "sourceCode": this.state.code,
            "roomId": this.state.roomId,
            "languageId": this.state.languageId
        });

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': "application/json; charset=utf-8",
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
                        output: result.message
                    })
                },
                (error) => {
                    console.log(error);
                }
            )
    }

    getASubmission = (token) => {
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
                                this.getASubmission(token)
                            }, 200);
                        }
                        else {
                            console.log("Exceeded -> ", recur_cnt)
                            recur_cnt = 0;
                        }
                    }
                    else if (result.status.id === 3) {
                        var output = result.stdout;
                        //var container = document.getElementById("output");
                        //container.innerHTML = Base64.decode(output);

                        this.setState({
                            output: Base64.decode(output)
                        })
                    }
                    else if (result.compile_output) {
                        var output = result.compile_output;
                        //var container = document.getElementById("output");
                        //container.innerHTML = Base64.decode(output);
                        this.setState({
                            output: Base64.decode(output)
                        })
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

    onlanguageSelected = (e) => {
        var l_name = ""
        if (e == "49" || e == "50" || e == "53" || e == "54") {
            l_name = "c_cpp"
        } else if (e == 70 || e == 71) {
            l_name = "python"
        } else if (e == 62) {
            l_name = "java"
        }

        var lang = ""
        var d_code = ""
        if (e == "53") {
            lang = "C++ (GCC 8.3.0)"
            d_code = '#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n\tcout<<"War Begin!";\n\treturn 0;\n}'
        } else if (e == "54") {
            lang = "C++ (GCC 9.2.0)"
            d_code = '#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n\tcout<<"War Begin!";\n\treturn 0;\n}'
        } else if (e == "62") {
            lang = "JAVA"
            d_code = "class Main  \n{ \n    public static void main (String[] args)  \n    {          \n      System.out.println(\"War Begin!\");\n    } \n}"
        } else if (e == "70") {
            lang = "Python (2.7.17)"
            d_code = "print \"War Begin!\";"
        } else if (e == "71") {
            lang = "Python (3.8.1)"
            d_code = "print(\"War Begin!\");"
        } else if (e == "49") {
            lang = "C (GCC 8.3.0)"
            d_code = "#include<stdio.h>\n\nint main() {\n    printf(\"War Begin!\");\n}"
        } else if (e == "50") {
            lang = "C (GCC 9.2.0)"
            d_code = "#include<stdio.h>\n\nint main() {\n    printf(\"War Begin!\");\n}"
        }

        this.setState({
            languageId: e,
            languageName: l_name,
            languageTitle: lang,
            code: d_code
        })
    }

    onThemeSelected = (e) => {
        this.setState({
            theme: e
        })
    }
    getContestQuestions = (roomId) => {
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
                    if (result.status == "success") {
                        this.setState({
                            questions: result.message,
                            status: "DONE"
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



    createSubmission = () => {
        const { code, input } = this.state;
        var targetUrl = "https://judge0.p.rapidapi.com/submissions"
        var data = JSON.stringify({
            "language_id": this.state.languageId,
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
                        this.getASubmission(result.token)
                    }, 200);
                    //   getASubmission(result.token);
                },
                (error) => {
                    console.log(error);
                }
            )
    }
    render() {
        const { questions, status, output, code, languageId, theme, languageName, languageTitle, roomID } = this.state;
        // console.log(questions[0]);
        return (

            <div className="row editor">
                <SockJsClient url={SOCK_JS} topics={['/topic/' + roomID]}
                    onMessage={(msg) => {
                        console.log(msg)
                        if (msg == "CONTEST_ENDED") {
                            this.props.history.push("/home");
                        }
                    }}
                    ref={(client) => { this.clientRef = client }}
                    onConnect={(e) => {
                        console.log("Connected");
                    }}
                />
                <Wrapper>
                    <SplitPane split="vertical" defaultSize="50%" minSize="300">

                        <div className="w-100" style={{ height: "100vh" }}>

                            {status === "DONE" ? <ProblemSection questions={questions} /> : <Spinner animation="border" className="problemSectionLoader"/>}

                        </div>

                        <div className="w-100 compiler" style={{ height: "100vh" }}>
                            <Card className="h-100">
                                <Card.Header>
                                    <Countdown date={Date.now() + 2700000} />
                                    <ButtonGroup style={{ float: 'right' }} size="sm">
                                        <DropdownButton activeKey={languageId} as={ButtonGroup} title={languageTitle} variant="outline-secondary" size="sm" onSelect={(e) => this.onlanguageSelected(e)}>
                                            <Dropdown.Item eventKey="53">C++ (GCC 8.3.0)</Dropdown.Item>
                                            <Dropdown.Item eventKey="54">C++ (GCC 9.2.0)</Dropdown.Item>
                                            <Dropdown.Item eventKey="62">JAVA</Dropdown.Item>
                                            <Dropdown.Item eventKey="70">Python (2.7.17)</Dropdown.Item>
                                            <Dropdown.Item eventKey="71">Python (3.8.1)</Dropdown.Item>
                                            <Dropdown.Item eventKey="49">C (GCC 8.3.0)</Dropdown.Item>
                                            <Dropdown.Item eventKey="50">C (GCC 9.2.0)</Dropdown.Item>
                                        </DropdownButton>
                                        <DropdownButton activeKey={theme} as={ButtonGroup} title={theme} variant="outline-secondary" size="sm" onSelect={(e) => this.onThemeSelected(e)}>
                                            <Dropdown.Item eventKey="monokai">monakai</Dropdown.Item>
                                            <Dropdown.Item eventKey="github">github</Dropdown.Item>
                                            <Dropdown.Item eventKey="xcode">xcode</Dropdown.Item>
                                            <Dropdown.Item eventKey="terminal">terminal</Dropdown.Item>
                                        </DropdownButton>
                                    </ButtonGroup>
                                </Card.Header>

                                <AceEditor
                                    placeholder="Write your code from here"
                                    width="100%"
                                    height="100%"
                                    mode={languageName}
                                    theme={theme}
                                    name="blah2"
                                    onLoad={this.onLoad}
                                    onChange={this.onChange}
                                    fontSize={16}
                                    showPrintMargin={true}
                                    showGutter={true}
                                    highlightActiveLine={true}
                                    value={code}
                                    setOptions={{
                                        enableBasicAutocompletion: true,
                                        enableLiveAutocompletion: true,
                                        enableSnippets: true,
                                        showLineNumbers: true,
                                        tabSize: 2,
                                    }} />
                                {this.state.isPaneOpen ? <ProblemConsole output={output} /> : null}
                                <ButtonGroup>
                                    <Button variant="outline-info" className="consoleBtn" onClick={() => this.setState({ isPaneOpen: !this.state.isPaneOpen })}>
                                        Console <FaAngleUp />
                                    </Button>
                                    <Button variant="secondary" className="runCodeBtn" onClick={this.hadleCompile}>Run Code</Button>
                                    <Button onClick={this.hadleSubmit} className="submitBtn">Submit</Button>
                                    {/* <PrimaryButton onClick={this.hadleSubmit} buttonContent={"Submit"}/> */}
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
