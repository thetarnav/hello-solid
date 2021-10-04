import { Accessor } from '../../node_modules/solid-js/types'

export const useClass = (
	classes: Record<string, boolean | Accessor<boolean>> | any[] | string,
): string => {
	if (typeof classes === 'string') return classes
	if (Array.isArray(classes))
		return classes.filter(c => typeof c === 'string').join(' ')
	return Object.entries(classes).reduce((t, i) => {
		const isTrue = typeof i[1] === 'function' ? i[1]() : i[1]
		return isTrue ? t + ' ' + i[0] : t
	}, '')
}
