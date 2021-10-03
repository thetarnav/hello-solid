export const duplicateUntil = <T extends unknown>(
	list: T[],
	until: number,
	add?: T[],
): T[] => {
	if (list.length >= until || (!list.length && !add?.length)) return list
	const append = add || list
	return duplicateUntil([...list, ...append], until, append)
}
