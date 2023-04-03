import {
	Avatar,
	Typography,
	Card,
	CardContent,
	CardActions,
	Button,
	Stack,
	Snackbar,
	Alert,
} from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchFromAPI } from '../helpers';

function Invitations() {
	const { invitations } = useSelector((state) => state.friends);
	const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
	const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [successMessage, setSuccessMessage] = useState('');
	async function acceptInvitationHandler(id) {
		const response = await fetchFromAPI('friends/invite-accept', {
			body: { id },
		});
		if (response.success) {
			setOpenSuccessSnackbar(true);
			setSuccessMessage(response.message);
		} else {
			setOpenErrorSnackbar(true);
			setErrorMessage(response.error);
		}
	}
	async function rejectInvitationHandler(id) {
		const response = await fetchFromAPI('friends/invite-reject', {
			body: { id },
		});
		if (response.success) {
			setOpenSuccessSnackbar(true);
			setSuccessMessage(response.message);
		} else {
			setOpenErrorSnackbar(true);
			setErrorMessage(response.error);
		}
	}
	return (
		<>
			<Snackbar
				open={openErrorSnackbar}
				autoHideDuration={2000}
				onClose={() => setOpenErrorSnackbar(false)}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
			>
				<Alert
					variant="filled"
					onClose={() => setOpenErrorSnackbar(false)}
					severity="error"
					sx={{ width: '100%' }}
				>
					{errorMessage}
				</Alert>
			</Snackbar>
			<Snackbar
				open={openSuccessSnackbar}
				autoHideDuration={2000}
				onClose={() => setOpenSuccessSnackbar(false)}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
			>
				<Alert
					variant="filled"
					onClose={() => setOpenSuccessSnackbar(false)}
					severity="success"
					sx={{ width: '100%' }}
				>
					{successMessage}
				</Alert>
			</Snackbar>
			<Stack
				spacing={2}
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					marginTop: '1rem',
				}}
			>
				{invitations.map((invitation) => (
					<Card
						sx={{ width: '50%' }}
						key={invitation.invitationId}
						variant="outlined"
					>
						<CardContent>
							<Avatar>{invitation.username.slice(0, 2)}</Avatar>
							<Typography variant="h5" component="div">
								{invitation.username}
							</Typography>
							<Typography sx={{ mb: 1.5 }} color="text.secondary">
								{invitation.email}
							</Typography>
						</CardContent>
						<CardActions
							sx={{ border: '1px solid red' }}
							className="linear-gradient"
						>
							<Button
								variant="contained"
								onClick={() => acceptInvitationHandler(invitation.invitationId)}
							>
								Accept
							</Button>
							<Button
								variant="contained"
								onClick={() => rejectInvitationHandler(invitation.invitationId)}
							>
								Reject
							</Button>
						</CardActions>
					</Card>
				))}
			</Stack>
		</>
	);
}

export default Invitations;
