import React, { Component } from 'react'
import '../css/leaderBoard.css';
import {Table} from 'react-bootstrap';





class LeaderboardTemplate extends Component {

    

    

    render() {
        //const {contestants} = this.state
        const {contestants} = this.props
        return (
            <div class="leaderBoard">
                <Table striped hover responsive="lg">
                    <tr className="tableHead">
                        <td>#</td>
                        <td>Rating</td>
                        <td>Username</td>
                        <td>Penalty</td>
                        <td>A</td>
                        <td>B</td>
                        <td>C</td>
                    </tr>
                    <tbody className="tableBody">
                        {contestants &&
                        contestants.map((contestant, index) => {
                            return (
                                <tr>
                                <td>{contestant.rank}</td>
                                <td>{contestant.rating}</td>
                                <td>{contestant.codeBattleId}</td>
                                <td>{contestant.penalty}</td>
                                <td>{contestant.solvedQuestions}</td>
                                <td>{contestant.penalty}</td>
                                <td>{contestant.penalty}</td>
                                </tr>
                            );  
                        })}
                    {/* <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr> */}
                </tbody>
                </Table>
                {/* <ListGroup style={{ overflow: "scroll", height: "600px", maxHeight: "600px" }}>
                    {contestants &&
                        contestants.map((contestant, index) => {
                            return (
                                <ListGroup.Item>
                                    {contestant.codeBattleId+"   "+contestant.numSolved}
                                </ListGroup.Item>
                            );  
                        })}
                </ListGroup> */}

            </div>
        );
    }
}

export default LeaderboardTemplate;
