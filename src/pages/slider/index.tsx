import { random, drop } from 'lodash'
import { Component, createSignal } from 'solid-js'
import Slider from './Slider'

import styles from './Slider.module.scss'

const randomImg = () =>
	`https://source.unsplash.com/random/${random(800, 1200, false)}x${random(
		400,
		800,
		false,
	)}`

const SliderExercise: Component = () => {
	const [slides, setSlides] = createSignal([
		randomImg(),
		randomImg(),
		randomImg(),
		randomImg(),
		randomImg(),
	])

	return (
		<div>
			<div class={styles.slideListActions}>
				<button onclick={() => setSlides(l => [...l, randomImg()])}>
					Add Slide
				</button>
				<button onclick={() => setSlides(l => drop(l))}>
					Remove Slide
				</button>
			</div>
			<Slider slides={slides()} />
		</div>
	)
}

export default SliderExercise
