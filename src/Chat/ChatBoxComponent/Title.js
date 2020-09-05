import React from 'react';

function Title(props) {
	return (
		<div>
			<img src={props.imgUrl} />
			<h2>{props.userName}</h2>
		</div>
	);
}

export default Title;
