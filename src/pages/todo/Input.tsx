import { Component, createSignal } from 'solid-js'

import styles from './Todo.module.scss'

interface Props {
	onSubmit?: (name: string) => void
}

const Input: Component<Props> = props => {
	const [value, setValue] = createSignal('')

	const onSubmit = (e: Event) => {
		e.preventDefault()
		if (!value()) return
		props.onSubmit?.(value())
		setValue('')
	}

	return (
		<form class={styles.Input} onsubmit={onSubmit}>
			<input
				class="name"
				type="text"
				placeholder="What do you want to do?"
				value={value()}
				oninput={e => setValue(e.currentTarget.value)}
			/>
			<input
				class="button"
				disabled={!value()}
				type="submit"
				value="Create"
			/>
		</form>
	)
}

export default Input
