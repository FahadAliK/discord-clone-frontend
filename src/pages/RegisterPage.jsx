import React from 'react';
import { useDispatch } from 'react-redux';
import { authenticate } from '../features/auth/authSlice';
import AuthBox from '../shared/AuthBox';
import { Typography, TextField, Button, Stack, Tooltip } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { fetchFromAPI, getRegisterSchema } from '../helpers';
import useAsync from '../hooks/useAsync';

function RegisterPage() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { run } = useAsync();

	const initialValues = {
		username: '',
		email: '',
		password: '',
	};
	async function handleRegister(values, { setSubmitting }) {
		setSubmitting(true);
		await run(
			fetchFromAPI('auth/register', {
				body: values,
			}),
			(response) => {
				dispatch(authenticate(response));
				navigate('/');
			}
		);
	}

	return (
		<AuthBox>
			<Typography variant="h3" sx={{ color: 'white' }}>
				Discord Clone
			</Typography>
			<Typography variant="h5" sx={{ color: '#B9BBBE' }}>
				Please register to continue
			</Typography>
			<Formik
				initialValues={initialValues}
				validationSchema={getRegisterSchema()}
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
