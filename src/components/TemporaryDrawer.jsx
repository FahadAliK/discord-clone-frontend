import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import FormDialog from './FormDialog';

export default function TemporaryDrawer({ openDrawer, toggleDrawer }) {
	const [open, setOpen] = useState(false);
	const handleClickOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const list = () => (
		<Box
			sx={{ width: 250 }}
			role="presentation"
			onClick={() => toggleDrawer(false)}
			onKeyDown={() => toggleDrawer(false)}
		>
			<List>
				{['Inbox', 'Starred', 'Invite friend', 'Drafts'].map((text, index) => (
					<ListItem key={text} disablePadding>
						<ListItemButton
							onClick={() => {
								if (index === 2) {
									handleClickOpen();
								}
							}}
						>
							<ListItemIcon>
								{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
							</ListItemIcon>
							<ListItemText primary={text} />
						</ListItemButton>
					</ListItem>
				))}
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
