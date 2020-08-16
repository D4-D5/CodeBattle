import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, withRouter } from "react-router-dom";

import Login from "./login";
import SignUp from "./signup";
import Lobby from './lobby';
import Editor from './editor';
import CreateProblem from './createProblem';
import ContestEnded from './contestEnded';

import Error from './error';


class MainPages extends Component {


  render() {
    return (
      <div>
        
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/sign-up" component={SignUp} />
          <Route exact path="/lobby/:room_id" component={Lobby} />
          <Route exact path="/editor/:room_id" component={Editor} />
          <Route exact path="/createProblem" component={CreateProblem} />
          <Route exact path="/contestEnded" component={ContestEnded} />
          <Route component={Error} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(MainPages);