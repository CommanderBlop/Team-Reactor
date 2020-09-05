import React from 'react';

function Cell(props) {
	return (
		<div>
			<div>
				<img src={props.Avatar} alt='Avatar' />
				<h4>{props.sender}</h4>
			</div>
			<p>{props.message}</p>
		</div>
	);
}

export default Cell;
