import { createSlice } from '@reduxjs/toolkit';

function storeAuthState(authState) {
	localStorage.setItem('user', JSON.stringify(authState));
}

const initialState = {
	_id: '',
	username: '',
	email: '',
	token: '',
	success: false,
	message: '',
	imageUrl: '',
};

const authStateFormStorage = localStorage.getItem('user')
	? JSON.parse(localStorage.getItem('user'))
	: initialState;

export const authSlice = createSlice({
	name: 'auth',
	initialState: authStateFormStorage,
	reducers: {
		authenticate: (state, action) => {
			storeAuthState(action.payload);
			state = { ...action.payload };
			return state;
		},
		logOut: (state) => {
			state = initialState;
			localStorage.removeItem('user');
			return state;
		},
	},
});

export const { authenticate, logOut } = authSlice.actions;

export default authSlice.reducer;
