import { Component, lazy } from 'solid-js'
import { Link, useRoutes } from 'solid-app-router'

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
		path: '/slider',
		component: lazy(() => import('./pages/slider')),
	},
	{
		path: '/kanban',
		component: lazy(() => import('./pages/kanban')),
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
				<Link class="nav" href="/slider">
					Slider
				</Link>
				<Link class="nav" href="/kanban">
					Kanban
				</Link>
			</nav>
			<Routes />
		</>
	)
}

export default App
