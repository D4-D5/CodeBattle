import React from 'react'
import { Card } from 'react-bootstrap';


function createMarkup(problemStatement) {
    return { __html: problemStatement };
}

function QuestionTemplate({ question }) {
    return (
        <div>
            <Card>
                
                <Card.Body>

                    <div className="text-left">
                        <div className="text-center"><strong>{question.problemTitle}</strong></div>
                        <div dangerouslySetInnerHTML={createMarkup(question.problemStatement)} className="" />
                        <div className="">
                            <strong>Input</strong>
                            <div dangerouslySetInnerHTML={createMarkup(question.inputSpecification)} />
                        </div>
                        <div className="">
                            <strong>Output</strong>
                            <div dangerouslySetInnerHTML={createMarkup(question.outputSpecification)} />
                        </div>
                        <div className="">
                            <strong className="">Examples</strong>
                            <Card className="">
                                <Card.Header className="">input</Card.Header>
                                <Card.Body>
                                    {question.sampleInput}
                                </Card.Body>
                            </Card>
                            <Card>
                                <Card.Header className="">output</Card.Header>
                                <Card.Body>
                                    {question.sampleOutput}
                                </Card.Body>
                            </Card>
                        </div>
                        <div className="">
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
