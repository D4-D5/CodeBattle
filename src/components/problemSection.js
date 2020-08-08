import React, { useState } from 'react'
import { Card, Tabs, Tab, Button } from 'react-bootstrap'
import QuestionTemplate from './questionTemplate';
import LeaderboardTemplate from './leaderboardTemplate';
import ContestProblemsTemplate from './contestProblemsTemplate';





function ProblemSection({ questions }) {
  
    return (
        <div>
            <Tabs defaultActiveKey="Problems" id="uncontrolled-tab-example">
                <Tab eventKey="Problems" title="Problems"><ContestProblemsTemplate questions={questions}/></Tab>
                <Tab eventKey="Leaderboard" title="Leaderboard"><LeaderboardTemplate/></Tab>
                {/* <Tab eventKey="Submissions" title="Submissions"><SubmissionsTemplate/></Tab>
                <Tab eventKey="Discussions" title="Discussions"><DiscussionsTemplate/></Tab> */}
                
            </Tabs>
        </div>
    )
}
export default ProblemSection;