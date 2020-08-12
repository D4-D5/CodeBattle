import React from 'react'
import QuestionTemplate from './questionTemplate';
import { Tabs, Tab } from 'react-bootstrap';

function ContestProblemsTemplate({ questions }) {

    return (
        <div className="text-dark">
            <Tabs defaultActiveKey="ProblemA" id="uncontrolled-tab-example">
                <Tab eventKey="ProblemA" title="Problem A"><QuestionTemplate question={questions[0]} /></Tab>
                <Tab eventKey="ProblemB" title="Problem B"><QuestionTemplate question={questions[1]} /></Tab>
                <Tab eventKey="ProblemC" title="Problem C"><QuestionTemplate question={questions[2]} /></Tab>
            </Tabs>

        </div>
    )
}

export default ContestProblemsTemplate;
