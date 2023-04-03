import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import FormDialog from './FormDialog';
import { NavLink, useNavigate } from 'react-router-dom';

export default function TemporaryDrawer({ openDrawer, toggleDrawer }) {
	const [open, setOpen] = useState(false);
	const handleClickOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const navigate = useNavigate();
	const list = () => (
		<Box
			sx={{ width: 250 }}
			role="presentation"
			onClick={() => toggleDrawer(false)}
			onKeyDown={() => toggleDrawer(false)}
		>
			<List>
				{['Dashboard', 'Friends', 'Invite friend', 'Invitations'].map(
					(text, index) => {
						let toLink = '/';
						switch (text) {
							case 'Friends':
								toLink = '/friends';
								break;
							case 'Invitations':
								toLink = '/invitations';
								break;
						}
						return (
							<ListItem key={text} disablePadding>
								<ListItemButton
									onClick={() => {
										switch (index) {
											case 0:
												navigate('/dashboard');
												break;
											case 1:
												navigate('/friends');
												break;
											case 2:
												handleClickOpen();
												break;
											case 3:
												navigate('/invitations');
												break;
										}
									}}
								>
									<ListItemIcon>
										{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
									</ListItemIcon>
									<NavLink to={toLink}>
										<ListItemText primary={text} />
									</NavLink>
								</ListItemButton>
							</ListItem>
						);
					}
				)}
			</List>
			<Divider />
			<List>
				{['All mail', 'Trash', 'Spam'].map((text, index) => (
					<ListItem key={text} disablePadding>
						<ListItemButton>
							<ListItemIcon>
								{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
							</ListItemIcon>
							<ListItemText primary={text} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Box>
	);

	return (
		<div>
			<React.Fragment key={1}>
				<Drawer
					anchor={'left'}
					open={openDrawer}
					onClose={() => toggleDrawer(false)}
				>
					{list()}
				</Drawer>
				<FormDialog open={open} handleClose={handleClose} />
			</React.Fragment>
		</div>
	);
}
