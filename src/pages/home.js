import React, { Component } from "react";
import Button from 'react-bootstrap/Button'
import Card from "react-bootstrap/Card";
import { withRouter } from 'react-router-dom';
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import XXX from '../assets/xxx.jpg';

import HomeCard from '../components/homeCard';

const { v4: uuidv4 } = require('uuid');


class Home extends Component {
    // s = {
    //     header:"",
    //     title:"",
    //     content:"",
    //     img:"",
    //     btnState:""
    // }
    routeChange = () => {
        let path = "\lobby";
        var roomID = "/" + uuidv4();
        this.props.history.push(path + roomID);
    }

    componentWillMount() {
        localStorage.getItem('loggedIn') == 'false' && this.props.history.push('/login');
    }

    render() {

        return (
            <div className=" row bg-dark d-flex align-items-center justify-content-around" style={{height:"92vh"}}>
                {/* <div className="bg-info d-flex justify-content-around container"> */}
                    <HomeCard  routeChange={this.routeChange} header={"You vs Friend (Unrated)"} title={"PRACTICE WITH FRIENDS"} content={"Thgis is content"} img={XXX} btnState={""} />
                    <HomeCard  routeChange={this.routeChange} header={"You vs Friend (Rated)"} title={"COMPETE WITH FRIENDS"} content={"Thgis is content"} img={XXX} btnState={"true"} />
                    <HomeCard  routeChange={this.routeChange} header={"You vs Others (Unrated)"} title={"PRACTICE WITH OTHERS"} content={"Thgis is content"} img={XXX} btnState={"true"} />
                    <HomeCard  routeChange={this.routeChange} header={"You vs Others (Rated)"} title={"COMPETE WITH OTHERS"} content={"Thgis is content"} img={XXX} btnState={"true"} />
                {/* </div> */}
            </div>
        )
    }
}

export default withRouter(Home);