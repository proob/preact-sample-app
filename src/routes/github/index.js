import { Component } from 'preact';
import style from '../home/style.css';
import React from 'preact/compat';
import { useState } from 'preact/hooks';

export default class Github extends Component {
	state = {
		user: '',
		propUser: '',
		repositories: null,
		isLoading: false
	};
	loadGitData = user => {
		this.setState({ isLoading: true, repositories: null });
		fetch(`https://api.github.com/users/${user}`)
			.then(response => {
				if (response.status === 404) throw new Error();
				return response.json();
			})
			.then(user => {
				this.setState({ repositories: user.public_repos + '', isLoading: false });
			})
			.catch(() => this.setState({ repositories: 'err', isLoading: false }));
	};
	fetchUser = e => {
		e.preventDefault();
		this.loadGitData(this.state.user);
	};
	setUser = e => {
		this.setState({ user: e.target.value, repositories: null });
	};

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.user !== prevState.propUser) {
			return {
				user: nextProps.user,
				propUser: nextProps.user,
				isLoading: false,
				repositories: null
			};
		}
		return null;
	}
	componentDidMount() {
		if (this.state.propUser) {
			this.loadGitData(this.state.propUser);
		}
	}
	componentDidUpdate(prevProps, prevState) {
		if (this.state.propUser && this.state.propUser !== prevState.propUser) {
			this.loadGitData(this.state.user);
		}
	}
	render({}, { user, repositories, isLoading }) {
		const repoText = <span> has {repositories} repositories on Github.</span>;
		const errText = <span> was not found!</span>;
		const [on, setOn] = useState(false);
		function toggle() { setOn(!on); }
		return (
			<div class={style.home}>
				<h1>Enter a Github user name</h1>
				<form onSubmit={this.fetchUser}>
					<input tabIndex={0}
						   type="text"
						   value={user} onChange={this.setUser}
					/>
					<button type="submit">Submit</button>
				</form>
				{ !isLoading && !repositories && <h5>waiting for submit</h5> }
				{ isLoading && <h5>...fetching data...</h5> }
				{ repositories &&
					<h3>The user <span style={{ fontSize: 'larger' }}>{user}</span>
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
