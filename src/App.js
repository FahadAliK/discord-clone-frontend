import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Friends from './pages/Friends';
import Invitations from './pages/Invitations';
import Dashboard from './pages/Dashboard';
import PrivateRoutes from './shared/PrivateRoutes';
import Layout from './shared/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { connectSocket } from './socket';
import { setFriends, setInvitations } from './features/friends/friendsSlice';
import {
	setSuccessMessage,
	setErrorMessage,
} from './features/loading/loadingSlice';
import { setChatMessages } from './features/chat/chatSlice';
import { useEffect } from 'react';
import { Snackbar, Alert } from '@mui/material';

function App() {
	const { token } = useSelector((state) => state.auth);
	const { successMessage, errorMessage } = useSelector(
		(state) => state.loading
	);
	const dispatch = useDispatch();
	useEffect(() => {
		if (token) {
			const socket = connectSocket(token);
			socket.on('friends-invitations', (invitations) => {
				dispatch(setInvitations(invitations));
			});
			socket.on('friends-list', (friends) => {
				dispatch(setFriends(friends));
			});
			socket.on('new-messages', (data) => {
				// console.log(data);
				// dispatch(setChatMessages(data.messages));
				dispatch(setChatMessages(data));
			});
		}
	}, [token, dispatch]);

	return (
		<div className="App">
			<Snackbar
				open={!!errorMessage}
				autoHideDuration={2000}
				onClose={() => dispatch(setErrorMessage(null))}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
			>
				<Alert
					variant="filled"
					onClose={() => dispatch(setErrorMessage(null))}
					severity="error"
					sx={{ width: '100%' }}
				>
					{errorMessage}
				</Alert>
			</Snackbar>
			<Snackbar
				open={!!successMessage}
				autoHideDuration={2000}
				onClose={() => dispatch(setSuccessMessage(null))}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
			>
				<Alert
					variant="filled"
					onClose={() => dispatch(setSuccessMessage(null))}
					severity="success"
					sx={{ width: '100%' }}
				>
					{successMessage}
				</Alert>
			</Snackbar>
			<Router>
				<Routes>
					<Route element={<PrivateRoutes />}>
						<Route path="/" element={<Layout />}>
							{/* <Route
								element={<AvatarWithIndicator friend={{ isOnline: true }} />}
								index
							/> */}
							{/* <Route element={<h1>Fahad</h1>} index /> */}
							<Route element={<Dashboard />} path="/dashboard" />
							<Route element={<Friends />} path="/friends" />
							<Route element={<Invitations />} path="/invitations" />
							<Route path="*" element={<Dashboard />} />
						</Route>
					</Route>
					<Route element={<LoginPage />} path="/login" />
					<Route element={<RegisterPage />} path="/register" />
					<Route path="*" element={<LoginPage />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
