import React from 'react';

function Cell(props) {
	return (
		<div>
			<img src={props.Avatar} />
			<h3>{props.sender}</h3>
			<p>{props.message}</p>
		</div>
	);
}

export default Cell;
