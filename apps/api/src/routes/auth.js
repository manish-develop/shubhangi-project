import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import supabase from '../lib/supabase.js';
import { requireAdmin, adminLoginRateLimit } from '../middleware/index.js';
import { NodeEnv } from '../constants/common.js';

const router = Router();

const isProduction = process.env.NODE_ENV === NodeEnv.Production;
const cookieOptions = {
	httpOnly: true,
	// Production serves the frontend and API from different domains, so the
	// cookie must be sent cross-site — that requires SameSite=None + Secure.
	secure: isProduction,
	sameSite: isProduction ? 'none' : 'lax',
	maxAge: 7 * 24 * 60 * 60 * 1000,
};

export default () => {
	router.post('/login', adminLoginRateLimit, async (req, res, next) => {
		try {
			const { email, password } = req.body;

			if (!email || !password) {
				return res.status(400).json({ error: 'Email and password are required' });
			}

			const { data: admin, error } = await supabase
				.from('admin_users')
				.select('*')
				.eq('email', email.toLowerCase().trim())
				.maybeSingle();

			if (error) throw error;

			if (!admin || !(await bcrypt.compare(password, admin.password_hash))) {
				return res.status(401).json({ error: 'Invalid email or password' });
			}

			const token = jwt.sign({ id: admin.id, email: admin.email }, process.env.JWT_SECRET, { expiresIn: '7d' });

			res.cookie('admin_token', token, cookieOptions);
			res.json({ success: true, admin: { email: admin.email, name: admin.name } });
		} catch (err) {
			next(err);
		}
	});

	router.post('/logout', (req, res) => {
		res.clearCookie('admin_token', cookieOptions);
		res.json({ success: true });
	});

	router.get('/me', requireAdmin, (req, res) => {
		res.json({ admin: req.admin });
	});

	return router;
};
