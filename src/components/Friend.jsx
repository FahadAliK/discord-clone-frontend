import React from 'react';

import {
	Button,
	CardActions,
	Typography,
	CardContent,
	Card,
} from '@mui/material';
import AvatarWithIndicator from './AvatarWithIndicator';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setChatUser } from '../features/chat/chatSlice';

export default function Friend({ friend }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	return (
		<Card sx={{ width: '50%' }} variant="outlined">
			<CardContent>
				<AvatarWithIndicator friend={friend} />
				<Typography variant="h5" component="div">
					{friend.username}
				</Typography>
				<Typography sx={{ mb: 1.5 }} color="text.secondary">
					{friend.email}
				</Typography>
			</CardContent>
			<CardActions sx={{ border: '1px solid red' }} className="linear-gradient">
				<Button
					variant="contained"
					onClick={() => {
						dispatch(setChatUser(friend));
						navigate('/dashboard');
					}}
				>
					Chat
				</Button>
			</CardActions>
		</Card>
	);
}
