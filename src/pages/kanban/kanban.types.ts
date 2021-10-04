const columnNames: ['todo', 'progress', 'review', 'done'] = [
	'todo',
	'progress',
	'review',
	'done',
]

export type ValuesOf<T extends any[]> = T[number]

export type ColumnName = ValuesOf<typeof columnNames>

export const isColumnName = (string: string): ColumnName | false =>
	columnNames.includes(string as ColumnName) ? (string as ColumnName) : false

export interface Item {
	id: string
	title: string
	desc: string
}

export interface ColumnData {
	name: ColumnName
	title: string
	items: Item[]
}
