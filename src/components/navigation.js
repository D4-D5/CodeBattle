import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav } from 'react-bootstrap';
import '../css/nav.css'
import Signup from './signup';
import Login from './login';
import { ReactComponent as SignUpIcon } from '../assets/images/signUpIcon.svg'
import { ReactComponent as LoginIcon } from '../assets/images/loginIcon.svg'
import { Link } from 'react-router-dom';
// import SlidingPane from "react-sliding-pane";


function Navigation({bgColor}) {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showSidePane, setShowSidePane] = useState(false);

  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);
  const handleCloseSignup = () => setShowSignup(false);
  const handleShowSignup = () => setShowSignup(true);
  const handleShowSidePane =() => setShowSidePane(true);
  const handleCloseSidePane = () => setShowSidePane(false);

  return (
    <div className="navbar">
      <Navbar bg={bgColor} variant="dark" expand="lg" fixed="top">
        <div class="container">
          <Navbar.Brand><Link to="/home" style={{ color: 'inherit', textDecoration: 'none' }} onClick={handleShowSidePane}>CodeBattle</Link></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link id="nav_btn" onClick={handleShowSignup}>
                <SignUpIcon /> Sign up</Nav.Link>
              <Signup showSignup={showSignup} handleCloseSignup={handleCloseSignup} handleShowLogin={handleShowLogin} />
              <Nav.Link onClick={handleShowLogin}>
                <LoginIcon /> Login </Nav.Link>
              <Login showLogin={showLogin} handleCloseLogin={handleCloseLogin} handleShowSignup={handleShowSignup} />
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
      {/* <SlidingPane
       style={{ position: 'absolute', zIndex: "4" }}
        className="navbarSlidePane"
        overlayClassName="some-custom-overlay-class"
        isOpen={showSidePane}
        width="300px"
        onRequestClose={handleCloseSidePane}
        from="left">
          
      </SlidingPane> */}
    </div>
  );
}

export default Navigation;
