const API = 'http://localhost:5002/api/v1';
export async function fetchFromAPI(endpoint, options) {
	const { method, body } = { method: 'POST', body: null, ...options };

	const user =
		localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'));

	const token = (user && user.token) || '';
	try {
		const res = await fetch(`${API}/${endpoint}`, {
			method,
			...(body && { body: JSON.stringify(body) }),
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
		return await res.json();
	} catch (error) {
		console.log(error);
		throw new Error(error);
	}
}

export function getRandomColor() {}
