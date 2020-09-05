import React from 'react';
import logo from './logo.svg';
import './App.css';
//test codes
import CommunitiesMain from './Communities/MainCommunityPage';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import FirebaseContext from './Firebase';

function App() {
	return (
		<div className='App'>
			<CommunitiesMain />
		</div>
	);
}

export default App;
