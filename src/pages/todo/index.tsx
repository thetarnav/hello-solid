import { Component, createEffect, createMemo, For } from 'solid-js'
import { createStore, produce } from 'solid-js/store'
import { nanoid } from 'nanoid'
import { every } from 'lodash'

import styles from './Todo.module.scss'

import Input from './Input'
import Task from './Task'
import {
	animateEnter,
	animateExit,
	TransitionGroup,
} from '@otonashixav/solid-flip'

interface Task {
	id: string
	name: string
	done: boolean
}

type Store = { tasks: Task[] }

const initialState: Store = {
	tasks: [
		{
			name: 'Learn Solid.js',
			done: false,
			id: nanoid(),
		},
		{
			name: 'Complete basic exercise',
			done: true,
			id: nanoid(),
		},
		{
			name: 'Make a simple todo app',
			done: false,
			id: nanoid(),
		},
	],
}

const setTasksToStorage = (tasks: Task[]) =>
	localStorage.setItem('tasks', JSON.stringify(tasks))

const getTasksFromStorage = (): Task[] => {
	const json = localStorage.getItem('tasks')
	return json ? JSON.parse(json) : []
}

const getInitialState = (): Store => {
	const visitedBefore = localStorage.getItem('todo-visited')
	localStorage.setItem('todo-visited', 'true')
	const tasksInStorage = getTasksFromStorage()
	return visitedBefore ? { tasks: tasksInStorage } : initialState
}

const Todo: Component = () => {
	const [state, setState] = createStore(getInitialState())

	const toggleTask = (index: number) =>
		setState('tasks', index, 'done', done => !done)

	const deleteTask = (index: number) =>
		setState(produce<Store>(s => s.tasks.splice(index, 1)))

	const editTask = (index: number, name: string) =>
		setState('tasks', index, 'name', name)

	const createTask = (name: string) =>
		setState(
			produce<Store>(s => {
				s.tasks.push({ id: nanoid(), name, done: false })
			}),
		)

	const clearTasks = () => setState('tasks', [])

	const toggleAll = (state: boolean) =>
		setState(
			'tasks',
			produce<Task[]>(tasks => tasks.map(t => (t.done = state))),
		)

	const noTasks = createMemo(() => !state.tasks.length)
	const allCompleted = createMemo(() => every(state.tasks, { done: true }))
	const noneCompleted = createMemo(() => every(state.tasks, { done: false }))

	/* Watch for store changes, and update tasks in localStorage */
	createEffect(() => setTasksToStorage(state.tasks))

	return (
		<div class={styles.Todo}>
			<Input onSubmit={createTask} />
			<ul>
				<TransitionGroup enter={animateEnter()} exit={animateExit()}>
					<For
						each={state.tasks}
						fallback={<p class="no-tasks">All clear...</p>}
					>
						{(task, index) => (
							<Task
								done={task.done}
								name={task.name}
								onToggle={() => toggleTask(index())}
								onDelete={() => deleteTask(index())}
								onEdit={name => editTask(index(), name)}
							/>
						)}
					</For>
				</TransitionGroup>
			</ul>
			<div class={styles.bulkActions}>
				<button class="button" onclick={clearTasks} disabled={noTasks()}>
					Clear Tasks
				</button>
				<button
					class="button"
					onclick={() => toggleAll(true)}
					disabled={noTasks() || allCompleted()}
				>
					Check All
				</button>
				<button
					class="button"
					onclick={() => toggleAll(false)}
					disabled={noTasks() || noneCompleted()}
				>
					Uncheck All
				</button>
			</div>
		</div>
	)
}

export default Todo
