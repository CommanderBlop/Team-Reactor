import React from 'react';

function FriendCell(props) {
	return (
		<div>
			<img src={props.Avatar} alt='Avatar' />
			<h4>{props.name}</h4>
		</div>
	);
}

export default FriendCell;
