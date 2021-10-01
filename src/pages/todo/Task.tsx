import { Component } from 'solid-js'

import styles from './Todo.module.scss'

interface Props {
	done: boolean
	name: string
	onToggle?: (state: boolean) => void
	onDelete?: () => void
	onEdit?: (name: string) => void
}

const Task: Component<Props> = props => {
	const toggleState = () => props.onToggle?.(props.done!)
	const deleteTask = () => props.onDelete?.()
	const editName = (name: string) => props.onEdit?.(name)

	return (
		<div class={`${styles.Task} ${props.done && styles.done}`}>
			<div class={styles.checkbox} onclick={toggleState}></div>
			<div class={styles.remove} onclick={deleteTask}></div>
			<input
				type="text"
				class={styles.taskBody}
				value={props.name}
				oninput={e => editName(e.currentTarget.value)}
			/>
		</div>
	)
}

export default Task
