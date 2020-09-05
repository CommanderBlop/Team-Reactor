import React, { useContext, useEffect, useState } from 'react';
import FirebaseContext from '../Firebase';

function Chatbox() {
	/*
	constructor(props) {
		super(props);

		this.state = {
			chatID: 'T5O5rvqkXjOTTNzgClyK',
			chats: [],
		};

		this.getData = this.getData.bind(this);
    }
    */
	const [chatID, setChatID] = useState('T5O5rvqkXjOTTNzgClyK');
	const [chats, setChats] = useState(['']);
	const firebase = useContext(FirebaseContext);

	function getData() {
		const chatMessages = firebase.db.collection('messages').doc(chatID);

		chatMessages
			.get()
			.then(function (doc) {
				if (doc.exists) {
					return doc.data();
				} else {
					// doc.data() will be undefined in this case
					console.log('No such document!');
				}
			})
			.catch(function (error) {
				console.log('Error getting document:', error);
			});
	}

	useEffect(() => {
		let data = getData();
		console.log(data);
	}, []);

	/*
		chatRef.on('value', (snapshot) => {
			const getChats = snapshot.val();
			let ascChats = [];
			for (let chat in getChats) {
				if (getChats[chat].message !== '') {
					ascChats.push({
						id: chat,
						message: getChats[chat].message,
						user: getChats[chat].user,
						date: getChats[chat].timestamp,
					});
				}
			}
			const chats = ascChats.reverse();
			this.setState({ chats });
		});*/
	/*
	render() {
		return (
			<div className='chatbox'>
				<ul className='chat-list'>
					{this.state.chats.map((chat) => {
						const postDate = new Date(chat.date);
						return (
							<li key={chat.id}>
								<em>{postDate.getDate() + '/' + (postDate.getMonth() + 1)}</em>
								<strong>{chat.user}:</strong>
								{chat.message}
							</li>
						);
					})}
				</ul>
			</div>
		);
    }
    */
	return <h1>hi</h1>;
}
export default Chatbox;
