import React,{useState} from 'react'
import { Card, Tabs, Tab } from 'react-bootstrap'

function createMarkup(problemStatement) {
    return {__html: problemStatement};
  }

function ProblemSection({problemTitle,problemStatement}) {
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
                    <div>
                            <div><strong>{problemTitle}</strong></div>
                            <div dangerouslySetInnerHTML={createMarkup(problemStatement)}>
                                    {/* <p></p> */}
                            </div>
                            <div>
                                <strong>Input</strong>
                                <div>
                                <p>{state.inputSpecification}</p>
                                </div>
                            </div>
                            <div>
                                <strong>Output</strong>
                                <div>
                                <p>{state.inputSpecification}</p>
                                </div>
                            </div>
                            <div>
                                <strong>Examples</strong>
                                <Card>
                                    <Card.Header>input</Card.Header>
                                    <Card.Body>
                                    6 10 7 1 9 10 15
                                    </Card.Body>
                                </Card>
                                <Card>
                                    <Card.Header>output</Card.Header>
                                    <Card.Body>
                                    6 10 7 1 9 10 15
                                    </Card.Body>
                                </Card>
                            </div>
                            <div>
                            <strong>Explaination</strong>
                                <div>
                                <p>
                                    {state.ioExplaination}
                                </p>
                                </div>
                            </div>
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
}

export default ProblemSection;