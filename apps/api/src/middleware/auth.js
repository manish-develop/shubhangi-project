import jwt from 'jsonwebtoken';

const requireAdmin = (req, res, next) => {
	const token = req.cookies?.admin_token;

	if (!token) {
		return res.status(401).json({ error: 'Not authenticated' });
	}

	try {
		req.admin = jwt.verify(token, process.env.JWT_SECRET);
		next();
	} catch {
		return res.status(401).json({ error: 'Invalid or expired session' });
	}
};

export default requireAdmin;
export { requireAdmin };
