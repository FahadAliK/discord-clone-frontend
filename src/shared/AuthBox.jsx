import React from 'react';
import { Box } from '@mui/material';
import './AuthBox.styles.scss';

function AuthBox({ children }) {
	return (
		<div className="auth-box-container">
			<Box className="auth-box">{children}</Box>
		</div>
	);
}

export default AuthBox;
