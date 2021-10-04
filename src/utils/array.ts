import { copyArray } from './fp'

export const duplicateUntil = <T extends unknown>(
	list: T[],
	until: number,
	add?: T[],
): T[] => {
	if (list.length >= until || (!list.length && !add?.length)) return list
	const append = add || list
	return duplicateUntil([...list, ...append], until, append)
}

/** Mutates the array! */
export const reorderArray = (array: any[], from: number, to: number): void => {
	array.splice(from < to ? to - 1 : to, 0, array.splice(from, 1)[0])
}

/** Returns a reordered array */
export const reorderArrayCopy = <T>(
	array: readonly T[],
	from: number,
	to: number,
): T[] => {
	const copy = copyArray(array)
	reorderArray(copy, from, to)
	return copy
}
