import React from 'react';
import { styled } from '@mui/material/styles';
import { Badge, Avatar } from '@mui/material';

export default function AvatarWithIndicator({ friend }) {
	let StyledBadge;
	if (friend.isOnline) {
		StyledBadge = styled(Badge)(({ theme }) => ({
			'& .MuiBadge-badge': {
				backgroundColor: '#44b700',
				color: '#44b700',
				boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
				width: '10px',
				height: '10px',
				'&::after': {
					position: 'absolute',
					top: 0,
					left: 0,
					width: '100%',
					height: '100%',
					borderRadius: '50%',
					animation: 'ripple 1.2s infinite ease-in-out',
					border: '1px solid currentColor',
					content: '""',
				},
			},
			'@keyframes ripple': {
				'0%': {
					transform: 'scale(.8)',
					opacity: 1,
				},
				'100%': {
					transform: 'scale(4.4)',
					opacity: 0,
				},
			},
		}));
	} else {
		StyledBadge = styled(Badge)(({ theme }) => ({
			'& .MuiBadge-badge': {
				backgroundColor: 'red',
				color: 'red',
				boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
				width: '10px',
				height: '10px',
			},
		}));
	}
	return (
		<StyledBadge
			overlap="circular"
			anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
			variant="dot"
		>
			<Avatar
				alt={friend.username}
				src="/static/images/avatar/1.jpg"
				sx={{ width: 56, height: 56 }}
			/>
		</StyledBadge>
	);
}
