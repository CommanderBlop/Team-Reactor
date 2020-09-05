import React from 'react';
import CommunitiesHeader from './CommunitiesComponents/CommunitiesHeader';
import CommunitiesBody from './CommunitiesComponents/CommunitiesBody';
class MainCommunityPage extends React.Component {
	constructor() {
		super();
		this.state = {
			communityInfo: {
				numMembers: 0,
				numPosts: 0,
				communityName: 'The Flash',
				communityDescriptions: 'for everyone who loves the flash',
				icon: '/TestIcon.png',
			},
			postInfo: [
				{
					id: 0,
					title: 'Iris West is a bad Character',
					content: '......she is horrible......hahah',
				},
				{
					id: 1,
					title: 'Barry Allen is not that fast',
					content: '..........................',
				},
			],
		};
	}

	render() {
		return (
			<div>
				<CommunitiesHeader headerInfo={this.state.communityInfo} />
				<CommunitiesBody bodyInfo={this.state.postInfo} />
			</div>
		);
	}
}

export default MainCommunityPage;
