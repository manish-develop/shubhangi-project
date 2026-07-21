import React, { createContext, useContext, useEffect, useState } from 'react';
import { adminApi } from '../lib/adminApi';

const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
	const [admin, setAdmin] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		adminApi
			.get('/auth/me')
			.then((data) => setAdmin(data.admin))
			.catch(() => setAdmin(null))
			.finally(() => setLoading(false));
	}, []);

	const login = async (email, password) => {
		const data = await adminApi.post('/auth/login', { email, password });
		setAdmin(data.admin);
		return data;
	};

	const logout = async () => {
		await adminApi.post('/auth/logout', {});
		setAdmin(null);
	};

	return (
		<AdminAuthContext.Provider value={{ admin, loading, login, logout }}>
			{children}
		</AdminAuthContext.Provider>
	);
}

export const useAdminAuth = () => useContext(AdminAuthContext);
