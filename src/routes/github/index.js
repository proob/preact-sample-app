import { Component } from 'preact';
import style from '../home/style.css';
import React from 'preact/compat';
import { useState } from 'preact/hooks';

export default class Github extends Component {
	state = {
		username: '', repositories: null, isLoading: false
	};
	fetchUser = e => {
		e.preventDefault();
		this.setState({ isLoading: true, repositories: null });
		fetch(`https://api.github.com/users/${this.state.username}`)
			.then(response => {
				this.setState({ isLoading: false });
				if (response.status === 404) throw new Error();
				return response.json();
			})
			.then(user => {
				this.setState({ repositories: user.public_repos + '' });
			})
			.catch(() => this.setState({ repositories: 'err' }));
	};
	setUsername = e => {
		this.setState({ username: e.target.value, repositories: null });
	};
	render({}, { username, repositories, isLoading }) {
		const repoText = <span> has {repositories} repositories on Github.</span>;
		const errText = <span> was not found!</span>;
		const [on, setOn] = useState(false);
		function toggle() {
			setOn(!on);
		}
		return (
			<div class={style.home}>
				<h1>Enter a Github username</h1>
				<form onSubmit={this.fetchUser}>
					<input tabIndex={0}
						   type="text"
						   value={username} onChange={this.setUsername}
					/>
					<button type="submit">Submit</button>
				</form>
				{ !isLoading && !repositories && <h5>waiting for submit</h5> }
				{ isLoading && <h5>...fetching data...</h5> }
				{ repositories &&
					<h3>The user <span style={{ fontSize: 'larger' }}>{username}</span>
						{ repositories !== 'err' ?
							repoText
							: errText
						}
					</h3>
				}
				<button onClick={toggle}>Switch1!</button> - {on ? 'Is on!' : 'Is off!'} <br />
			</div>
		);
	}
}
