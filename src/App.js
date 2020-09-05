import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"
import FirebaseContext from './Firebase'
import NavBar from './NavBar'

function App() {
  return (
    <div className="App">
      <Router>
          <NavBar />
          <Switch>
            <Route path="/">
              <h1>Home Page: Team Recator</h1>
            </Route>
          </Switch>
      </Router>
    </div>
  );
}

export default App;
