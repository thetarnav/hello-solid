import { useParams } from 'solid-app-router'
import { Component, createEffect, createSignal, on } from 'solid-js'

import styles from './Kanban.module.scss'
import { useNavigate } from 'solid-app-router'
import { editItem, getItemById } from '.'

const TaskDetails: Component = () => {
	const navigate = useNavigate()
	const params = useParams()
	const item = getItemById(params.id)
	if (!item) {
		navigate('/kanban')
		return
	}

	const [title, setTitle] = createSignal(item.title)
	const [desc, setDesc] = createSignal(item.desc)

	// observe local changes to the title and description, and emit those changes to the store
	createEffect(
		on([title, desc], ([newTitle, newDesc]) => {
			editItem(item.column, params.id, newTitle, newDesc)
		}),
	)

	const onSubmit = (e: Event) => {
		e.preventDefault()
		navigate('/kanban')
	}

	return (
		<div class={styles.TaskDetails_wrapper}>
			<div
				class={styles.TaskDetails_cover}
				onclick={() => navigate('/kanban')}
			></div>
			<form class={styles.TaskDetails_modal} onsubmit={onSubmit}>
				<div class="row">
					<label for="title">Title</label>
					<input
						name="title"
						type="text"
						placeholder="Give your card a name"
						value={title()}
						oninput={e => setTitle(e.currentTarget.value)}
					></input>
				</div>
				<div class="row">
					<label for="title">Description</label>
					<textarea
						name="title"
						rows="7"
						class="description"
						placeholder="Describe what is this card about"
						value={desc()}
						oninput={e => setDesc(e.currentTarget.value)}
					></textarea>
				</div>
			</form>
		</div>
	)
}

export default TaskDetails
