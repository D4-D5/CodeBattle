import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, withRouter } from "react-router-dom";
import './App.css'
import Home from './pages/home';
import firebase from "./firebase.js"
import mainPages from './pages/mainPages';


export class App extends React.Component {

  async componentDidMount() {
    const messaging = firebase.messaging();
    // messaging.requestPermission().then(()=>{
    //     return messaging.getToken()
    // }).then(token=>{
    //   console.log("FCM",token)
    // }).catch((err)=>{
    //   console.log("FCM",err)
    // })
    messaging.onMessage((payload) => {
      console.log('FCM. ', payload);
  
  });

  messaging.onTokenRefresh(() => {
    messaging.getToken().then((refreshedToken) => {
        console.log('FCM.', refreshedToken);
        
    }).catch((err) => {
        console.log('Unable to retrieve refreshed token ', err);
    });
});
    var INSTANCE_TOKEN = "INSTANCE_TOKEN"
    let permissionGranted = false;
        try {
            /* request permission if not granted */
            if(Notification.permission !== 'granted') {
                await messaging.requestPermission(); 
            }
            /* get instance token if not available */
            if(localStorage.getItem(INSTANCE_TOKEN) !== null) {
                permissionGranted = true;
            } else {
                const token = await messaging.getToken(); // returns the same token on every invocation until refreshed by browser
                //await this.sendTokenToDb(token); 
                console.log("currentToken", token)
                localStorage.setItem(INSTANCE_TOKEN, token);
                permissionGranted = true;            
            }       
        } catch(err) {
            console.log(err);
            if(err.hasOwnProperty('code') && err.code === 'messaging/permission-default') this.displayMessage(<span>You need to allow the site to send notifications</span>);
            else if(err.hasOwnProperty('code') && err.code === 'messaging/permission-blocked') this.displayMessage(<span>Currently, the site is blocked from sending notifications. Please unblock the same in your browser settings.</span>);
            else this.displayMessage(<span>Unable to subscribe you to notifications</span>);
        } finally {
            return permissionGranted;
        }
  }

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