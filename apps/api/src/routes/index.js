import { Router } from 'express';
import healthCheck from './health-check.js';
import authRoutes from './auth.js';
import eventRoutes from './events.js';
import wpCommentsRoutes from './wp-comments.js';

const router = Router();

export default () => {
	router.get('/health', healthCheck);

	router.use('/auth', authRoutes());

	router.use('/wp-comments', wpCommentsRoutes);

	router.use('/admin/events', eventRoutes());

	return router;
};
