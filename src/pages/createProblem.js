import React, { Component } from 'react'
import { Form, Col, Button, Card, Tabs, Tab } from 'react-bootstrap'
import CKEditor from 'ckeditor4-react';
import MyChip from '../components/myChips'
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import { GrClose } from "react-icons/gr";
import ProblemSection from '../components/problemSection';

class CreateProblem extends Component {
    state = {
        problemTitle: "",
        problemStatement: "<p>React is really <em>nice</em>!</p>",
        sampleExplanation: "<p>Sample Explanation</p>",
        validated: false,
        isPaneOpen: false
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            validated: true
        })
    }

    handleTextChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
        console.log(this.state.problemTitle);
    }

    handleProblemStatementChange = (evt) => {
        this.setState({
            problemStatement: evt.editor.getData()
        });
    }

    handleExplainationChange = (evt) => {
        this.setState({
            sampleExplanation: evt.editor.getData()
        });
    }

    render() {
        const { validated, problemTitle, problemStatement } = this.state
        // console.log("from render-> ",problemStatement);
        return (
            <div className="row">
                <ProblemSection problemTitle={problemTitle} problemStatement={problemStatement} />
                <div className="w-50">
                    <Button variant="outline-primary" onClick={() => this.setState({ isPaneOpen: true })}>
                        Create a new Problem
            </Button>
                    <SlidingPane
                        className="some-custom-class"
                        overlayClassName="some-custom-overlay-class"
                        isOpen={this.state.isPaneOpen}
                        title="Create Programming question"
                        width="50%"
                        // closeIcon={<GrClose lightingColor="dark"/>}
                        onRequestClose={() => {
                            this.setState({ isPaneOpen: false });
                        }}

                    >
                        <div className="container">
                            <Form validated={validated}>
                                <Form.Group controlId="exampleForm.ControlInput1">
                                    <Form.Label>Problem name</Form.Label>
                                    <Form.Control value={problemTitle} id="problemTitle" onChange={this.handleTextChange} type="text" placeholder="Enter problem name" required />
                                </Form.Group>
                                <Form.Group controlId="exampleForm.ControlTextarea1" required>
                                    <Form.Label>Problem statement</Form.Label>
                                    <CKEditor
                                        value={problemStatement}
                                        id="problemStatement"
                                        data={problemStatement}
                                        onChange={this.handleProblemStatementChange}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <strong>Difficulty level</strong><br />
                                    <Form.Check inline label="Easy" type="radio" name="diff" />
                                    <Form.Check inline label="Medium" type="radio" name="diff" />
                                    <Form.Check inline label="Hard" type="radio" name="diff" />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Tags</Form.Label>
                                    <MyChip></MyChip>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label><strong>Solution details</strong><br />The sample input and output must be uploaded in the format of .txt files up to the size of 5 MB.</Form.Label>
                                    <Form.Row>
                                        <Form.File
                                            required
                                            label="Input File"
                                            accept=".txt"
                                        />
                                        <Form.File
                                            required
                                            label="Output File"
                                            accept=".txt"
                                        />
                                    </Form.Row>
                                </Form.Group>
                                <Form.Group>

                                    <Form.Label><strong>Ideal solution</strong><br />
This is the correct logic that is used to solve the question. It is used to generate an expected output based on a custom input that is provided by candidates.
The ideal solution must have the same file extension as the programming language in which the solution is written such as .cpp for C++, .py for Python, and so on. The maximum size of the file must be 1 MB.
You have not added the ideal solution</Form.Label>
                                    <Form.File
                                        accept=".txt"
                                    />
                                </Form.Group>
                                <Form.Group controlId="">
                                    <Form.Label>Sample Explanation</Form.Label>
                                    <CKEditor
                                        id="sampleExplanation"
                                        data={this.state.sampleExplanation}
                                        onChange={this.handleExplainationChange}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label><strong>Test cases</strong><br /></Form.Label>
                                    <Form.Row>
                                        <Form.File
                                            required
                                            label="Input File"
                                            accept=".txt"
                                        />
                                        <Form.File
                                            required
                                            label="Output File"
                                            accept=".txt"
                                        />
                                    </Form.Row>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label><strong>Code checker settings</strong><br />Defines the maximum limits for each test case execution to be completed</Form.Label>
                                    <Form.Row>
                                        <Col>
                                            <Form.Label>Time limit (sec)</Form.Label>
                                            <Form.Control placeholder="" value="5" required />
                                        </Col>
                                        <Col>
                                            <Form.Label>Memory limit (MB)</Form.Label>
                                            <Form.Control placeholder="" value="256" required />
                                        </Col>
                                        <Col>
                                            <Form.Label>Maximum size of code (KB)</Form.Label>
                                            <Form.Control placeholder="" value="1024" required />
                                        </Col>
                                    </Form.Row>
                                </Form.Group>
                                <Button onClick={this.handleSubmit}>Save</Button>
                            </Form>
                        </div>
                    </SlidingPane>
                </div>
            </div>
        )
    }
}

export default CreateProblem
