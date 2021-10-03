import { Component, createMemo, createSignal, For } from 'solid-js'
import { duplicateUntil } from '../../utils/array'
import { loop } from '../../utils/number'

import styles from './Slider.module.scss'

interface Props {
	slides: string[]
}

const Slider: Component<Props> = props => {
	const slides = createMemo(() => duplicateUntil(props.slides, 5))
	const [active, setActive] = createSignal(0)

	const checkIndex = (index: number, move = 0) =>
		loop(active() + move, 0, slides().length - 1) === index

	const getClass = (index: number) => {
		if (checkIndex(index, -2)) return 'far-left'
		if (checkIndex(index, -1)) return 'left'
		if (checkIndex(index)) return 'center'
		if (checkIndex(index, 1)) return 'right'
		if (checkIndex(index, 2)) return 'far-right'
		return 'hidden'
	}

	return (
		<div class={styles.Slider}>
			<div>
				<button onclick={() => setActive(n => n - 1)}>{'←←←'}</button>-|-
				<button onclick={() => setActive(n => n + 1)}>{'→→→'}</button>
			</div>
			<For each={slides()}>
				{(img, index) => (
					<div
						class={`Slide ${getClass(index())}`}
						style={{ '--img': `url(${img})` }}
						onclick={() => setActive(index())}
					></div>
				)}
			</For>
		</div>
	)
}

export default Slider
