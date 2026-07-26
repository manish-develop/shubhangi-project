import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { User, Lock, ArrowRight } from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';

const LOGIN_BG = 'https://gvmdrttrwesitnqgaedl.supabase.co/storage/v1/object/public/media/clinic/login-bg.jpg';

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
		<div
			className="relative min-h-screen flex items-center justify-center px-4 bg-cover bg-center"
			style={{ backgroundImage: `url(${LOGIN_BG})` }}
		>
			<div className="absolute inset-0 bg-black/50" />

			<form
				onSubmit={handleSubmit}
				className="relative z-10 w-full max-w-sm space-y-6 rounded-2xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-lg"
			>
				<div className="text-center">
					<h1 className="font-serif text-2xl font-bold text-white">Maharana Wellness Clinic</h1>
					<p className="mt-1 text-sm text-white/70">Admin Login</p>
				</div>

				<div className="space-y-5">
					<div className="relative z-0">
						<input
							id="login_id"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="peer block w-full appearance-none border-0 border-b-2 border-white/30 bg-transparent px-0 py-2.5 text-sm text-white focus:border-white focus:outline-none focus:ring-0"
							placeholder=" "
							required
							autoFocus
						/>
						<label
							htmlFor="login_id"
							className="pointer-events-none absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-white/70 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-white"
						>
							<User className="-mt-1 mr-2 inline-block" size={16} />
							ID
						</label>
					</div>

					<div className="relative z-0">
						<input
							id="login_password"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="peer block w-full appearance-none border-0 border-b-2 border-white/30 bg-transparent px-0 py-2.5 text-sm text-white focus:border-white focus:outline-none focus:ring-0"
							placeholder=" "
							required
						/>
						<label
							htmlFor="login_password"
							className="pointer-events-none absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-white/70 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-white"
						>
							<Lock className="-mt-1 mr-2 inline-block" size={16} />
							Password
						</label>
					</div>

					<button
						type="submit"
						disabled={submitting}
						className="group flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 font-semibold text-primary-foreground transition-all duration-300 hover:bg-primary/90 disabled:opacity-60"
					>
						{submitting ? 'Signing in...' : 'Sign In'}
						{!submitting && <ArrowRight className="h-5 w-5 transform transition-transform group-hover:translate-x-1" />}
					</button>
				</div>
			</form>
		</div>
	);
}
