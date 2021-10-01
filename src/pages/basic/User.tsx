import { Component } from 'solid-js'
import * as API from '../../types/randomuserme'

import styles from './Basic.module.scss'

interface Props {
	name: API.Name
	img: string
}

const fullName = (name: API.Name): string =>
	`${name.title} ${name.first} ${name.last}`

const User: Component<Props> = props => (
	<div class={styles.User}>
		<img src={props.img} />
		<h4 class="name">{fullName(props.name)}</h4>
	</div>
)

export default User
