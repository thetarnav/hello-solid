import { Component, For, onCleanup, onMount } from 'solid-js'
import { ColumnData } from './kanban.types'
import { useClass } from '@/utils/solid'
import Sortable from 'sortablejs'

import styles from './Kanban.module.scss'

interface Props extends ColumnData {
	onMove?: (oldColumn: string, newIndex: number, oldIndex: number) => void
	onUpdate?: (newIndex: number, oldIndex: number) => void
}

const Column: Component<Props> = props => {
	let body!: HTMLDivElement
	let sortable: Sortable

	const onUpdate = (e: Sortable.SortableEvent) => {
		const oldIndex = e.oldIndex,
			newIndex = e.newIndex
		if (oldIndex !== undefined && newIndex !== undefined)
			props.onUpdate?.(newIndex, oldIndex)
	}

	const onAdd = (e: Sortable.SortableEvent) => {
		const oldColumn = e.from.dataset.column,
			oldIndex = e.oldIndex,
			newIndex = e.newIndex
		if (oldColumn && oldIndex !== undefined && newIndex !== undefined)
			props.onMove?.(oldColumn, newIndex, oldIndex)
	}

	onMount(() => {
		sortable = new Sortable(body, {
			group: 'kanban',
			animation: 150,
			// within the column
			onUpdate,
			// added to column
			onAdd,
		})
	})

	onCleanup(() => {
		sortable.destroy()
	})

	return (
		<section class={useClass([props.name, styles.Column])}>
			<header>
				<h4>{props.title}</h4>
			</header>
			<div ref={body} class="body" data-column={props.name}>
				<For each={props.items}>
					{item => (
						<div class="item">
							<p>{item.title}</p>
						</div>
					)}
				</For>
			</div>
			<button className="add-item">Add item</button>
		</section>
	)
}
export default Column
