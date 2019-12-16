import { h, Component } from 'preact';
import { Router } from 'preact-router';
import Header from './header';
import Home from '../routes/home';
import Profile from '../routes/profile';
import Github from '../routes/github';

const style = {
	position: 'fixed',
	top: '50%',
	left: '50%',
	width: '30em',
	height: '18em',
	marginTop: '-9em', /*set to a negative number 1/2 of your height*/
	marginLeft: '-15em', /*set to a negative number 1/2 of your width*/
	lineHeight: '17em',
	textAlign: 'center',
	border: '1px solid #ccc',
	backgroundColor: '#444444'
};
export default class App extends Component {
	handleRoute = e => {
		this.currentUrl = e.url;
	};
	render() {
		return (
			<div id="app">
				<Header />
				<Router onChange={this.handleRoute}>
					<Home path="/" />
					<Profile path="/profile/" user="me" />
					<Profile path="/profile/:user" />
					<Github path="/github/:user?" />
					<div style={style} default>
						404! The page at <b>"{window.location.pathname}"</b> was not found!
					</div>
				</Router>
			</div>
		);
	}
}
