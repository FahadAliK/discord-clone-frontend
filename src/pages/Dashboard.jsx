import {
	TextField,
	Grid,
	ListItemText,
	Divider,
	ListItem,
	Avatar,
	List,
	Typography,
	Paper,
	Fab,
	ListItemIcon,
	CircularProgress,
	Stack,
	Button,
} from '@mui/material';

import SendIcon from '@mui/icons-material/Send';
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import AvatarWithIndicator from '../components/AvatarWithIndicator';
import { setChatMessages, setChatUser } from '../features/chat/chatSlice';
import { useEffect, useState } from 'react';
import { socket } from '../socket';
import { LoadingButton } from '@mui/lab';
import { fetchFromAPI } from '../helpers';
import ChatHeader from '../components/ChatHeader';
import ChatFriends from '../components/ChatFriends';
import Message from '../components/Message';

const useStyles = makeStyles({
	// table: {
	// 	minWidth: 650,
	// },
	chatSection: {
		width: '100%',
		height: '93vh',
	},
	// headBG: {
	// 	backgroundColor: '#e0e0e0',
	// },
	borderRight500: {
		borderRight: '1px solid #e0e0e0',
	},
	messageArea: {
		height: '73vh',
		overflowY: 'auto',
	},
});

function Dashboard() {
	const classes = useStyles();
	const [message, setMessage] = useState('');
	const [conversation, setConversation] = useState(null);
	// const { friends } = useSelector((state) => state.friends);
	const { chosenChatUser, messages, chatType } = useSelector(
		(state) => state.chat
	);
	const { _id, username, email } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	useEffect(() => {
		const list = document.getElementById('list');
		if (list) {
			list.scrollTop = list.scrollHeight;
		}
	}, [messages]);

	async function fetchConversation() {
		const response = await fetchFromAPI('conversations/user-conversation', {
			body: { userId: chosenChatUser._id },
		});
		if (response.success) {
			setConversation(response.conversation);
			dispatch(setChatMessages(response.conversation.messages));
		} else {
		}
	}
	async function fetchMyConversation() {
		const response = await fetchFromAPI('conversations/my-conversation', {
			method: 'GET',
		});
		if (response.success) {
			setConversation(response.conversation);
			dispatch(setChatMessages(response.conversation.messages));
		} else {
		}
	}

	useEffect(() => {
		if (!chosenChatUser) {
			fetchMyConversation();
		} else {
			fetchConversation();
		}
	}, [chosenChatUser]);

	function sendMessageHandler() {
		setMessage('');
		let data = null;
		if (chosenChatUser) {
			data = {
				conversationId: conversation._id,
				from: _id,
				to: chosenChatUser._id,
				message,
				type: chatType,
			};
		} else {
			data = {
				conversationId: conversation._id,
				from: _id,
				to: _id,
				message,
				type: 'WORKSPACE',
			};
		}
		socket.emit('direct-message', data);
	}
	return (
		<>
			<Grid container component={Paper} className={classes.chatSection}>
				<Grid item xs={3} classes={classes.borderRight500}>
					<ChatFriends />
					// TODO: Group Chat Component Goes Here.
				</Grid>
				<Grid item xs={9}>
					{chosenChatUser ? (
						<ChatHeader
							username={chosenChatUser.username}
							email={chosenChatUser.email}
						/>
					) : (
						<ChatHeader username={username} email={email} />
					)}
					<List className={classes.messageArea} id="list">
						{messages.map((message) => {
							return <Message key={message._id} message={message} />;
						})}
					</List>
					<Divider />
					<Grid container style={{ padding: '20px' }}>
						<Grid item xs={11}>
							<TextField
								id="outlined-basic-email"
								label="Type Something"
								value={message}
								onChange={(event) => setMessage(event.target.value)}
								fullWidth
								onKeyDown={(event) =>
									event.key === 'Enter' && sendMessageHandler()
								}
							/>
						</Grid>
						<Grid xs={1} align="right">
							<Fab
								color="secondary"
								aria-label="add"
								onClick={sendMessageHandler}
								// disabled={true}
							>
								<SendIcon />
								{/* <CircularProgress
									size={30}
									thickness={4}
									color="secondary"
									disableShrink={true}
								/> */}
							</Fab>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</>
	);
}

export default Dashboard;
