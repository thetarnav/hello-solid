import { Component, createSignal } from 'solid-js'

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
		<form onsubmit={onSubmit}>
			<input
				type="text"
				placeholder="What do you want to do?"
				value={value()}
				oninput={e => setValue(e.currentTarget.value)}
			/>
			<input type="submit" value="Create" />
		</form>
	)
}

export default Input
