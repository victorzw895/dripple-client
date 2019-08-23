import React from 'react'
import { IconButton, ChatIcon } from '@livechat/ui-kit'

const Minimized = ({ maximize }) => (
	<div
		onClick={maximize}
		style={{
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			width: '60px',
			height: '60px',
            color: '#fff',
            background: 'linear-gradient(to right, #6D5BBA, #8D58BF)',
			borderRadius: '50%',
			cursor: 'pointer',
		}}
	>
		<IconButton color="#fff">
			<ChatIcon />
		</IconButton>
	</div>
)

export default Minimized
