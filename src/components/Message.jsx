import React from 'react';
import { ListItem, Grid, ListItemText } from '@mui/material';
import { useSelector } from 'react-redux';
export default function Message({ message, className }) {
	const { _id } = useSelector((state) => state.auth);
	const classNames = [];
	classNames.push(className);
	if (message.from === _id) {
		classNames.push('message-left');
	} else {
		classNames.push('message-right');
	}
	return (
		<ListItem className={classNames.join(' ')}>
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
