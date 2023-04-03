import React from 'react';
import { ListItem, Grid, ListItemText } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
export default function Message({ message }) {
	const { _id, username, email } = useSelector((state) => state.auth);
	return (
		<ListItem
			className={message.from === _id ? 'message-left' : 'message-right'}
		>
			<Grid container>
				<Grid item xs={12}>
					<ListItemText align="left" primary={message.message}></ListItemText>
				</Grid>
				<Grid item xs={12}>
					<ListItemText
						align="left"
						secondary={new Date(message.createdAt).toLocaleTimeString('en-US')}
					></ListItemText>
					<ListItemText
						align="left"
						secondary={new Date(message.createdAt).toDateString()}
					></ListItemText>
				</Grid>
			</Grid>
		</ListItem>
	);
}
