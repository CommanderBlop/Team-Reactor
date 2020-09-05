import React from 'react';
import NewPost from './NewPost';

function communitiesHeader(props) {
	const logoSection = (
		<div>
			<div>
				<h1>{props.headerInfo.communityName}</h1>
				<img alt={'groupicon'} src={props.headerInfo.icon} />
			</div>
			<div>
				<p>Group Descriptions: {props.headerInfo.communityDescriptions}</p>
			</div>
		</div>
	);

	const infoSection = (
		<div>
			<p>Members: {props.headerInfo.numMembers}</p>
			<p>Number of Posts: {props.headerInfo.numPosts}</p>
		</div>
	);
	return (
		<header>
			{logoSection}
			{infoSection}
			<NewPost />
		</header>
	);
}

function handleNewPost() {}

export default communitiesHeader;
