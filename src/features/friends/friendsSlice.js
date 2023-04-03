import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	friends: [],
	invitations: [],
	onlineUsers: [],
};

export const friendsSlice = createSlice({
	name: 'friends',
	initialState: initialState,
	reducers: {
		setFriends: (state, action) => {
			state.friends = action.payload;
			return state;
		},
		setInvitations: (state, action) => {
			state.invitations = action.payload;
			return state;
		},
		setOnlineUsers: (state, action) => {
			state.onlineUsers = action.payload;
			return state;
		},
	},
});

export const { setFriends, setInvitations, setOnlineUsers } =
	friendsSlice.actions;

export default friendsSlice.reducer;
