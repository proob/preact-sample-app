import { h, Component } from 'preact';
import style from './style';
import React from 'preact/compat';

export default class Github extends Component {
	state = {
		username: '',
		repositories: null,
		isLoading: false
	};
	fetchUser = e => {
		this.setState({ isLoading: true });
		e.preventDefault();
		fetch(`https://api.github.com/users/${this.state.username}`)
			.then(response => response.json())
			.then(user => this.setState({ repositories: user.public_repos, isLoading: false }));
	};
	setUsername = e => this.setState({ username: e.target.value });
	render({}, { username, repositories, isLoading }) {
		return (
			<div class={style.container}>
				<h1>Enter a Github username</h1>
				<form onSubmit={this.fetchUser}>
					<input type="text" value={username} onChange={this.setUsername} />
					<button type="submit">Submit</button>
				</form>
				{ isLoading && <h5>...fetching data...</h5> }
				{ repositories &&
					<h3>The user {username} has {repositories} repositories on Github.</h3>
				}
			</div>
		);
	}
}
