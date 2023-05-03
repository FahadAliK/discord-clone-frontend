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
	Grow,
	Slide,
} from '@mui/material';

import SendIcon from '@mui/icons-material/Send';
import { PlayForWork } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector, useStore } from 'react-redux';
import AvatarWithIndicator from '../components/AvatarWithIndicator';
import {
	setChatMessages,
	setChatUser,
	setConversation,
} from '../features/chat/chatSlice';
import {
	useCallback,
	useEffect,
	useMemo,
	useState,
	memo,
	useRef,
	useLayoutEffect,
} from 'react';
import { socket } from '../socket';
import { LoadingButton } from '@mui/lab';
import { fetchFromAPI } from '../helpers';
import Message from '../components/Message';
import { Formik } from 'formik';
import * as Yup from 'yup';
import MessageInput from '../components/MessageInput';

const useStyles = makeStyles({
	chatSection: {
		width: '100%',
		height: '93vh',
	},
	borderRight500: {
		borderRight: '1px solid #e0e0e0',
	},
	messageArea: {
		height: '71vh',
		overflowY: 'auto',
	},
});

function Dashboard() {
	const { friends } = useSelector((state) => state.friends);
	const { chosenChatUser } = useSelector((state) => state.chat);
	const { messages } = useSelector((state) => state.chat);
	const messageAreaRef = useRef();
	const videoRef = useRef();
	useLayoutEffect(() => {
		if (messageAreaRef.current) {
			messageAreaRef.current.scrollTop = messageAreaRef.current.scrollHeight;
		}
	}, [messages]);
	const classes = useStyles();
	const dispatch = useDispatch();
	async function fetchUserConversation(friend) {
		console.log(friend);
		const stream = await navigator.mediaDevices.getUserMedia({
			audio: true,
			video: true,
		});
		console.log(stream);
		console.log(stream.getVideoTracks());
		const video = videoRef.current;
		video.srcObject = stream;
		video.onloadedmetadata = () => {
			video.play();
		};
		setTimeout(() => {
			// stream.getTracks().forEach((track) => track.stop());
		}, 2000);
	}
	return (
		<>
			<Grid container component={Paper} className={classes.chatSection}>
				<Grid item xs={3} className={classes.borderRight500}>
					<Grid item xs={12} style={{ padding: '10px' }}>
						<TextField
							id="outlined-basic-email"
							label="Search friends"
							variant="outlined"
							placeholder="Friend name"
							fullWidth
						/>
						<video
							style={{ width: '100%', height: '100%' }}
							ref={videoRef}
							autoPlay
							muted
						></video>
					</Grid>
					<Divider />
					<List>
						{friends.map((friend) => {
							return (
								<div key={friend._id}>
									<ListItem
										button
										onClick={() => {
											dispatch(setChatUser(friend));
											fetchUserConversation(friend);
										}}
									>
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
				</Grid>
				<Grid item xs={9}>
					{chosenChatUser ? (
						<>
							<Paper style={{ background: '#33c9dc' }}>
								<Stack
									style={{ padding: '1rem' }}
									direction="row"
									alignItems="center"
									spacing={2}
								>
									<Avatar
										alt={chosenChatUser.username}
										src={chosenChatUser.imageUrl}
										sx={{ width: 56, height: 56 }}
									/>
									<Stack direction={'column'} sx={{ color: 'white' }}>
										<Typography variant="h6">
											{chosenChatUser.username}
										</Typography>
										<Typography variant="caption" display="block">
											{chosenChatUser.email}
										</Typography>
									</Stack>
								</Stack>
							</Paper>
							<List
								style={{ height: '71vh', overflowY: 'auto' }}
								ref={messageAreaRef}
							>
								{messages.map((message) => {
									return <Message key={message._id} message={message} />;
								})}
							</List>
							<Divider />
							<MessageInput />
						</>
					) : (
						<h1>Please select a user.</h1>
					)}
				</Grid>
			</Grid>
		</>
	);
}

export default Dashboard;
