import React, {useState, useEffect, useContext} from 'react'
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import FirebaseContext from './Firebase';
import NavBar from './NavBar'
import Home from './community-posts/home'
import MovieCollection from "./MovieCollection/MovieCollection"
import Login from "./Authentication/login"
import Register from './Authentication/Register'
import Populator from './populateFirebase'
import AddMovie from './MovieCollection/addMovie'


function App() {
  // const firebase = useContext(FirebaseContext)
  //   firebase.db.collection("movieTester").doc("testUser").set({
  //       movieID: ['tt4566758','tt6723592','tt8946378']
  //   })
  //     .then(function() {
  //     console.log("Document successfully written!");
  //   })
  //     .catch(function(error) {
  //         console.error("Error writing document: ", error);
  //   });
    
  return (
    <div className="App">
      <Router>
          <NavBar />
          <Switch>

            <Route path="/myCollection">
              <MovieCollection />
            </Route>

            <Route path="/friends"></Route>

            <Route path="/rec"></Route>

            <Route path="/community">
              <Home />
            </Route>

            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register/>
            </Route>

            <Route path="/addMovie">
              <AddMovie/>
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
