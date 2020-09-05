import React from 'react';
import PostComponents from './PostComponents';

function communitiesBody(props) {
	const postComponents = props.bodyInfo.map((item) => (
		<PostComponents key={item.id} title={item.title} content={item.content} />
	));

	return (
		<div>
			<hr />
			{postComponents}
		</div>
	);
}

export default communitiesBody;
