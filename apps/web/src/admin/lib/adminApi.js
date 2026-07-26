const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const request = async (path, options = {}) => {
	const isFormData = options.body instanceof FormData;

	const res = await fetch(`${API_URL}${path}`, {
		credentials: 'include',
		...options,
		headers: {
			...(isFormData ? {} : { 'Content-Type': 'application/json' }),
			...options.headers,
		},
	});

	if (res.status === 204) return null;

	const data = await res.json().catch(() => null);

	if (!res.ok) {
		throw new Error(data?.error?.message || data?.error || data?.message || 'Something went wrong');
	}

	return data;
};

const toBody = (body) => (body instanceof FormData ? body : JSON.stringify(body));

export const adminApi = {
	get: (path) => request(path),
	post: (path, body) => request(path, { method: 'POST', body: toBody(body) }),
	put: (path, body) => request(path, { method: 'PUT', body: toBody(body) }),
	del: (path) => request(path, { method: 'DELETE' }),
};
