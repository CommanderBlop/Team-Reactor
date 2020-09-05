import React from 'react'
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap'
import { useHistory, Link } from "react-router-dom";
// import {  } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';


function NavBar() {
    let history = useHistory()
    return (
        <>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand as={Link} to="/">
                    Reactors
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to="/rec">Daily Rec</Nav.Link>
                        <Nav.Link as={Link} to="/community">Community</Nav.Link>
                        <Nav.Link as={Link} to="/friends">Friends</Nav.Link>
                        <Nav.Link as={Link} to="/myCollection">My Collection</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link as={Link} to="/login">Log in</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    )
}

export default NavBar