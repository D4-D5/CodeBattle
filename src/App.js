import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, withRouter } from "react-router-dom";
import './App.css'
import Home from './pages/home';
import mainPages from './pages/mainPages';


export class App extends React.Component {


  render() {
    return (
      <div className="App">
        {/* <NavBar/> */}
        <Switch>
          <Route exact path='/home' component={Home} />

          <Route exact path='/' component={Home} />
          {/* <Route path="/login" component={Login} /> */}
          {/* <Route path="/sign-up" component={SignUp} /> */}
          {/* <Route path="/home" component={Home} /> */}
          {/* <Route exact path="/lobby/:room_id" component={Lobby} />
          <Route exact path="/editor" component={Editor} />
          <Route exact path="/createProblem" component={CreateProblem} />
          <Route path='/' component={Home} /> */}
          <Route path='/' component={mainPages} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);