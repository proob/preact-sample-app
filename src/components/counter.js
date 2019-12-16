import { Component } from 'preact';
import React from 'preact/compat';
import { useState, useCallback, useEffect } from 'preact/hooks';
class Counter extends Component{

	constructor({ init }) {
		super();
		this.initialValue = init;
	}

	render() {
		const [current, setCurrent] = useState(this.initialValue);

		const onClick = useCallback(() => {
			setCurrent(current + 1);
		}, [current]);

		useEffect(() => () => {});

		return (
			<div>
				<p><button onClick={onClick}>Increase</button> - Value initial:<span>{this.initialValue}</span>, current:<span>{current}</span></p>
			</div>
		);
	}
}
export default Counter;
