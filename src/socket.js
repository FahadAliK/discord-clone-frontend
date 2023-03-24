import { io } from 'socket.io-client';

const URL = 'http://localhost:5002';

export function connectSocket(token) {
	const socket = io(URL, { auth: { token } });
	let socketId;
	socket.on('connect', () => {
		console.log(`Client successfully connected with ID ${socket.id}`);
		socketId = socket.id;
	});
	socket.on('disconnect', () => {
		console.log(`Client successfully disconnected with ID ${socketId}`);
	});
	socket.on('connect_error', (error) => {
		console.log(error);
	});
}
