import React from 'react';

function postComponents(props) {
	return (
		<div>
			<h3>{props.title}</h3>
			<p>{props.content}</p>
			<hr />
		</div>
	);
}

export default postComponents;
