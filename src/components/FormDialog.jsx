import React, { useState } from 'react';
import { Button, Snackbar, Alert } from '@mui/material';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { LoadingButton } from '@mui/lab';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { fetchFromAPI } from '../helpers';

export default function FormDialog({ open, handleClose }) {
	const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const { email } = useSelector((state) => state.auth);
	const initialValues = { email: '' };
	async function handleSubmit(values, { setSubmitting }) {
		setSubmitting(true);
		const { email } = values;
		const response = await fetchFromAPI('friends/invite', { body: { email } });
		if (response.success) {
			console.log(response);
		} else {
			setErrorMessage(response.error);
			setOpenErrorSnackbar(true);
		}
	}
	function validate(values) {
		const errors = {};
		if (values.email.toLowerCase() === email.toLowerCase()) {
			errors.email = "You can't send invitation to yourself.";
		}
		return errors;
	}
	return (
		<Dialog open={open} onClose={handleClose}>
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
			<DialogTitle>Subscribe</DialogTitle>
			<DialogContent>
				<DialogContentText>
					To invite a friend, please enter their email address here.
				</DialogContentText>
				<Formik
					initialValues={initialValues}
					onSubmit={handleSubmit}
					validate={validate}
					validationSchema={Yup.object().shape({
						email: Yup.string()
							.required('Email required')
							.email('Invalid email')
							.matches(
								/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
								'Invalid email.'
							),
					})}
				>
					{({
						values,
						errors,
						touched,
						handleChange,
						handleBlur,
						handleSubmit,
						isSubmitting,
					}) => (
						<form onSubmit={handleSubmit}>
							<TextField
								autoFocus
								margin="dense"
								id="email"
								name="email"
								label="Email Address To Invite"
								type="email"
								fullWidth
								variant="standard"
								placeholder="Please enter email to invite"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.email}
								error={!!errors.email}
								helperText={errors.email}
							/>
							<DialogActions>
								<Button onClick={handleClose}>Cancel</Button>
								<LoadingButton
									type="submit"
									loading={isSubmitting}
									disabled={!!Object.keys(errors).length}
								>
									Invite
								</LoadingButton>
							</DialogActions>
						</form>
					)}
				</Formik>
			</DialogContent>
		</Dialog>
	);
}
