import React,{useState} from 'react'
import QuestionTemplate from './questionTemplate';
import { Tabs, Tab } from 'react-bootstrap';

function ContestProblemsTemplate({ questions }) {
    const [key,setKey] = useState(questions[0].id)

    function onProblemSelected(e){
        setKey(e)
        localStorage.setItem("currentQuestionId",e)    
        
    }
    
    return (
        <div className="text-dark">
            <Tabs activeKey={key} id="uncontrolled-tab-example" onSelect={(e) => onProblemSelected(e)}>
                <Tab eventKey={questions[0].id} title="Problem A"><QuestionTemplate question={questions[0]} /></Tab>
                <Tab eventKey={questions[1].id} title="Problem B"><QuestionTemplate question={questions[1]} /></Tab>
                <Tab eventKey={questions[2].id} title="Problem C"><QuestionTemplate question={questions[2]} /></Tab>
            </Tabs>

        </div>
    )
}

export default ContestProblemsTemplate;
