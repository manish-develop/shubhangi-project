import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';

export function ProtectedRoute({ children }) {
	const { admin, loading } = useAdminAuth();

	if (loading) {
		return <div className="flex items-center justify-center min-h-screen text-muted-foreground">Loading...</div>;
	}

	if (!admin) {
		return <Navigate to="/admin/login" replace />;
	}

	return children;
}
