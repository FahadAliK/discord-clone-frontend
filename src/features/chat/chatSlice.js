import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	chosenChatUser: null,
	messages: [],
	chatType: null,
};

export const chatSlice = createSlice({
	name: 'chat',
	initialState: initialState,
	reducers: {
		setChatUser: (state, action) => {
			state.chosenChatUser = action.payload;
			state.chatType = 'DIRECT';
			return state;
		},
		setChatMessages: (state, action) => {
			state.messages = action.payload;
			return state;
		},
	},
});

export const { setChatUser, setChatMessages } = chatSlice.actions;

export default chatSlice.reducer;
