import React, { Component } from 'react'


import { ListGroup } from 'react-bootstrap';
class LeaderboardTemplate extends Component {

    

    

    render() {
        //const {contestants} = this.state
        const {contestants} = this.props
        return (
            <div>
                <ListGroup style={{ overflow: "scroll", height: "600px", maxHeight: "600px" }}>
                    {contestants &&
                        contestants.map((contestant, index) => {
                            return (
                                <ListGroup.Item>
                                    {contestant.codeBattleId+"   "+contestant.numSolved}
                                </ListGroup.Item>
                            );  
                        })}
                </ListGroup>

            </div>
        );
    }
}

export default LeaderboardTemplate;
