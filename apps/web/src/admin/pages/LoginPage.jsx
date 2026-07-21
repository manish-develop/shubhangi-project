import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAdminAuth } from '../context/AdminAuthContext';

export default function LoginPage() {
	const { admin, loading, login } = useAdminAuth();
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [submitting, setSubmitting] = useState(false);

	if (!loading && admin) {
		return <Navigate to="/admin" replace />;
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		setSubmitting(true);

		try {
			await login(email, password);
			navigate('/admin');
		} catch (err) {
			toast.error(err.message || 'Login failed');
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-muted px-4">
			<form onSubmit={handleSubmit} className="w-full max-w-sm bg-card border border-border rounded-2xl shadow-lg p-8">
				<h1 className="font-serif text-2xl font-bold text-primary text-center mb-1">Maharana Wellness Clinic</h1>
				<p className="text-sm text-muted-foreground text-center mb-6">Admin Login</p>

				<div className="space-y-4">
					<div className="space-y-1.5">
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							autoFocus
						/>
					</div>

					<div className="space-y-1.5">
						<Label htmlFor="password">Password</Label>
						<Input
							id="password"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>

					<Button type="submit" className="w-full" disabled={submitting}>
						{submitting ? 'Signing in...' : 'Sign in'}
					</Button>
				</div>
			</form>
		</div>
	);
}
