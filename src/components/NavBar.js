import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Container } from 'react-bootstrap';

const NavBar = () => {
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand><Link to="/home" style={{ color: 'inherit', textDecoration: 'none' }}>CodeBattle</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link>
                            <Link to="/login" style={{ color: 'inherit', textDecoration: 'none' }}>Sign In</Link></Nav.Link>
                        <Nav.Link>
                            <Link to="/sign-up" style={{ color: 'inherit', textDecoration: 'none' }}>Sign Up</Link></Nav.Link>
                    </Nav>
                </Navbar.Collapse>

            </Container>
        </Navbar>
    )
}

export default NavBar;