import React from 'react'
import { Card } from 'react-bootstrap';
import '../css/questionTemplate.css';


function createMarkup(problemStatement) {
    return { __html: problemStatement };
}

function QuestionTemplate({ question }) {
    
    return (
        <div className="questionTemplate">
            <Card>
                
                <Card.Body>

                    <div className="text-left">
                        <div className="text-center mb-2"><strong>{question.problemTitle}</strong></div>
                        <div dangerouslySetInnerHTML={createMarkup(question.problemStatement)} className="" />
                        <div className="my-2">
                            <strong>Input</strong>
                            <div dangerouslySetInnerHTML={createMarkup(question.inputSpecification)} />
                        </div>
                        <div className="my-2">
                            <strong>Output</strong>
                            <div dangerouslySetInnerHTML={createMarkup(question.outputSpecification)} />
                        </div>
                        <div className="my-2">
                            <strong className="">Examples</strong>
                            <Card className="my-3">
                                <Card.Header className="">Input</Card.Header>
                                <Card.Body className="nextLineProperty" style={{"white-space":"pre-wrap"}} dangerouslySetInnerHTML={createMarkup(question.fileSampleInput)}>
                                    
                                </Card.Body>
                            </Card>
                            <Card className="my-3">
                                <Card.Header className="">Output</Card.Header>
                                <Card.Body className="nextLineProperty" style={{"white-space":"pre-wrap"}} dangerouslySetInnerHTML={createMarkup(question.fileSampleOutput)}>
                                    
                                </Card.Body>
                            </Card>
                        </div>
                        <div className="my-2">
                            <strong>Explaination</strong>
                            <div dangerouslySetInnerHTML={createMarkup(question.ioExplaination)} />
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
}

export default QuestionTemplate;