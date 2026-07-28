import { Router } from 'express';
import healthCheck from './health-check.js';
import authRoutes from './auth.js';
import patientRoutes from './patients.js';
import prescriptionRoutes from './prescriptions.js';
import notificationRoutes from './notifications.js';
import eventRoutes from './events.js';
import { publicRouter as publicBlogs, adminRouter as adminBlogs } from './blogs.js';
import { publicRouter as publicTestimonials, adminRouter as adminTestimonials } from './testimonials.js';
import { publicRouter as publicDiseases, adminRouter as adminDiseases } from './diseases.js';
import { publicRouter as publicYoutube, adminRouter as adminYoutube } from './youtube.js';
import { publicRouter as publicReviews, adminRouter as adminReviews } from './reviews.js';
import { publicRouter as publicBlogFeedback, adminRouter as adminBlogFeedback } from './blog-feedback.js';

const router = Router();

export default () => {
	router.get('/health', healthCheck);

	router.use('/auth', authRoutes());

	router.use('/blogs', publicBlogs);
	router.use('/testimonials', publicTestimonials);
	router.use('/diseases', publicDiseases);
	router.use('/youtube-videos', publicYoutube);
	router.use('/reviews', publicReviews);
	router.use('/blog-feedback', publicBlogFeedback);

	router.use('/admin/blogs', adminBlogs);
	router.use('/admin/testimonials', adminTestimonials);
	router.use('/admin/diseases', adminDiseases);
	router.use('/admin/youtube-videos', adminYoutube);
	router.use('/admin/reviews', adminReviews);
	router.use('/admin/blog-feedback', adminBlogFeedback);
	router.use('/admin/patients', patientRoutes());
	router.use('/admin/prescriptions', prescriptionRoutes());
	router.use('/admin/notifications', notificationRoutes());
	router.use('/admin/events', eventRoutes());

	return router;
};
