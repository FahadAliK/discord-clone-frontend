import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	chosenChatUser: null,
	messages: [],
	chatType: null,
	conversation: null,
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
			state.messages.push(action.payload);
			return state;
		},
		setConversation: (state, action) => {
			state.conversation = action.payload;
			return state;
		},
	},
});

export const { setChatUser, setChatMessages, setConversation } =
	chatSlice.actions;

export default chatSlice.reducer;
