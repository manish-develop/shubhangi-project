import rateLimit from 'express-rate-limit';

export const adminLoginRateLimit = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 5,
	standardHeaders: true,
	legacyHeaders: false,
	message: { error: 'Too many login attempts, please try again later' },
	validate: { trustProxy: false },
});
