import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link, withRouter } from "react-router-dom";

import NavBar from './components/NavBar'
import Login from "./pages/login";
import SignUp from "./pages/signup";
import Home from './pages/home';
import Lobby from './pages/lobby';
import Editor from './pages/editor';
import CreateProblem from './pages/createProblem';


export class App extends React.Component {


  render() {
    return (
      <div className="App">
        <NavBar />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/sign-up" component={SignUp} />
          <Route path="/home" component={Home} />
          <Route exact path="/lobby/:room_id" component={Lobby} />
          <Route exact path="/editor" component={Editor} />
          <Route exact path="/createProblem" component={CreateProblem} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);