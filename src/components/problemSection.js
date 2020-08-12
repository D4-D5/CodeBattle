import React, { useState, Component } from 'react'
import { Card, Tabs, Tab, Button } from 'react-bootstrap'
import QuestionTemplate from './questionTemplate';
import LeaderboardTemplate from './leaderboardTemplate';
import ContestProblemsTemplate from './contestProblemsTemplate';
import { GET_LEADERBOARD } from '../constants';



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
            <div>
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