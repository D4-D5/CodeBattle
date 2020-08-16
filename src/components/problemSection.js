import React, { useState, Component } from 'react'
import { Card, Tabs, Tab, Button } from 'react-bootstrap'
import QuestionTemplate from './questionTemplate';
import LeaderboardTemplate from './leaderboardTemplate';
import ContestProblemsTemplate from './contestProblemsTemplate';
import { GET_LEADERBOARD } from '../constants';
import '../css/problemSection.css'



class ProblemSection extends Component {

    state = {
        key:"Problems",
        contestants:[]
    }

    onTabSelected = (e)=>{
        this.setState({
            key:e
        })

        if(e=="Leaderboard"){
            var targetUrl = GET_LEADERBOARD

        var data = new FormData()
        data.append("roomId",localStorage.getItem("roomId"))
        const requestOptions = {
            method: 'POST',
            headers: {
                //'Content-Type': "application/json; charset=utf-8",
                'Access-Control-Allow-Origin': '*',
                'Authorization': localStorage.getItem("tokenKey")
            },
            body: data

        };


        fetch(targetUrl, requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    this.setState({
                        contestants:result.message
                    })
                },
                (error) => {
                    console.log(error);
                }
            )
        }
    }

    render() {
        const {questions} = this.props
        const {key,contestants} = this.state
        return (
            <div className="problemSection">
                <Tabs activeKey={key} id="uncontrolled-tab-example" onSelect={(e) => this.onTabSelected(e)}>
                    <Tab eventKey="Problems" title="Problems"><ContestProblemsTemplate questions={questions} /></Tab>
                    <Tab eventKey="Leaderboard" title="Leaderboard"><LeaderboardTemplate contestants={contestants}/></Tab>
                    {/* <Tab eventKey="Submissions" title="Submissions"><SubmissionsTemplate/></Tab>
                <Tab eventKey="Discussions" title="Discussions"><DiscussionsTemplate/></Tab> */}

                </Tabs>
            </div>
        );
    }
}
export default ProblemSection;

// function ProblemSection({ questions }) {
  
//     return (
//         <div className="w-50 ">
//             <Card className="problemSection">
//                 <Card.Header>
//                     <Tabs defaultActiveKey="Problem" id="uncontrolled-tab-example">
//                         <Tab eventKey="Problem" title="Problem">
//                         </Tab>
//                     </Tabs>
//                 </Card.Header>
//                 <Card.Body>
//                     <div className="text-left">
//                             <div className="text-center"><strong>{problemTitle}</strong></div>
//                             <div dangerouslySetInnerHTML={createMarkup(problemStatement)} className=""/>
//                             <div className = "">
//                                 <strong>Input</strong>
//                                 <div dangerouslySetInnerHTML={createMarkup(inputSpecification)}/>
//                             </div>
//                             <div className = "">
//                                 <strong>Output</strong>
//                                 <div dangerouslySetInnerHTML={createMarkup(outputSpecification)}/>
//                             </div>
//                             <div className = "">
//                                 <strong className="">Examples</strong>
//                                 <Card className="">
//                                     <Card.Header className="">Input</Card.Header>
//                                     <Card.Body>
//                                     {sampleInput}
//                                     </Card.Body>
//                                 </Card>
//                                 <Card>
//                                     <Card.Header className="">Output</Card.Header>
//                                     <Card.Body>
//                                         {/* <Button>Hello</Button> */}
//                                     {sampleOutput}
//                                     </Card.Body>
//                                 </Card>
//                             </div>
//                             <div className = ""> 
//                             <strong>Explaination</strong>
//                             <div dangerouslySetInnerHTML={createMarkup(ioExplaination)}/>
//                             </div>
//                     </div>
//                 </Card.Body>
//             </Card>
//         </div>
//     )
// }
// export default ProblemSection;