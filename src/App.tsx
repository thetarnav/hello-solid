import { Component, For, lazy } from 'solid-js'
import { Routes, Route, Link, useRoutes } from 'solid-app-router'

const routes = [
	{
		path: '/todo',
		component: lazy(() => import('./pages/todo')),
	},
	{
		path: '/intermediate',
		component: lazy(() => import('./pages/intermediate')),
	},
	{
		path: '/',
		component: lazy(() => import('./pages/basic')),
	},
	{
		path: '/basic',
		component: lazy(() => import('./pages/basic')),
	},
	{
		path: '/*all',
		component: lazy(() => import('./pages/basic')),
	},
]

const App: Component = () => {
	const Routes = useRoutes(routes)
	return (
		<>
			<nav>
				<Link class="nav" href="/basic">
					Basic
				</Link>
				<Link class="nav" href="/todo">
					Todo
				</Link>
				<Link class="nav" href="/intermediate">
					Intermediate
				</Link>
			</nav>
			<Routes />
		</>
	)
}

export default App
