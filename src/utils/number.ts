import { inRange } from 'lodash'

/**
 *
 * 'loop' - exceeding value comes back around from the other end
 *
 * 'bounce' - exceeding value 'bounces' of the end it exceeds
 *
 * 'flat' - anything below min will be min, and the same with max
 * @param value
 * @param min
 * @param max
 * @param behavior
 * @returns
 */
export const stayInRange = (
	value: number,
	min: number,
	max: number,
	behavior: 'loop' | 'bounce' | 'clamp' = 'loop',
) => {
	if (value >= min && value <= max) return value

	if (behavior === 'loop') return loop(value, min, max)
	if (behavior === 'bounce') {
		let range = Math.abs(min - max),
			fullExceed = value < min ? value - min : value - max,
			quotient = Math.floor(Math.abs(fullExceed) / range),
			exceed = Math.abs(fullExceed) - quotient * range

		value =
			(value < min && quotient % 2 === 0) || quotient % 2 !== 0
				? min + exceed
				: max - exceed
	} else value = value < min ? min : max

	return value
}

export const loop = (n: number, min: number, max: number): number => {
	if (inRange(n, min, max)) return n
	const length = max - min + 1
	const mod = n % length
	if (inRange(mod, min, max)) return mod
	return mod < min ? mod + length : loop(mod - length, min, max)
}
