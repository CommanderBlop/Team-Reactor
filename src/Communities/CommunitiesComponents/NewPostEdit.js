import React from 'react';
class NewPostEdit extends React.Component {
	constructor() {
		super();
		this.state = {
			title: '',
			content: '',
		};
		this.handleChange = this.handleChange.bind(this);
	}
	handleChange(event) {
		const { name, value } = event.target;
		this.setState({ [name]: value });
	}
	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<input
					type='text'
					value={this.state.title}
					name='title'
					placeholder='Title'
					onChange={this.handleChange}
				/>
				<br />
				<textarea
					value={this.state.content}
					placeHolder='Content'
					name={'content'}
					onChange={this.handleChange}
				/>
				<br />

				<button type='submit'>Submit</button>
			</form>
		);
	}
}

export default NewPostEdit;
