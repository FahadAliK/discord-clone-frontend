import { createSlice } from '@reduxjs/toolkit';

function storeAuthState(authState) {
	localStorage.setItem('user', JSON.stringify(authState));
}

const initialState = {
	username: '',
	email: '',
	token: '',
	success: false,
	message: '',
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
			state = action.payload;
		},
		logOut: (state) => {
			state = initialState;
			localStorage.removeItem('user');
		},
	},
});

export const { authenticate, logOut } = authSlice.actions;

export default authSlice.reducer;
