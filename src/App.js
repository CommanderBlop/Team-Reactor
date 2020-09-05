import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

import FirebaseContext from './Firebase';
import NavBar from './NavBar'
import Home from './community-posts/home'
import MovieCollection from "./MovieCollection"
import Login from "./Authentication/login"
import Register from './Authentication/Register'
import Friends from './Friends'


function App() {
  return (
    <div className="App">
      <Router>
          <NavBar />
          <Switch>


            <Route path="/myCollection">
              <MovieCollection />
            </Route>

            <Route path="/friends">
              <Friends/>
            </Route>

            <Route path="/rec"></Route>

            <Route path="/community">
              <Home id="text-main"/>
            </Route>

            <Route path="/login">
              <Login />
            </Route>
                <Route path="/register">
              <Register/>
            </Route>


            <Route path="/">
              <h1>Home Page: Team Recator</h1>
            </Route>

          </Switch>
      </Router>
    </div>
  );
}

export default App;
