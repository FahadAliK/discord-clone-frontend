import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authenticate } from '../features/auth/authSlice';
import AuthBox from '../shared/AuthBox';
import {
	Typography,
	TextField,
	Button,
	Stack,
	Snackbar,
	Alert,
	Tooltip,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Formik } from 'formik';
import { redirect, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { fetchFromAPI } from '../helpers';

function RegisterPage() {
	const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
	const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const initialValues = {
		username: '',
		email: '',
		password: '',
	};
	async function handleRegister(values, { setSubmitting }) {
		setSubmitting(true);
		const { username, email, password } = values;
		const response = await fetchFromAPI('auth/register', {
			body: { username, email, password },
		});
		if (response.success) {
			setOpenSuccessSnackbar(true);
			dispatch(authenticate(response));
			navigate('/');
		} else {
			setErrorMessage(response.error);
			setOpenErrorSnackbar(true);
		}
	}
	return (
		<AuthBox>
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
					{/* Email already in use, Please log in. */}
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
					Successfully registered to app.
				</Alert>
			</Snackbar>
			<Typography variant="h3" sx={{ color: 'white' }}>
				Discord Clone
			</Typography>
			<Typography variant="h5" sx={{ color: '#B9BBBE' }}>
				Please register to continue
			</Typography>
			<Formik
				initialValues={initialValues}
				validationSchema={Yup.object().shape({
					username: Yup.string()
						.required('Username required.')
						.max(
							12,
							'Username must be less than or equal to 12 characters long.'
						)
						.min(3, 'Username must be at least 3 characters long.'),
					email: Yup.string()
						.email('Invalid email.')
						.matches(
							/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
							'Invalid email.'
						)
						.required('Email required'),

					password: Yup.string()
						.min(6, 'Password must be atleast 6 characters long.')
						.max(12, 'Password must be atmost 12 characters long.')
						.required('Password is required.'),
				})}
				onSubmit={(values, { setSubmitting }) =>
					handleRegister(values, { setSubmitting })
				}
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
					<form className="form" onSubmit={handleSubmit}>
						<TextField
							id="username"
							label="Username"
							name="username"
							variant="outlined"
							type="text"
							required
							placeholder="Please enter your username."
							margin="normal"
							fullWidth
							onChange={handleChange}
							onBlur={handleBlur}
							value={values.username}
							error={!!errors.username}
							helperText={errors.username}
						/>
						<TextField
							id="email"
							label="Email"
							name="email"
							variant="outlined"
							type="email"
							required
							placeholder="Please enter your email."
							margin="normal"
							fullWidth
							onChange={handleChange}
							onBlur={handleBlur}
							value={values.email}
							error={!!errors.email}
							helperText={errors.email}
						/>
						<TextField
							id="password"
							label="Password"
							name="password"
							variant="outlined"
							type="password"
							required
							placeholder="Please enter your password."
							margin="normal"
							fullWidth
							onChange={handleChange}
							onBlur={handleBlur}
							value={values.password}
							error={!!errors.password}
							helperText={errors.password}
						/>
						<Stack direction="row" spacing={4}>
							<Tooltip title="Register youself by providing above details.">
								<LoadingButton
									variant="contained"
									color="secondary"
									size="large"
									type="submit"
									loading={isSubmitting}
									disabled={!!Object.keys(errors).length}
								>
									Register
								</LoadingButton>
							</Tooltip>
							<Tooltip
								title="Already have an account, Then log in with you email and password."
								style={{ display: isSubmitting ? 'none' : '' }}
							>
								<Button
									size="small"
									onClick={() => navigate('/login')}
									variant="outlined"
									color="secondary"
									disabled={isSubmitting}
								>
									Login instead.
								</Button>
							</Tooltip>
						</Stack>
					</form>
				)}
			</Formik>
		</AuthBox>
	);
}

export default RegisterPage;
