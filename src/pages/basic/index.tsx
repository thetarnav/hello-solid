import { Component, createResource, For } from 'solid-js'
import * as API from '../../types/randomuserme'

import User from './User'

const fetchUsers = async (page = 0): Promise<API.User[]> => {
	const res = await fetch(`https://randomuser.me/api?results=6&page=${page}`)
	const json = await res.json()
	return json.results
}

const Basic: Component = () => {
	let page = 0

	const [users, { refetch }] = createResource<API.User[]>(
		async (a, getPrev) => {
			const prev = getPrev() ?? [],
				data = await fetchUsers(++page)
			return [...prev, ...data]
		},
	)

	return (
		<>
			<For each={users()} fallback={<div>Loading...</div>}>
				{user => <User name={user.name} img={user.picture.thumbnail} />}
			</For>
			<button onclick={refetch}>Fetch more!</button>
		</>
	)
}

export default Basic
