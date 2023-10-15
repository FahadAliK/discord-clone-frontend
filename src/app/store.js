import { configureStore } from '@reduxjs/toolkit';

import authReducer from '../features/auth/authSlice';
import chatReducer from '../features/chat/chatSlice';
import friendsReducer from '../features/friends/friendsSlice';
import loadingReducer from '../features/loading/loadingSlice';

export default configureStore({
	reducer: {
		auth: authReducer,
		friends: friendsReducer,
		chat: chatReducer,
		loading: loadingReducer,
	},
});
