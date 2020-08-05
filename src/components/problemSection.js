import React,{useState} from 'react'
import { Card, Tabs, Tab, Button } from 'react-bootstrap'

function createMarkup(problemStatement) {
    return {__html: problemStatement};
  }

function ProblemSection({problemTitle,problemStatement,sampleInput,sampleOutput,inputSpecification,outputSpecification,ioExplaination}) {
    const [state,setState] = useState(
        {
            problemTitle:"sdbjchb sj",
            problemStatement:"Tanya wants to go on a journey across the cities of Berland. There are nn cities situated along the main railroad line of Berland, and these cities are numbered from 11 to nn",
            inputSpecification:"he first line contains one integer n (1≤n≤2⋅105) — the number of cities in Berland.",
            outputSpecification:"Specificatio",
            ioExplaination:"The optimal journey plan in the first example is c=[2,4,5]."
        }
    );
    return (
        <div className="w-50">
            <Card>
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
                                    <Card.Header className="">input</Card.Header>
                                    <Card.Body>
                                    {sampleInput}
                                    </Card.Body>
                                </Card>
                                <Card>
                                    <Card.Header className="">output</Card.Header>
                                    <Card.Body>
                                        <Button>Hello</Button>
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