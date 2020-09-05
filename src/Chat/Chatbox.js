import React, { useContext, useEffect, useState } from 'react';
import FirebaseContext from '../Firebase';
import Title from './ChatBoxComponent/Title';
import Cell from './ChatBoxComponent/Cell';
import TextBox from './ChatBoxComponent/TextBox';
import ChatBar from './ChatBoxComponent/ChatBar';
import { Scrollbars } from 'react-custom-scrollbars';

var arrayMessages = [];
function Chatbox() {
	const [chatID, setChatID] = useState('T5O5rvqkXjOTTNzgClyK');
	const [chats, setChats] = useState(['']);
	const [isLoading, setIsLoading] = useState(true);
	const [numMessage, setNumMessage] = useState(0);
	const [allMessages, setAllMessages] = useState({});
	const [currentUserID, setCurrentUsersID] = useState(
		'5gd1zjFxT8a49wVFXIER3LkKfck2'
	); //change her to link it to the rest of the app
	const [userName, setCurrentUser] = useState('');
	const [currentFriends, setCurrentFriends] = useState(['']);

	const firebase = useContext(FirebaseContext);
	const chatMessages = firebase.db.collection('messages').doc(chatID);

	function getData(userID) {
		const usersData = firebase.db.collection('user').doc(userID);
		usersData
			.get()
			.then(function (doc) {
				if (doc.exists) {
					console.log('Data exits:', doc.data());
					return [doc.data().name, doc.data().friends];
				} else {
					// doc.data() will be undefined in this case
					console.log('No such document!');
					return ['undefined', 'undefined'];
				}
			})
			.catch(function (error) {
				console.log('Error getting document:', error);
			});
	}

	useEffect(() => {
		const userData = getData(currentUserID);
		console.log(userData);
		setCurrentUser(userData[0]);
		const friendID = userData[1];
		setCurrentFriends(friendID.map((item) => getData(item)[0]));

		chatMessages.onSnapshot(
			function (doc) {
				if (doc.exists) {
					setAllMessages(doc.data());
					arrayMessages = Object.values(doc.data()).sort((a, b) =>
						a[0] > b[0] ? 1 : -1
					);
					setIsLoading(false);
					setNumMessage(arrayMessages.length);
				} else {
					// doc.data() will be undefined in this case
					console.log('No such document!');
				}
			},
			function (error) {
				console.log('Error listeing real time', error);
			}
		);
	}, []);

	return (
		<div>
			<ChatBar friends={currentFriends} />
			<hr />
			<Title imgUrl='' userName='Jack' />
			<Scrollbars style={{ width: 800, height: 600 }}>
				{isLoading ? (
					<p>is loading...</p>
				) : (
					arrayMessages.map((message) => (
						<Cell avatar={''} sender={message[1]} message={message[2]} />
					))
				)}
			</Scrollbars>
			<TextBox
				chatID={chatID}
				user={userName}
				numMessage={numMessage}
				allMessages={allMessages}
			/>
		</div>
	);
}
//the user=ethan part need modifying

export default Chatbox;
