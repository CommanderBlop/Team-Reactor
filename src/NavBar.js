import React, { useContext, useState } from 'react'
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap'
import { useHistory, Link } from "react-router-dom";
import FirebaseContext from './Firebase'
// import {  } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';


function NavBar() {
    let history = useHistory()
    let firebase = useContext(FirebaseContext)
    // console.log(firebase.auth.currentUser)
    const [user, setUser] = useState(null)

    firebase.auth.onAuthStateChanged(user => {
        if (user) {
            setUser(user);
        } else {
            setUser(null)
        }
    });

    return (
        <>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand as={Link} to="/">
                    Reactors
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to="/DailyRec">Daily Rec</Nav.Link>
                        <Nav.Link as={Link} to="/community">Community</Nav.Link>
                        <Nav.Link as={Link} to="/friends">Friends</Nav.Link>
                        <Nav.Link as={Link} to="/MovieCollection">My Collection</Nav.Link>
                        <Nav.Link as={Link} to="/post">Post</Nav.Link>
                        <Nav.Link as={Link} to="/showPost">View Posts</Nav.Link>
                    </Nav>
                    <Nav>
                        {user ? 
                        <NavDropdown title={user.displayName}>
                            <NavDropdown.Item as={Link} to="/login">Switch account</NavDropdown.Item>
                        </NavDropdown>
                         : <Nav.Link as={Link} to="/login">Log in</Nav.Link>}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    )
}

export default NavBar