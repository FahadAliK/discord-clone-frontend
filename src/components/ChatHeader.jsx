import React from 'react';
import { Paper, Stack, Avatar, Typography } from '@mui/material';
export default function ChatHeader({ username, email }) {
	return (
		<Paper style={{ background: '#33c9dc' }}>
			<Stack
				style={{ padding: '1rem' }}
				direction="row"
				alignItems="center"
				spacing={2}
			>
				<Avatar
					alt={username}
					src="/static/images/avatar/1.jpg"
					sx={{ width: 56, height: 56 }}
				/>
				<Stack direction={'column'} sx={{ color: 'white' }}>
					<Typography variant="h6">{username}</Typography>
					<Typography variant="caption" display="block">
						{email}
					</Typography>
				</Stack>
			</Stack>
		</Paper>
	);
}
