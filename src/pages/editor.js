import React, { Component } from 'react'
import AceEditor from "react-ace";
import { Base64 } from 'js-base64'
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-monokai";
import { Button, Card, Tabs, Tab } from 'react-bootstrap';

var recur_cnt = 0;

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
class Editor extends Component {
    state = {
        code: "",
        input: ""
    }
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
        return (
            <div className="row" style={{ height: "92vh" }}>
                <div className="w-50">
                    <Card>
                        <Card.Header>
                            <Tabs defaultActiveKey="Problem" id="uncontrolled-tab-example">
                                <Tab eventKey="Problem" title="Problem">
                                </Tab>
                            </Tabs>
                        </Card.Header>
                    </Card>
                </div>
                <div className="w-50 bg-info">
                    <AceEditor
                        width="100%"
                        placeholder="Placeholder Text"
                        mode="c_cpp"
                        theme="monokai"
                        name="blah2"
                        // onLoad={this.onLoad}
                        onChange={this.onChange}
                        fontSize={16}
                        showPrintMargin={true}
                        showGutter={true}
                        highlightActiveLine={true}
                        value={``}
                        setOptions={{
                            enableBasicAutocompletion: true,
                            enableLiveAutocompletion: true,
                            enableSnippets: true,
                            showLineNumbers: true,
                            tabSize: 4,
                        }} />
                    <textarea id="input" onChange={this.handleTextInput}>
                    </textarea>
                    <textarea id="output">
                    </textarea>
                    <Button onClick={this.handleSubmit}>Compile</Button>
                </div>
            </div>
        )
    }
}

export default Editor;
