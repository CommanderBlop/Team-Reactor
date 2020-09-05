import React, { useContext, useEffect, useState } from 'react';
import FirebaseContext from '../../Firebase';

function TextBox(props) {
	const [messageContent, setMessageContent] = useState('');
	const [messageSent, setMessageSent] = useState(false);
	const chatID = props.chatID;
	const user = props.user;
	var allMessages = props.allMessages;
	const firebase = useContext(FirebaseContext);
	var d = new Date();

	function handleChange(event) {
		const { name, value } = event.target;
		name === 'messageSent' ? setMessageSent(true) : setMessageContent(value);
	}

	useEffect(() => {
		if (messageSent === true) {
			const content = messageContent;
			var messages = firebase.db.collection('messages').doc(chatID);
			messages
				.update({
					[Object.keys(allMessages).length]: [d.getTime(), user, content],
				})
				.then(function () {
					console.log('Document successfully updated!');
				})
				.catch(function (error) {
					// The document probably doesn't exist.
					console.error('Error updating document: ', error);
				});
			setMessageContent('');
			setMessageSent(false);
		}
	}, [messageSent]);

	return (
		<div>
			<input
				type='text'
				value={messageContent}
				name='messageContent'
				placeholder='Type your message...'
				onChange={handleChange}
			/>
			<button type='button' name='messageSent' onClick={handleChange}>
				send
			</button>
		</div>
	);
}

export default TextBox;
