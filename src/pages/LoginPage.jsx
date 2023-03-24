import React, { useState } from 'react';
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
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { fetchFromAPI } from '../helpers';
import { useDispatch } from 'react-redux';
import { authenticate } from '../features/auth/authSlice';

function LoginPage() {
	const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
	const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const initialValues = {
		email: '',
		password: '',
	};
	async function handleLogin(values, { setSubmitting }) {
		setSubmitting(true);
		const { email, password } = values;
		const response = await fetchFromAPI('auth/login', {
			body: { email, password },
		});
		if (response.success) {
			dispatch(authenticate(response));
			setOpenSuccessSnackbar(true);
			navigate('/dashboard');
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
					Successfully logged in to your account.
				</Alert>
			</Snackbar>
			<Typography variant="h3" sx={{ color: 'white' }}>
				Discord Clone
			</Typography>
			<Typography variant="h5" sx={{ color: '#B9BBBE' }}>
				Please login to continue
			</Typography>
			<Formik
				initialValues={initialValues}
				validationSchema={Yup.object().shape({
					email: Yup.string()
						.email('Invalid email.')
						.matches(
							/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
							'Invalid email.'
						)
						.required('Email required'),
					password: Yup.string()
						.min(6, 'Password must be 6 characters long.')
						.max(12, 'Password must be atmost 12 characters long.')
						.required('Password is required.'),
				})}
				onSubmit={(values, { setSubmitting }) =>
					handleLogin(values, { setSubmitting })
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
							<Tooltip title="Log in to you account by providing above details.">
								<LoadingButton
									variant="contained"
									color="secondary"
									size="large"
									type="submit"
									loading={isSubmitting}
									disabled={!!Object.keys(errors).length}
								>
									Log In
								</LoadingButton>
							</Tooltip>
							<Tooltip
								title="Don't have an account? create one."
								style={{ display: isSubmitting ? 'none' : '' }}
							>
								<Button
									size="small"
									onClick={() => navigate('/register')}
									variant="outlined"
									color="secondary"
									disabled={isSubmitting}
								>
									Register instead.
								</Button>
							</Tooltip>
						</Stack>
					</form>
				)}
			</Formik>
		</AuthBox>
	);
}

export default LoginPage;
