import React from 'react';
import { makeStyles } from '@mui/styles';
import {
	Grid,
	TextField,
	Divider,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Button,
} from '@mui/material';
import { setChatMessages, setChatUser } from '../features/chat/chatSlice';
import { useDispatch, useSelector } from 'react-redux';
import AvatarWithIndicator from '../components/AvatarWithIndicator';
const useStyles = makeStyles({
	// table: {
	// 	minWidth: 650,
	// },
	// chatSection: {
	// 	width: '100%',
	// 	height: '90vh',
	// },
	// headBG: {
	// 	backgroundColor: '#e0e0e0',
	// },
	borderRight500: {
		borderRight: '1px solid #e0e0e0',
	},
	// messageArea: {
	// 	height: '70vh',
	// 	overflowY: 'auto',
	// },
});

export default function ChatFriends() {
	const classes = useStyles();
	const { friends } = useSelector((state) => state.friends);
	const { chosenChatUser, messages, chatType } = useSelector(
		(state) => state.chat
	);
	const dispatch = useDispatch();
	return (
		// <Grid item xs={3} className={classes.borderRight500}>
		<>
			<Grid item xs={12} style={{ padding: '10px' }}>
				{chosenChatUser && (
					<Button
						variant="contained"
						onClick={() => dispatch(setChatUser(null))}
						sx={{ mb: 1.5 }}
					>
						Go to your workspace
					</Button>
				)}
				<TextField
					id="outlined-basic-email"
					label="Search friends"
					variant="outlined"
					placeholder="Friend name"
					fullWidth
				/>
			</Grid>
			<Divider />
			<List>
				{friends.map((friend) => {
					return (
						<div key={friend._id}>
							<ListItem button onClick={() => dispatch(setChatUser(friend))}>
								<ListItemIcon>
									<AvatarWithIndicator friend={friend} />
								</ListItemIcon>
								<ListItemText
									primary={friend.username}
									sx={{ ml: 1 }}
								></ListItemText>
								<ListItemText
									secondary={friend.isOnline ? 'Online' : 'Offline'}
									align="right"
								></ListItemText>
							</ListItem>
							<Divider />
						</div>
					);
				})}
			</List>
		</>
	);
}
