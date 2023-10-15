import * as Yup from 'yup';
const API = 'http://localhost:5002/api/v1';
export async function fetchFromAPI(endpoint, options) {
	const { method, body } = { method: 'POST', body: null, ...options };

	const user =
		localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'));

	const token = (user && user.token) || '';
	const res = await fetch(`${API}/${endpoint}`, {
		method,
		...(body && { body: JSON.stringify(body) }),
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	});
	return await res.json();
}

export function getRandomColor() {}

export function getLoginSchema() {
	return Yup.object().shape({
		email: Yup.string()
			.email('Invalid email.')
			.matches(
				/^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/,
				'Invalid email.'
			)
			.required('Email required'),
		password: Yup.string()
			.min(6, 'Password must be 6 characters long.')
			.max(12, 'Password must be atmost 12 characters long.')
			.required('Password is required.'),
	});
}

export function getRegisterSchema() {
	return Yup.object().shape({
		username: Yup.string()
			.required('Username required.')
			.max(12, 'Username must be less than or equal to 12 characters long.')
			.min(3, 'Username must be at least 3 characters long.'),
		email: Yup.string()
			.email('Invalid email.')
			.matches(
				/^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/,
				'Invalid email.'
			)
			.required('Email required'),

		password: Yup.string()
			.min(6, 'Password must be atleast 6 characters long.')
			.max(12, 'Password must be atmost 12 characters long.')
			.required('Password is required.'),
	});
}
