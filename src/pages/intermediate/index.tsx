import { sortBy } from 'lodash'
import {
	Component,
	createMemo,
	createResource,
	createSignal,
	For,
	Show,
	Suspense,
} from 'solid-js'
import { createStore } from 'solid-js/store'
import * as API from '../../types/randomuserme'

import styles from './Intermediate.module.scss'

interface FlatUser {
	name: string
	city: string
	'street number': number
	street: string
	state: string
	country: string
	postcode: string
	lat: string
	long: string
	timezone: string
}
type Header = keyof FlatUser
type Direction = -1 | 1

const fullName = (name: API.Name): string => `${name.first} ${name.last}`

const fetchUsers = async (): Promise<API.User[]> => {
	const res = await fetch(`https://randomuser.me/api?results=30`)
	const json = await res.json()
	return json.results
}

const flettenUsers = (users: API.User[]): FlatUser[] =>
	users.map(user => ({
		name: fullName(user.name),
		city: user.location.city,
		street: user.location.street.name,
		'street number': user.location.street.number,
		state: user.location.state,
		country: user.location.country,
		postcode: user.location.postcode,
		lat: user.location.coordinates.latitude,
		long: user.location.coordinates.longitude,
		timezone: user.location.timezone.offset,
	}))

const sortList = <T extends Object>(
	list: T[],
	key: keyof T,
	direction: Direction = -1,
): T[] => {
	const sorted = sortBy(list, key)
	return direction === -1 ? sorted.reverse() : sorted
}

const filterList = <T extends Object>(list: T[], query: string) =>
	list.filter(item =>
		Object.values(item).some(value => {
			const regex = new RegExp(query, 'gi')
			const match = (value + '').match(regex)
			return !!match?.length
		}),
	)

const Intermediate: Component = () => {
	const [users, { refetch }] = createResource<API.User[]>(() => fetchUsers(), {
		initialValue: [],
	})
	const [sorting, setSorting] = createStore({
		header: null as Header | null,
		direction: -1 as Direction,
	})
	const [searching, setSearching] = createSignal('')

	const toggleSorting = (header: Header) =>
		setSorting(s =>
			s.header === header
				? {
						header: s.direction === -1 ? header : null,
						direction: -s.direction as Direction,
				  }
				: {
						header,
						direction: -1 as Direction,
				  },
		)

	const flatUsers = createMemo(() => flettenUsers(users()))
	const headers = createMemo(
		() => Object.keys(flatUsers()[0] || []) as Header[],
	)

	const getUsers = (): FlatUser[] => {
		const flat = flatUsers()
		const filtered = searching() ? filterList(flat, searching()) : flat
		const sorted = sorting.header
			? sortList(filtered, sorting.header, sorting.direction)
			: filtered

		return sorted
	}

	return (
		<>
			<header class={styles.header}>
				<button onclick={refetch}>Refetch users</button>
				<div>
					<Show when={sorting.header} fallback={'Original order'}>
						Sorting by "{sorting.header}"{' '}
						{sorting.direction === 1 ? 'ASC' : 'DESC'}
					</Show>
				</div>
				<div class="search">
					<label>Filter Table</label>
					<input
						type="text"
						placeholder="Type your query"
						value={searching()}
						oninput={e => setSearching(e.currentTarget.value)}
					/>
				</div>
			</header>
			<Suspense fallback={<div>Loading...</div>}>
				<table class={styles.table}>
					<thead>
						<For each={headers()}>
							{header => (
								<th
									class={sorting.header === header ? 'sorted' : ''}
									onclick={() => toggleSorting(header)}
								>
									{header}
								</th>
							)}
						</For>
					</thead>
					<tbody>
						<For each={getUsers()} fallback={<div>no users...</div>}>
							{user => (
								<tr>
									<For each={headers()}>
										{header => <td>{user[header]}</td>}
									</For>
								</tr>
							)}
						</For>
					</tbody>
				</table>
			</Suspense>
		</>
	)
}

export default Intermediate
