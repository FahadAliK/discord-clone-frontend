import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isLoading: false,
	successMessage: null,
	errorMessage: null,
};

export const loadingSlice = createSlice({
	name: 'loading',
	initialState: initialState,
	reducers: {
		setLoading: (state, action) => {
			return {
				...initialState,
				isLoading: action.payload,
			};
		},
		setSuccessMessage: (state, action) => {
			return {
				...initialState,
				successMessage: action.payload,
			};
		},
		setErrorMessage: (state, action) => {
			return {
				...initialState,
				errorMessage: action.payload,
			};
		},
	},
});

export const { setLoading, setSuccessMessage, setErrorMessage } =
	loadingSlice.actions;
export default loadingSlice.reducer;
