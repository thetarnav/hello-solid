import { Component, lazy } from 'solid-js'
import { Routes, Route, Link } from 'solid-app-router'

const Basic = lazy(() => import('./pages/basic'))
const Todo = lazy(() => import('./pages/todo'))

const App: Component = () => (
	<>
		<nav>
			<Link class="nav" href="/">
				Home
			</Link>
			<Link class="nav" href="/basic">
				Basic
			</Link>
			<Link class="nav" href="/todo">
				Todo
			</Link>
		</nav>
		<Routes>
			<Route path="/basic" element={<Basic />} />
			<Route path="/todo" element={<Todo />} />
		</Routes>
	</>
)

export default App
