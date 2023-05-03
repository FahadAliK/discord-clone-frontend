import React, { useState } from 'react';
import { Grid, TextField, Fab, CircularProgress } from '@mui/material';
import { Send } from '@mui/icons-material';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { fetchFromAPI } from '../helpers';
import { useSelector } from 'react-redux';

export default function MessageInput() {
	const { chosenChatUser, conversation, chatType } = useSelector(
		(state) => state.chat
	);
	const { _id } = useSelector((state) => state.auth);
	const initialValues = { message: '' };

	async function sendMessageHandler(values, { setSubmitting }) {
		const body = {
			conversationId: conversation._id,
			from: _id,
			to: chosenChatUser._id,
			message: values.message,
			type: chatType,
		};

		const response = await fetchFromAPI('messages/create-message', {
			body,
		});
		if (response.success) {
			values.message = '';
		} else {
		}
		console.log(response);
	}

	return (
		<Grid container style={{ padding: '20px' }}>
			<Formik
				initialValues={initialValues}
				validationSchema={Yup.object().shape({
					message: Yup.string().required('You cannot send an empty message.'),
				})}
				onSubmit={sendMessageHandler}
			>
				{({
					values,
					errors,
					touchec,
					handleChange,
					handleBlur,
					handleSubmit,
					isSubmitting,
				}) => (
					<form style={{ display: 'contents' }} onSubmit={handleSubmit}>
						<Grid item xs={11}>
							<TextField
								id="outlined-basic-email"
								label="Type Something"
								name="message"
								value={values.message}
								onChange={handleChange}
								onBlur={handleBlur}
								error={!!errors.message}
								helperText={errors.message}
								required
								placeholder="Please type a message to send"
								fullWidth
							/>
						</Grid>
						<Grid item xs={1} align="right">
							<Fab
								type="submit"
								color="secondary"
								aria-label="add"
								disabled={!!Object.keys(errors).length || isSubmitting}
							>
								{isSubmitting ? (
									<CircularProgress
										size={30}
										thickness={4}
										color="secondary"
										disableShrink={true}
									/>
								) : (
									<Send />
								)}
							</Fab>
						</Grid>
					</form>
				)}
			</Formik>
		</Grid>
	);
}
