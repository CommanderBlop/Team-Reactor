import React, {useState, useEffect, useContext} from 'react'
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

import FirebaseContext from './Firebase';
import NavBar from './NavBar'
import Home from './community-posts/home'
import MovieCollection from "./MovieCollection/MovieCollection"
import Login from "./Authentication/login"
import Register from './Authentication/Register'
import Friends from './Friends'
import Post from './Post'
import ShowPost from './ShowPost/ShowPost'
import AddMovie from './MovieCollection/addMovie'
import MovieFinder from './MovieCollection/addMovie';
import DailyRec from './DailyRec'


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

            <Route path="/showPost">
              <ShowPost/>
            </Route>
            <Route path="/post">
              <Post/>
            </Route>

            <Route path="/MovieCollection">
              <MovieCollection />
            </Route>

            <Route path="/friends">
              <Friends/>
            </Route>

            <Route path="/DailyRec">
              <DailyRec userGenre = "Family" />
            </Route>


            <Route path="/community">
              <Home id="text-main"/>
            </Route>

            <Route path="/login">
              <Login />
            </Route>
                <Route path="/register">

              <Register/>
            </Route>

            <Route path="/addMovie">
              <MovieFinder/>
            </Route>


            <Route path="/">
              <h1>Home Page: Team Reactor</h1>
              <DailyRec userGenre = "Family"/>
            </Route>

          </Switch>
      </Router>
    </div>
  );
}

export default App;
