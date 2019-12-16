import { h } from 'preact';
import style from './style';
import Counter from '../../components/counter';

const Home = () => (
	<>
		<div className={style.home}>
			<h1>Home</h1>
			<p>This is the Home component.</p>
			<br />
			<Counter init={-2} />
		</div>
	</>
);

export default Home;
