import React from 'react';
import AuthBox from '../shared/AuthBox';
import { Typography, TextField, Button, Stack, Tooltip } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { fetchFromAPI, getLoginSchema } from '../helpers';
import { useDispatch } from 'react-redux';
import { authenticate } from '../features/auth/authSlice';
import {
	setErrorMessage,
	setSuccessMessage,
} from '../features/loading/loadingSlice';

function LoginPage() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const initialValues = {
		email: '',
		password: '',
	};
	async function handleLogin(values, { setSubmitting }) {
		setSubmitting(true);
		const { email, password } = values;
		try {
			const response = await fetchFromAPI('auth/login', {
				body: { email, password },
			});
			if (response && response.success) {
				dispatch(authenticate(response));
				dispatch(setSuccessMessage(response.message));
				navigate('/');
			} else {
				dispatch(setErrorMessage(response.error));
			}
		} catch (err) {
			dispatch(setErrorMessage('Please check your internet connection.!'));
		}
	}
	return (
		<AuthBox>
			<Typography variant="h3" sx={{ color: 'white' }}>
				Discord Clone
			</Typography>
			<Typography variant="h5" sx={{ color: '#B9BBBE' }}>
				Please login to continue
			</Typography>
			<Formik
				initialValues={initialValues}
				validationSchema={getLoginSchema()}
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
