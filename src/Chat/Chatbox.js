import React, { useContext, useEffect, useState } from 'react';
import FirebaseContext from '../Firebase';
import Title from './ChatBoxComponent/Title';
import Cell from './ChatBoxComponent/Cell';
import TextBox from './ChatBoxComponent/TextBox';

var arrayMessages = [];
function Chatbox() {
	const [chatID, setChatID] = useState('T5O5rvqkXjOTTNzgClyK');
	const [chats, setChats] = useState(['']);
	const [isLoading, setIsLoading] = useState(true);
	const [numMessage, setNumMessage] = useState(0);
	const firebase = useContext(FirebaseContext);
	const chatMessages = firebase.db.collection('messages').doc(chatID);
	const [allMessages, setAllMessages] = useState({});

	function getData() {
		chatMessages
			.get()
			.then(function (doc) {
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
					return [];
				}
			})
			.catch(function (error) {
				console.log('Error getting document:', error);
			});
	}

	useEffect(() => {
		getData();
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
			<Title imgUrl='' userName='Jack' />
			{isLoading ? (
				<p>is loading...</p>
			) : (
				arrayMessages.map((message) => (
					<Cell avatar={''} sender={message[1]} message={message[2]} />
				))
			)}
			<TextBox
				chatID={chatID}
				user={'ethan'}
				numMessage={numMessage}
				allMessages={allMessages}
			/>
		</div>
	);
}
//the user=ethan part need modifying

export default Chatbox;
