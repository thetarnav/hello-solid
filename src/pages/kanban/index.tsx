import { nanoid } from 'nanoid'
import { Component, createEffect, For } from 'solid-js'
import { createStore, produce } from 'solid-js/store'

import styles from './Kanban.module.scss'

import { ColumnData, ColumnName, isColumnName, Item } from './kanban.types'
import Column from './Column'
import { reorderArrayCopy } from '@/utils/array'
import { map, mapValues } from 'lodash'

const [store, setStore] = createStore<Record<ColumnName, ColumnData>>({
	todo: {
		name: 'todo',
		title: 'Todo',
		items: [
			{
				id: nanoid(),
				title: 'Make the website',
				desc: '',
			},
			{
				id: nanoid(),
				title: 'Go to sleep',
				desc: 'It would be cool',
			},
			{
				id: nanoid(),
				title: 'Read something',
				desc: '',
			},
			{
				id: nanoid(),
				title: 'Design the website',
				desc: 'Urgent',
			},
		],
	},
	progress: {
		name: 'progress',
		title: 'In progress',
		items: [
			{
				id: nanoid(),
				title: 'Make the kanban table',
				desc: '',
			},
		],
	},
	review: {
		name: 'review',
		title: 'In review',
		items: [],
	},
	done: {
		name: 'done',
		title: 'Done',
		items: [
			{
				id: nanoid(),
				title: 'Complete Intermediate exercise',
				desc: 'It was very cool to do in Solid.js',
			},
		],
	},
})
const columns = () => Object.keys(store) as ColumnName[]

const logColumns = () => {
	const clean = mapValues(store, a => {
		const { items } = a as ColumnData
		return map(items, 'title')
	})
	console.table(clean)
}

const Page: Component = () => {
	const changeColumn = (
		newColumn: ColumnName,
		oldKey: string,
		newIndex: number,
		oldIndex: number,
	) => {
		const oldColumn = isColumnName(oldKey)
		if (!oldColumn) return
		let item: Item
		// remove item from old column
		setStore(
			oldColumn,
			'items',
			produce<Item[]>(items => (item = items.splice(oldIndex, 1)[0])),
		)
		// and add it to it's new column
		setStore(
			newColumn,
			'items',
			produce<Item[]>(items => items.splice(newIndex, 0, item)),
		)
	}

	const moveItem = (column: ColumnName, to: number, from: number) => {
		setStore(column, 'items', items => reorderArrayCopy(items, from, to))
	}

	createEffect(() => {
		store
		logColumns()
	})

	return (
		<main class={styles.kanban}>
			<For each={columns()}>
				{name => {
					let { title, items } = store[name]
					return (
						<Column
							name={name}
							title={title}
							items={items}
							onMove={(...args) => changeColumn(name, ...args)}
							onUpdate={(to, from) => moveItem(name, to, from)}
						/>
					)
				}}
			</For>
		</main>
	)
}

export default Page
