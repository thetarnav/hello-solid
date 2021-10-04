export const copyArray = <T>(list: readonly T[]): T[] => list.slice()

export const copyObject = <T extends Record<any, any>>(object: T): T =>
	Object.assign({}, object)
