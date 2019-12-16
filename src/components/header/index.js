import { h } from 'preact';
import { Link } from 'preact-router/match';
import style from './style.css';

const Header = () => (
	<header class={style.header}>
		<h1>Preact App</h1>
		<nav>
			<Link activeClassName={style.active} href="/">Home</Link>
			<Link activeClassName={style.active} href="/profile">Me</Link>
			<Link activeClassName={style.active} href="/profile/john">John</Link>
			<Link activeClassName={style.active} href="/github">GitHub</Link>
			<Link activeClassName={style.active} href="/github/proob">Proob@Git</Link>
			<Link activeClassName={style.active} href="/github/developit">developit@Git</Link>
		</nav>
	</header>
);

export default Header;
