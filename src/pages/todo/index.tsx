import { Component, createEffect, For } from 'solid-js'
import { createStore, produce } from 'solid-js/store'
import { nanoid } from 'nanoid'
import Task from './Task'

import styles from './Todo.module.scss'
import Input from './Input'

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

	/* Watch for store changes, and update tasks in localStorage */
	createEffect(() => setTasksToStorage(state.tasks))

	return (
		<div class={styles.Todo}>
			<Input onSubmit={createTask} />
			<ul>
				<For each={state.tasks}>
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
			</ul>
		</div>
	)
}

export default Todo
