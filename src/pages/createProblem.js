import React, { Component } from 'react'
import { Form, Col, Button, Card, Tabs, Tab, OverlayTrigger, Tooltip, ListGroup, Row } from 'react-bootstrap'
import "react-sliding-pane/dist/react-sliding-pane.css";
import { BsFillQuestionDiamondFill } from "react-icons/bs";
import ProblemSection from '../components/problemSection';
import CKEditor from 'ckeditor4-react';
import MyChip from '../components/myChips'
import SlidingPane from "react-sliding-pane";
import { DIFFICULTY, CREATE_PROBLEM, GET_PROBLEMS } from '../constants';
import { Link } from 'react-router-dom';
import QuestionTemplate from '../components/questionTemplate';
import PrimaryButton from '../components/primaryButton';
import '../css/createProblem.css';
import Navbar from '../components/navigation';


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
        ioExplaination: "",
        timeLimit: 0,
        memoryLimit: 0,
        maxCodeSize: 0,
        fileSampleInput: null,
        fileSampleOutput: null,
        fileIdealSolution: null,
        fileInputTestCase: null,
        fileOutputTestCase: null,
        problems: []

    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            validated: true
        })
    }
    onEditClick = (e) => {

    }

    handleTextChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
        //console.log(this.state.difficultyLevel);
    }

    isDataValid = () => {
        const {
            fileSampleInput,
            fileSampleOutput,
            fileIdealSolution,
            fileInputTestCase,
            fileOutputTestCase,
            problemTitle,
            problemStatement,
            difficultyLevel,
            chips,
            inputSpecification,
            outputSpecification,
            ioExplaination,
            timeLimit,
            memoryLimit,
            maxCodeSize } = this.state;

        return true;
    }


    onRequestClose = () => {
        this.setState({
            isPaneOpen: false
        });
    }

    handleChipsChange = chips => {
        this.setState({ chips });
        console.log(chips)
        console.log(this.state.chips)
    }

    showFile = async (e, id, fileId) => {
        this.setState({
            [fileId]: e.target.files
        })
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
        try {
            this.setState({
                [editor_id]: e.editor.getData()
            });
        } catch (e) {

        }
    }


    editProblem = (problem) => {
        this.setState({problemTitle:problem.problemTitle})
        this.setState({ difficultyLevel:problem.difficultyLevel})
        this.setState({ fileIdealSolution:problem.fileIdealSolution})
        this.setState({ fileInputTestCase:problem.fileInputTestCase})
        this.setState({ fileOutputTestCase:problem.fileOutputTestCase})
        this.setState({ fileSampleInput:problem.fileSampleInput})
        this.setState({ fileSampleOutput:problem.fileSampleOutput})
        this.setState({ fileSampleOutput:problem.fileSampleOutput})
        this.setState({ inputSpecification:problem.inputSpecification})
        this.setState({ ioExplanation:problem.ioExplanation})
        this.setState({ maxCodeSize:problem.maxCodeSize})
        this.setState({ memoryLimit:problem.memoryLimit})
        this.setState({ outputSpecification:problem.outputSpecification})
        this.setState({ problemStatement:problem.problemStatement})
        this.setState({ problemStatement:problem.problemStatement})
        this.setState({ timeLimit:problem.timeLimit})
        this.setState({ chips:problem.tags})
    }

    sendDataToserver = (e) => {
        console.log("clicked")
        e.preventDefault();
        this.setState({
            validated: true
        })
        //document.getElementById('error').textContent = "";
        var targetUrl = CREATE_PROBLEM
        const {
            fileSampleInput,
            fileSampleOutput,
            fileIdealSolution,
            fileInputTestCase,
            fileOutputTestCase,
            problemTitle,
            problemStatement,
            difficultyLevel,
            chips,
            inputSpecification,
            outputSpecification,
            ioExplaination,
            timeLimit,
            memoryLimit,
            maxCodeSize } = this.state;

        console.log(chips)
        //  if (true) {



        const formData = new FormData()
        formData.append("fileSampleInput", fileSampleInput[0])
        formData.append("fileSampleOutput", fileSampleOutput[0])
        formData.append("fileIdealSolution", fileIdealSolution[0])
        formData.append("fileInputTestCase", fileInputTestCase[0])
        formData.append("fileOutputTestCase", fileOutputTestCase[0])
        formData.append("problemTitle", problemTitle)
        formData.append("problemStatement", problemStatement)
        formData.append("difficultyLevel", difficultyLevel)
        formData.append("tags", chips)
        formData.append("inputSpecification", inputSpecification)
        formData.append("outputSpecification", outputSpecification)
        formData.append("ioExplaination", ioExplaination)
        formData.append("timeLimit", timeLimit)
        formData.append("memoryLimit", memoryLimit)
        formData.append("maxCodeSize", maxCodeSize)
        formData.append("authorId", localStorage.getItem("codeBattleId"))

        const requestOptions = {
            method: 'POST',
            headers: {
                //'Content-Type': "multipart/form-data",
                'Access-Control-Allow-Origin': '*',
                'Authorization': localStorage.getItem("tokenKey")
            },


            body: formData

        };


        fetch(targetUrl, requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    if (result.status == "success") {
                        this.setState({ isPaneOpen: false })
                    }
                    console.log(result);
                },
                (error) => {
                    console.log(error);
                }
            )
    }

    componentWillMount() {
        //document.getElementById('error').textContent = "";
        var targetUrl = GET_PROBLEMS

        const formData = new FormData()
        formData.append("authorId", localStorage.getItem("codeBattleId"))

        const requestOptions = {
            method: 'POST',
            headers: {
                //'Content-Type': "multipart/form-data",
                'Access-Control-Allow-Origin': '*',
                'Authorization': localStorage.getItem("tokenKey")
            },


            body: formData

        };


        fetch(targetUrl, requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({ problems: result.message })
                    console.log(result);
                },
                (error) => {
                    console.log(error);
                }
            )
    }


    render() {

        const { problems, validated, problemTitle, problemStatement, isPaneOpen, difficultyLevel, chips, 
            sampleInput, sampleOutput, inputSpecification, outputSpecification, ioExplaination } = this.state

        const question = {
            "problemTitle":problemTitle,
            "problemStatement":problemStatement,
            "difficultyLevel":difficultyLevel,
            "chips":chips,
            "sampleInput":sampleInput,
            "sampleOutput":sampleOutput,
            "inputSpecification":inputSpecification,
            "outputSpecification":outputSpecification,
            "ioExplaination":ioExplaination,
        }
        console.log(chips)
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
            <div className="createProblemMain">
            <Navbar bgColor={"dark"}/>
            <div className="row createProblem">
                <div className="w-50" >
                <QuestionTemplate question={question}/>
                </div>
                <div className="w-50">
                    <PrimaryButton onClick={() => this.setState({ isPaneOpen: true })} buttonContent={"Create a new Problem"}/>
                    <div className="text-left container">
                        <ListGroup className="questionsList">
                            {problems &&
                                problems.map((problem, index) => {
                                    return (
                                        <ListGroup.Item>
                                            <Row className="d-flex">
                                                <div className="pr-4">
                                                    <p>
                                                        {problem.id}
                                                    </p>
                                                </div>

                                                <div className="flex-grow-1">
                                                    <Link>
                                                        {problem.problemTitle}
                                                    </Link>
                                                </div>


                                                <div className="pl-4">
                                                    <PrimaryButton  onClick={(e) => this.editProblem(problems[index])} buttonContent={"Edit"}/>
                                                </div>

                                                <div className="pl-4">
                                                    <PrimaryButton 
                                                    buttonContent={(problem.problemStatus == "PUBLISHED") ? "Already Published" : "Submit For Review"} disabled={(problem.problemStatus == "PUBLISHED") ? true : null}/>
                                                </div>
                                            </Row>
                                        </ListGroup.Item>
                                    );
                                })}
                        </ListGroup>
                    </div>
                    <SlidingPane
                        className="createProblemSlidePane"
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
                                    <Form.Check id="difficultyLevel" inline label="Easy" type="radio" value={DIFFICULTY.easy} onChange={this.handleTextChange} />
                                    <Form.Check id="difficultyLevel" inline label="Medium" type="radio" value={DIFFICULTY.medium} onChange={this.handleTextChange} />
                                    <Form.Check id="difficultyLevel" inline label="Hard" type="radio" value={DIFFICULTY.hard} onChange={this.handleTextChange} />
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
                                            onChange={(e) => this.showFile(e, "sampleInput", "fileSampleInput")}
                                        />
                                        <Form.File
                                            id="sampleOutput"
                                            required
                                            label="Sample Output File"
                                            accept=".txt"
                                            onChange={(e) => this.showFile(e, "sampleOutput", "fileSampleOutput")}
                                        />
                                    </Form.Row>
                                </Form.Group>

                                <Form.Group controlId="">
                                    <Form.Label><strong>Input Specification</strong></Form.Label>
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
                                        onChange={(e) => this.showFile(e, "idealSolution", "fileIdealSolution")}
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
                                            onChange={(e) => this.showFile(e, "outputTestCase", "fileInputTestCase")}
                                        />
                                        <Form.File
                                            required
                                            label="Output File"
                                            accept=".txt"
                                            onChange={(e) => this.showFile(e, "inputTestCase", "fileOutputTestCase")}
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
                                            <Form.Control id="timeLimit" placeholder="" value={this.state.timeLimit} required onChange={this.handleTextChange} />
                                        </Col>
                                        <Col>
                                            <Form.Label>Memory limit (MB)</Form.Label>
                                            <Form.Control id="memoryLimit" placeholder="" value={this.state.memoryLimit} required onChange={this.handleTextChange} />
                                        </Col>
                                        <Col>
                                            <Form.Label>Maximum size code (KB)</Form.Label>
                                            <Form.Control id="maxCodeSize" placeholder="" value={this.state.maxCodeSize} required onChange={this.handleTextChange} />
                                        </Col>
                                    </Form.Row>
                                </Form.Group>
                                <PrimaryButton onClick={this.sendDataToserver} buttonContent={"Save"} />
                            </Form>
                        </div>
                    </SlidingPane>
                </div>
            </div>
            </div>
        )
    }
}

export default CreateProblem
