import { Component } from 'preact';
import React from 'preact/compat';
import { useState, useCallback, useEffect } from 'preact/hooks';
class Counter extends Component{

	constructor({ initialCount }) {
		super();
		this.initialCount = initialCount;
	}

	render() {
		const [current, setCurrent] = useState(this.initialCount);
		const [clicked, setClicked] = useState(null);

		const onClick = useCallback(() => {
			setCurrent(current + 1);
			setClicked(true);
		}, [current]);

		useEffect(() => () => {});

		return (
			<div>
				<p>
					Value: <span>{current}</span>
				</p>
				{clicked && <p>You already clicked!</p>}
				<p>Initial value: {this.initialCount}</p>
				<button onClick={onClick}>Increase</button>
			</div>
		);
	}
}
export default Counter;
