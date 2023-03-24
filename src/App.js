import React from 'react';
import { useSelector } from 'react-redux';
import TemporaryDrawer from './components/TemporaryDrawer';
import { connectSocket } from './socket';

function App() {
	const { token } = useSelector((state) => state.auth);
	if (token) {
		connectSocket(token);
	}
	return (
		<div className="App">
			<h1>App component</h1>
			<TemporaryDrawer />
		</div>
	);
}

export default App;
