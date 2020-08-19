import React, { Component } from 'react'
import { Form, Col, Button, Card, Tabs, Tab, OverlayTrigger, Tooltip, ListGroup, Row, Dropdown, DropdownButton, ButtonGroup, Badge } from 'react-bootstrap'
import "react-sliding-pane/dist/react-sliding-pane.css";
import { BsFillQuestionDiamondFill } from "react-icons/bs";
import ProblemSection from '../components/problemSection';
// import CKEditor from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from 'ckeditor5-build-classic-mathtype'
import MyChip from '../components/myChips'
import SlidingPane from "react-sliding-pane";
import { DIFFICULTY, CREATE_PROBLEM, GET_PROBLEMS, UPDATE_PROBLEM,SEND_FOR_REVIEW } from '../constants';
import { Link } from 'react-router-dom';
import QuestionTemplate from '../components/questionTemplate';
// import MathType from '@wiris/mathtype-ckeditor5';
// import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
// import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
// import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
// import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';


class CreateProblem extends Component {
    state = {
        validated: false,
        isPaneOpen: false,
        problemTitle: { value: "", errorMsg: "", errorState: null },
        problemStatement: { value: "", errorMsg: "", errorState: null },
        difficultyLevel: "",
        chips: [],
        sampleInput: "",
        sampleOutput: "",
        idealSolution: "",
        inputSpecification: "",
        outputSpecification: "",
        ioExplaination: "",
        timeLimit: 5,
        memoryLimit: 256,
        //        maxCodeSize: 0,
        fileSampleInput: null,
        fileSampleOutput: null,
        fileIdealSolution: null,
        fileInputTestCase: null,
        fileOutputTestCase: null,
        problems: [],
        constraints: "",
        languageId: "54",
        languageTitle: "C++ (GCC 9.2.0)",
        problemActionType: "New",
        id: null
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            validated: true
        })
    }

    handleTextChange = (e) => {
        if (e.target.id == "problemTitle") {
            this.setState({
                [e.target.id]: { ...this.state[e.target.id], value: e.target.value }
            })
        } else {
            this.setState({
                [e.target.id]: e.target.value
            })
        }

        //console.log(this.state.difficultyLevel);
    }

    isDataValid = () => {
        const problemTitle = { ...this.state.problemTitle };
        const problemStatement = { ...this.state.problemStatement };

        if (problemTitle.value == "") {
            problemTitle.errorMsg = "Problem Title can't be blank"
            problemTitle.errorState = false;
        } else {
            problemTitle.errorState = true;
        }
        if (problemStatement.value == "") {
            problemStatement.errorMsg = "Problem Statement can't be blank"
            problemStatement.errorState = false;
        } else {
            problemStatement.errorState = true;
        }
        this.setState({
            problemTitle: problemTitle,
            problemStatement: problemStatement
        })
        return problemTitle.errorState || problemStatement.errorState;
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

        if (e.target.files[0].type !== "text/plain") {
            alert("only text files allowed")
        } else if (e.target.files[0].name !== id + ".txt") {
            alert("file name should be " + id + ".txt")
        }
        else {
            const reader = new FileReader()
            reader.onload = async (e) => {
                const text = (e.target.result)
                console.log(text)
                console.log(id)
                this.setState({
                    [id]: text
                })

            };
            reader.readAsText(e.target.files[0])
        }
    }

    handleEditorChange = (editor, editor_id) => {
        if (editor_id == "problemStatement") {
            this.setState({
                [editor_id]: { ...this.state[editor_id], value: editor.getData() }
            });
        } else {
            this.setState({
                [editor_id]: editor.getData()
            });
        }
    }

    onCreateProblem = () => {
        this.setState({
            problemTitle: { value: "", errorMsg: "", errorState: null },
            problemStatement: { value: "", errorMsg: "", errorState: null },
            difficultyLevel: "",
            chips: [],
            sampleInput: "",
            sampleOutput: "",
            idealSolution: "",
            inputSpecification: "",
            outputSpecification: "",
            ioExplaination: "",
            timeLimit: 5,
            memoryLimit: 256,
            fileSampleInput: null,
            fileSampleOutput: null,
            fileIdealSolution: null,
            fileInputTestCase: null,
            fileOutputTestCase: null,
            constraints: "",
            languageId: "54",
            languageTitle: "C++ (GCC 9.2.0)",
            problemActionType: "New",
            id: null,
            isPaneOpen: true
        })
    }
    submitProblemForReview = (problem) =>{
        var targetUrl = SEND_FOR_REVIEW
        const formData = new FormData()
        formData.append("id",problem.id)
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
                        this.getProblems()
                    }
                    console.log(result);
                },
                (error) => {
                    console.log(error);
                }
            )
    }

    editProblem = (problem) => {
        var tempTags=[]

        problem.tags.forEach(tag => {
            tempTags.push(tag.tagName) 
        });

        console.log(tempTags)
        this.setState({
            problemTitle: { ...this.state.problemTitle, value: problem.problemTitle },
            problemStatement: { ...this.state.problemStatement, value: problem.problemStatement },
            difficultyLevel: problem.difficultyLevel === null ? "" : problem.difficultyLevel,
            fileIdealSolution: problem.fileIdealSolution,
            fileInputTestCase: problem.fileInputTestCase,
            fileOutputTestCase: problem.fileOutputTestCase,
            fileSampleInput: problem.fileSampleInput,
            fileSampleOutput: problem.fileSampleOutput,
            sampleInput: problem.fileSampleInput,
            sampleOutput: problem.fileSampleOutput,
            fileSampleOutput: problem.fileSampleOutput,
            inputSpecification: problem.inputSpecification,
            ioExplanation: problem.ioExplanation,
            // maxCodeSize: problem.maxCodeSize,
            memoryLimit: problem.memoryLimit,
            outputSpecification: problem.outputSpecification,
            timeLimit: problem.timeLimit,
            chips: tempTags,
            constraints: problem.constraints,
            problemActionType: "Edit",
            id: problem.id,
            isPaneOpen: true
        })


    }

    sendDataToDraft = (e) => {
        console.log("clicked")
        e.preventDefault();
        this.setState({
            validated: true
        })
        //document.getElementById('error').textContent = "";

        var targetUrl = CREATE_PROBLEM

        if (this.state.problemActionType == "Edit") {
            targetUrl = UPDATE_PROBLEM
        }
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
            // maxCodeSize,
            constraints,
            languageId } = this.state;

        console.log(chips)
        //  if (true) {


        if (this.isDataValid()) {
            const formData = new FormData()
            if (fileSampleInput) {
                formData.append("fileSampleInput", fileSampleInput[0])
            }
            if (fileSampleOutput) {
                formData.append("fileSampleOutput", fileSampleOutput[0])
            }
            if (fileIdealSolution) {
                formData.append("fileIdealSolution", fileIdealSolution[0])
            }
            if (fileInputTestCase) {
                formData.append("fileInputTestCase", fileInputTestCase[0])
            }
            if (fileOutputTestCase) {
                formData.append("fileOutputTestCase", fileOutputTestCase[0])
            }
            if (this.state.problemActionType == "Edit") {
                formData.append("id", this.state.id)
            }
            formData.append("problemTitle", problemTitle.value)
            formData.append("problemStatement", problemStatement.value)
            formData.append("difficultyLevel", difficultyLevel)
            formData.append("tags", chips)
            formData.append("inputSpecification", inputSpecification)
            formData.append("outputSpecification", outputSpecification)
            formData.append("ioExplaination", ioExplaination)
            formData.append("timeLimit", timeLimit)
            formData.append("memoryLimit", memoryLimit)
            // formData.append("maxCodeSize", maxCodeSize)
            formData.append("constraints", constraints)
            formData.append("idealSolutionLanguageId", languageId)
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
                            this.setState({
                                isPaneOpen: false,
                                problems: []
                            })
                            this.getProblems()
                        }
                        console.log(result);
                    },
                    (error) => {
                        console.log(error);
                    }
                )
        }
    }

    componentWillMount() {
        //document.getElementById('error').textContent = "";
        this.getProblems()
    }

    getProblems = () => {
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

    onlanguageSelected = (e) => {
        var lang = ""
        if (e == "53") {
            lang = "C++ (GCC 8.3.0)"
        } else if (e == "54") {
            lang = "C++ (GCC 9.2.0)"
        } else if (e == "62") {
            lang = "JAVA"
        } else if (e == "70") {
            lang = "Python (2.7.17)"
        } else if (e == "71") {
            lang = "Python (3.8.1)"
        } else if (e == "49") {
            lang = "C (GCC 8.3.0)"
        } else if (e == "50") {
            lang = "C (GCC 9.2.0)"
        }

        this.setState({
            languageId: e,
            languageTitle: lang
        })
    }


    render() {

        const { problems, validated, problemTitle, problemStatement, isPaneOpen, difficultyLevel, chips,
            sampleInput, sampleOutput, inputSpecification, outputSpecification, ioExplaination,
            languageId, languageTitle, constraints, timeLimit, memoryLimit } = this.state

        const question = {
            "problemTitle": problemTitle.value,
            "problemStatement": problemStatement.value,
            "difficultyLevel": difficultyLevel,
            "chips": chips,
            "sampleInput": sampleInput,
            "sampleOutput": sampleOutput,
            "inputSpecification": inputSpecification,
            "outputSpecification": outputSpecification,
            "ioExplaination": ioExplaination,
            "constraints": constraints
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
            <div className="row" style={{ height: "92vh" }}>
                <div className="w-50" >
                    <QuestionTemplate question={question} />
                    {/* <ProblemSection problemTitle={problemTitle} problemStatement={problemStatement} sampleInput={sampleInput} sampleOutput={sampleOutput} inputSpecification={inputSpecification} outputSpecification={outputSpecification} ioExplaination={ioExplaination} /> */}
                </div>
                <div className="w-50">
                    <Button variant="outline-primary" onClick={() => this.onCreateProblem()}>
                        Create a new Problem
                    </Button>
                    <div className="text-left container">
                        <ListGroup style={{ overflow: "scroll", maxHeight: "650px" }}>
                            {problems &&
                                problems.map((problem, index) => {
                                    return (
                                        <ListGroup.Item>
                                            <Row className="d-flex">
                                                <div className="pr-4">
                                                    <p >
                                                        {problem.id}
                                                    </p>
                                                </div>

                                                <div className="flex-grow-1">
                                                    <Link>
                                                        {problem.problemTitle}
                                                    </Link>
                                                </div>
                                                <Badge  pill variant="dark">{problem.problemStatus}</Badge>

                                                <div className="pl-4">
                                                    <Button onClick={(e) => this.editProblem(problems[index])}>
                                                        Edit
                                                    </Button>
                                                </div>
                                                
                                                <div className="pl-4">
                                                    <Button disabled={(problem.problemStatus == "IN_DRAFT") ? null : true} onClick={(e) => this.submitProblemForReview(problems[index])}>
                                                        Submit For Review
                                                    </Button>
                                                </div>
                                            </Row>
                                        </ListGroup.Item>
                                    );
                                })}
                        </ListGroup>
                    </div>
                    <SlidingPane
                        className="some-custom-class"
                        overlayClassName="some-custom-overlay-class"
                        isOpen={isPaneOpen}
                        title="Create Programming question"
                        width="50%"
                        // closeIcon={<GrClose lightingColor="dark"/>}
                        onRequestClose={this.onRequestClose}>
                        <div className="container">
                            <Form noValidate validated={false} >
                                <Form.Group controlId="exampleForm.ControlInput1">
                                    <Form.Label><strong>Problem name</strong></Form.Label>
                                    <Form.Control
                                        value={problemTitle.value}
                                        id="problemTitle"
                                        onChange={this.handleTextChange}
                                        type="text"
                                        placeholder="Enter problem name"
                                        isValid={validated ? problemTitle.errorState : null}
                                        isInvalid={validated ? !problemTitle.errorState : null} />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    <Form.Control.Feedback type="invalid">
                                        {problemTitle.errorMsg}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="exampleForm.ControlTextarea1" required>
                                    <Form.Label><strong>Problem statement</strong></Form.Label>

                                    <CKEditor
                                        editor={ClassicEditor}
                                        data={problemStatement.value}
                                        id="problemStatement"
                                        required
                                        onChange={(event, editor) => this.handleEditorChange(editor, "problemStatement")}
                                    />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    <Form.Control.Feedback type="invalid">
                                        {problemStatement.errorMsg}
                                    </Form.Control.Feedback>
                                </Form.Group>



                                <Form.Group controlId="">
                                    <Form.Label><strong>Input Specification</strong></Form.Label>
                                    <CKEditor
                                        editor={ClassicEditor}
                                        data={inputSpecification}
                                        onChange={(event, editor) => this.handleEditorChange(editor, "inputSpecification")}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Group controlId="">
                                        <Form.Label><strong>Output Specification</strong></Form.Label>
                                        <CKEditor
                                            editor={ClassicEditor}
                                            data={outputSpecification}
                                            onChange={(event, editor) => this.handleEditorChange(editor, "outputSpecification")}
                                        />
                                    </Form.Group>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Group controlId="">
                                        <Form.Label><strong>Constraints</strong></Form.Label>
                                        <CKEditor
                                            editor={ClassicEditor}
                                            data={constraints}
                                            onChange={(event, editor) => this.handleEditorChange(editor, "constraints")}
                                        />
                                    </Form.Group>
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
                                    <Form.Label><strong>Sample Explanation</strong></Form.Label>
                                    <CKEditor
                                        editor={ClassicEditor}
                                        data={ioExplaination}
                                        id="sampleExplanation"
                                        onChange={(event, editor) => this.handleEditorChange(editor, "ioExplaination")}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label><strong>Test cases</strong><br /></Form.Label>
                                    <Form.Row>
                                        <Form.File
                                            required
                                            label="Input File"
                                            accept=".txt"
                                            onChange={(e) => this.showFile(e, "inputTestCase", "fileInputTestCase")}
                                        />
                                        <Form.File
                                            required
                                            label="Output File"
                                            accept=".txt"
                                            onChange={(e) => this.showFile(e, "outputTestCase", "fileOutputTestCase")}
                                        />
                                    </Form.Row>
                                </Form.Group>
                                <Form.Row>
                                    <Form.Group>
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
                                    <Form.Group>
                                        <Form.Label><strong>Solution Language</strong></Form.Label>
                                        <Form.Row>
                                            <DropdownButton activeKey={languageId} as={ButtonGroup} title={languageTitle} variant="outline-secondary" size="sm" onSelect={(e) => this.onlanguageSelected(e)}>
                                                <Dropdown.Item eventKey="53">C++ (GCC 8.3.0)</Dropdown.Item>
                                                <Dropdown.Item eventKey="54">C++ (GCC 9.2.0)</Dropdown.Item>
                                                <Dropdown.Item eventKey="62">JAVA</Dropdown.Item>
                                                <Dropdown.Item eventKey="70">Python (2.7.17)</Dropdown.Item>
                                                <Dropdown.Item eventKey="71">Python (3.8.1)</Dropdown.Item>
                                                <Dropdown.Item eventKey="49">C (GCC 8.3.0)</Dropdown.Item>
                                                <Dropdown.Item eventKey="50">C (GCC 9.2.0)</Dropdown.Item>
                                            </DropdownButton>

                                        </Form.Row>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Group>


                                    <Form.Group>
                                        <strong>Difficulty level</strong><br />
                                        <Form.Check id="difficultyLevel" inline label="Easy" type="radio" value={DIFFICULTY.easy} onChange={this.handleTextChange} />
                                        <Form.Check id="difficultyLevel" inline label="Medium" type="radio" value={DIFFICULTY.medium} onChange={this.handleTextChange} />
                                        <Form.Check id="difficultyLevel" inline label="Hard" type="radio" value={DIFFICULTY.hard} onChange={this.handleTextChange} />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label><strong>Tags</strong></Form.Label>
                                        <MyChip chips={chips} handleChipsChange={this.handleChipsChange} />
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
                                                <Form.Control id="timeLimit" placeholder="" value={timeLimit} required onChange={this.handleTextChange} />
                                            </Col>
                                            <Col>
                                                <Form.Label>Memory limit (MB)</Form.Label>
                                                <Form.Control id="memoryLimit" placeholder="" value={memoryLimit} required onChange={this.handleTextChange} />
                                            </Col>
                                            {/* <Col>
                                                <Form.Label>Maximum size code (KB)</Form.Label>
                                                <Form.Control id="maxCodeSize" placeholder="" value={this.state.maxCodeSize} required onChange={this.handleTextChange} />
                                            </Col> */}
                                        </Form.Row>
                                    </Form.Group>
                                </Form.Group>
                                <Button onClick={this.sendDataToDraft}>Save To Draft</Button>
                            </Form>
                        </div>
                    </SlidingPane>
                </div>

            </div>
        )
    }
}

export default CreateProblem
