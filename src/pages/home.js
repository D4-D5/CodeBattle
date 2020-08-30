import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import '../css/home.css'
import HomeCards from "../components/homeCards";
import HomeHeader from "../components/homeHeader";
import Navigation from "../components/navigation";

const { v4: uuidv4 } = require('uuid');


class Home extends Component {

    routeChange = () => {
        let path = "\lobby";
        var roomID = "/" + uuidv4();
        this.props.history.push(path + roomID);
    }

    componentWillMount() {
        //localStorage.getItem('loggedIn') == 'false' && this.props.history.push('/login');
    }

    render() {

        return (
            <div>
                <div className='landing_page'>
                    <Navigation bgColor={"none"}/>
                    <HomeHeader />
                    <HomeCards />
                </div>
            </div>
        )
    }
}

export default Home;