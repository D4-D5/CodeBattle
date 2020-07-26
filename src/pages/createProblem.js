import React, { Component } from 'react'
import { Form, Col, Button, Card, Tabs, Tab, OverlayTrigger, Tooltip } from 'react-bootstrap'
import "react-sliding-pane/dist/react-sliding-pane.css";
import { BsFillQuestionDiamondFill } from "react-icons/bs";
import ProblemSection from '../components/problemSection';
import CKEditor from 'ckeditor4-react';
import MyChip from '../components/myChips'
import SlidingPane from "react-sliding-pane";
import { DIFFICULTY } from '../constants';

class CreateProblem extends Component {
    state = {
        validated: false,
        isPaneOpen: false,
        problemTitle: "",
        problemStatement: "",
        difficultyLevel: "",
        chips: [],
        sampleInput: "",
        sampleOutput: "",
        idealSolution: "",
        inputSpecification: "",
        outputSpecification: "",
        ioExplaination: ""
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
        console.log(this.state.difficultyLevel);
    }

    // handleProblemStatementChange = (evt) => {
    //     this.setState({
    //         problemStatement: evt.editor.getData()
    //     });
    // }

    // handleExplainationChange = (evt) => {
    //     this.setState({
    //         sampleExplanation: evt.editor.getData()
    //     });
    // }

    onRequestClose = () => {
        this.setState({
            isPaneOpen: false
        });
    }

    handleChipsChange = chips => {
        this.setState({ chips });
    }

    showFile = async (e, id) => {
        e.preventDefault()
        const reader = new FileReader()
        reader.onload = async (e) => {
            const text = (e.target.result)
            console.log(text)
            this.setState({
                [id]: text
            })

        };
        reader.readAsText(e.target.files[0])
    }

    handleEditorChange = (e, editor_id) => {
        this.setState({
            [editor_id]: e.editor.getData()
        });
    }





    render() {
        
        const { validated, problemTitle, problemStatement, isPaneOpen, difficultyLevel, chips, sampleInput, sampleOutput, inputSpecification, outputSpecification, ioExplaination } = this.state
        const tooltipSolutionDetails = (props) => (
            <Tooltip id="button-tooltip" {...props}>
              The sample input and output must be uploaded in the format of .txt files up to the size of 5 MB.
            </Tooltip>
          );
          const tooltipIdealSolution = (props) => (
            <Tooltip id="button-tooltip" {...props}>
              The maximum size of the ideal solution file must be atmost 1 MB and with proper language extensions(.cpp, .py, etc).
            </Tooltip>
          );

          const tooltipLimits = (props) => (
            <Tooltip id="button-tooltip" {...props}>
              Defines the maximum limits for each test case execution to be completed
            </Tooltip>
          );
        console.log(sampleInput);
        console.log(sampleOutput);
        return (
            <div className="row">
                <ProblemSection problemTitle={problemTitle} problemStatement={problemStatement} sampleInput={sampleInput} sampleOutput={sampleOutput} inputSpecification={inputSpecification} outputSpecification={outputSpecification} ioExplaination={ioExplaination} />
                <div className="w-50">
                    <Button variant="outline-primary" onClick={() => this.setState({ isPaneOpen: true })}>
                        Create a new Problem
                    </Button>
                    <SlidingPane
                        className="some-custom-class"
                        overlayClassName="some-custom-overlay-class"
                        isOpen={isPaneOpen}
                        title="Create Programming question"
                        width="50%"
                        // closeIcon={<GrClose lightingColor="dark"/>}
                        onRequestClose={this.onRequestClose}>
                        <div className="container">
                            <Form validated={validated}>
                                <Form.Group controlId="exampleForm.ControlInput1">
                                    <Form.Label><strong>Problem name</strong></Form.Label>
                                    <Form.Control value={problemTitle} id="problemTitle" onChange={this.handleTextChange} type="text" placeholder="Enter problem name" required />
                                </Form.Group>
                                <Form.Group controlId="exampleForm.ControlTextarea1" required>
                                    <Form.Label><strong>Problem statement</strong></Form.Label>
                                    <CKEditor
                                        value={problemStatement}
                                        id="problemStatement"
                                        data={problemStatement}
                                        onChange={(e) => this.handleEditorChange(e, "problemStatement")}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <strong>Difficulty level</strong><br />
                                    <Form.Check id="difficultyLevel" inline label="Easy" type="radio" name="diff" value={DIFFICULTY.easy} onChange={this.handleTextChange} />
                                    <Form.Check id="difficultyLevel" inline label="Medium" type="radio" name="diff" value={DIFFICULTY.medium} onChange={this.handleTextChange} />
                                    <Form.Check id="difficultyLevel" inline label="Hard" type="radio" name="diff" value={DIFFICULTY.hard} onChange={this.handleTextChange} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Tags</Form.Label>
                                    <MyChip chips={chips} handleChipsChange={this.handleChipsChange} />
                                </Form.Group>
                                <Form.Group>
                                    <OverlayTrigger
                                        placement="right"
                                        delay={{ show: 250, hide: 400 }}
                                        overlay={tooltipSolutionDetails}>

                                        <Form.Label><strong>Solution details   </strong><BsFillQuestionDiamondFill /></Form.Label>

                                    </OverlayTrigger>
                                    <Form.Row>
                                        <Form.File
                                            required
                                            id="sampleInput"
                                            label="Sample Input File"
                                            accept=".txt"
                                            onChange={(e) => this.showFile(e, "sampleInput")}
                                        />
                                        <Form.File
                                            id="sampleOutput"
                                            required
                                            label="Sample Output File"
                                            accept=".txt"
                                            onChange={(e) => this.showFile(e, "sampleOutput")}
                                        />
                                    </Form.Row>
                                </Form.Group>

                                <Form.Group controlId="">
                                    <Form.Label>Input Specification</Form.Label>
                                    <CKEditor
                                        data={this.state.inputSpecification}
                                        onChange={(e) => this.handleEditorChange(e, "inputSpecification")}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Group controlId="">
                                        <Form.Label><strong>Output Specification</strong></Form.Label>
                                        <CKEditor
                                            data={this.state.outputSpecification}
                                            onChange={(e) => this.handleEditorChange(e, "outputSpecification")}
                                        />
                                    </Form.Group>
                                    <Form.Group></Form.Group>

                                    <OverlayTrigger
                                        placement="right"
                                        delay={{ show: 250, hide: 400 }}
                                        overlay={tooltipIdealSolution}>

                                        <Form.Label><strong>Ideal Solution   </strong><BsFillQuestionDiamondFill /></Form.Label>

                                    </OverlayTrigger>
                                    <Form.File
                                        accept=".txt"
                                        onChange={(e) => this.showFile(e, "idealSolution")}
                                    />
                                </Form.Group>
                                <Form.Group controlId="">
                                    <Form.Label>Sample Explanation</Form.Label>
                                    <CKEditor
                                        id="sampleExplanation"
                                        data={this.state.sampleExplanation}
                                        onChange={(e) => this.handleEditorChange(e, "ioExplaination")}
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
                                <OverlayTrigger
                                        placement="right"
                                        delay={{ show: 250, hide: 400 }}
                                        overlay={tooltipLimits}>

                                        <Form.Label><strong>Coder checker Limits   </strong><BsFillQuestionDiamondFill /></Form.Label>

                                    </OverlayTrigger>
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
                                            <Form.Label>Maximum size code (KB)</Form.Label>
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
