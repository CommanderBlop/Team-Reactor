import React from 'react';
import NewPostEdit from './NewPostEdit';
class NewPost extends React.Component {
	constructor() {
		super();
		this.state = {
			isButtonClicked: false,
		};
		this.handleClick = this.handleClick.bind(this);
	}
	handleClick() {
		this.setState({
			isButtonClicked: !this.state.isButtonClicked,
		});
	}
	render() {
		return (
			<div>
				<button type='button' onClick={this.handleClick}>
					New Post
				</button>
				{this.state.isButtonClicked ? <NewPostEdit /> : null}
			</div>
		);
	}
}

export default NewPost;
