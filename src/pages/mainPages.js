import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, withRouter } from "react-router-dom";

import Login from "./login";
import SignUp from "./signup";
import Lobby from './lobby';
import Editor from './editor';
import CreateProblem from './createProblem';
import NavBar from '../components/navBar';
import Error from './error';


class MainPages extends Component {


  render() {
    return (
      <div>
        <NavBar />
        <Switch>

          <Route exact path="/login" component={Login} />
          <Route exact path="/sign-up" component={SignUp} />
          <Route exact path="/lobby/:room_id" component={Lobby} />
          <Route exact path="/editor" component={Editor} />
          <Route exact path="/createProblem" component={CreateProblem} />
          <Route component={Error} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(MainPages);