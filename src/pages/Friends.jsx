import React from 'react';
import { Stack } from '@mui/material';
// import { useSelector } from 'react-redux';
import Friend from '../components/Friend';
import { useDispatch, useSelector } from 'react-redux';
import { setChatMessages, setChatUser } from '../features/chat/chatSlice';
import { redirect, useNavigate } from 'react-router-dom';

function Friends() {
	const { friends } = useSelector((state) => state.friends);

	return (
		<Stack
			spacing={2}
			sx={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				marginTop: '1rem',
			}}
		>
			{friends.map((friend) => (
				<Friend friend={friend} key={friend._id} />
			))}
		</Stack>
	);
}

export default Friends;
