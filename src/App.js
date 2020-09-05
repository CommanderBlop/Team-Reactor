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

function App() {
  return (
    <div className="App">
      <Router>
      <div>
        <Switch>
          <Route path="/">
            <h1>Home Page: Team Recator</h1>
          </Route>
        </Switch>
      </div>
    </Router>
    </div>
  );
}

export default App;
