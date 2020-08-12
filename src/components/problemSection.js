import React, { useState } from 'react'
import { Card, Tabs, Tab, Button } from 'react-bootstrap'
import QuestionTemplate from './questionTemplate';
import LeaderboardTemplate from './leaderboardTemplate';
import ContestProblemsTemplate from './contestProblemsTemplate';





function ProblemSection({ questions }) {
  
    return (
        <div className="w-50 ">
            <Card className="problemSection">
                <Card.Header>
                    <Tabs defaultActiveKey="Problem" id="uncontrolled-tab-example">
                        <Tab eventKey="Problem" title="Problem">
                        </Tab>
                    </Tabs>
                </Card.Header>
                <Card.Body>
                    <div className="text-left">
                            <div className="text-center"><strong>{problemTitle}</strong></div>
                            <div dangerouslySetInnerHTML={createMarkup(problemStatement)} className=""/>
                            <div className = "">
                                <strong>Input</strong>
                                <div dangerouslySetInnerHTML={createMarkup(inputSpecification)}/>
                            </div>
                            <div className = "">
                                <strong>Output</strong>
                                <div dangerouslySetInnerHTML={createMarkup(outputSpecification)}/>
                            </div>
                            <div className = "">
                                <strong className="">Examples</strong>
                                <Card className="">
                                    <Card.Header className="">Input</Card.Header>
                                    <Card.Body>
                                    {sampleInput}
                                    </Card.Body>
                                </Card>
                                <Card>
                                    <Card.Header className="">Output</Card.Header>
                                    <Card.Body>
                                        {/* <Button>Hello</Button> */}
                                    {sampleOutput}
                                    </Card.Body>
                                </Card>
                            </div>
                            <div className = ""> 
                            <strong>Explaination</strong>
                            <div dangerouslySetInnerHTML={createMarkup(ioExplaination)}/>
                            </div>
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
}
export default ProblemSection;