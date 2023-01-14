/**
 * Includes
 */
import { vNode, vFragment, mount } from '../../Sauce/libs/templates/vDom';

const values = [1, 5, 10, 20, 50, 100, 200, 500, 1000];

const numberFormatDecimal = (n, g = 3) => (n + '').replace(new RegExp(`(?!^)(?=(?:\\d{${g}})+(?:\\.|$))`, 'gm'), ' ').replace('.', ',');
const numberFormat = (n, g = 3) => numberFormatDecimal(Math.round(n), g);

const Calculator = (e) => {
	const output = [];
	const calc = () => {
		const result = output.reduce((p, c, i) => {
			return p + (values[i] || 0) * (c || 0);
		}, 0);

		e.$element.querySelector('.result').innerText = numberFormat(result) + 'kr.';
	};

	const inputs = values.map((value, i) => {
		const callback = (_, elm) => {
			output[i] = parseInt(elm.value);
			elm.value = parseInt(elm.value) || 0;
			calc();
		};

		const decrement = (_, e) => {
			const elm = e.nextElementSibling;
			elm.value = Math.max(0, parseInt(elm.value) - 1);
			output[i] = parseInt(elm.value);
			calc();
		};

		const increment = (_, e) => {
			const elm = e.previousElementSibling;
			elm.value = parseInt(elm.value) + 1;
			output[i] = parseInt(elm.value);
			calc();
			calc();
		};

		return (
			<div class='form-group'>
				<span class={'kr' + value} data-value={value}>
					{value}kr
				</span>
				<button class='btn' onClick={decrement}>
					-
				</button>
				<input type='number' pattern='\d*' min='0' value='0' step='1' onInput={callback} />
				<button class='btn' onClick={increment}>
					+
				</button>
			</div>
		);
	});

	return (
		<section class='calculator'>
			<div class='inputs'>{inputs}</div>
			<div class='result'>{0}kr.</div>
		</section>
	);
};

const App = () => (
	<article class='viewport'>
		<main>
			<h2>Oppgjør kalkulator</h2>
			<Calculator />
		</main>
	</article>
);

mount(<App />, window.env.id);
