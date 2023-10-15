import { useDispatch } from 'react-redux';

import {
	setErrorMessage,
	setSuccessMessage,
} from '../features/loading/loadingSlice';

export default function useAsync() {
	const dispatch = useDispatch();
	const run = (promise, callbackFunction) => {
		if (!promise && !promise.then) {
			throw new Error(
				`The argument passed to useAsync().run must be a promise. Maybe a function that's passed isn't returning anything?`
			);
		}
		return promise
			.then((response) => {
				if (response.success) {
					dispatch(setSuccessMessage(response.message));
					callbackFunction(response);
				} else {
					dispatch(setErrorMessage(response.error));
				}
			})
			.catch((err) => {
				dispatch(setErrorMessage('Please check your internet connection.!'));
			});
	};
	return { run };
}
