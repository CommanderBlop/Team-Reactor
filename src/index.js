import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

//test
import ChatBox from './Chat/Chatbox';
import Chatbox from './Chat/Chatbox';

ReactDOM.render(
	<React.StrictMode>
		<App />
		<Chatbox />
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
