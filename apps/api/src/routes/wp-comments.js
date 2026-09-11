import { Router } from 'express';

// Proxies comment submission to the WordPress REST API using an
// Application Password. This has to happen server-side: the WordPress
// install requires an authenticated request to create a comment ("Users
// must be registered and logged in to comment" is on), and the
// Application Password can never be shipped to the browser.
const router = Router();

const WP_BASE = 'https://blog.drmaharanas.com/wp-json/wp/v2';

router.post('/', async (req, res, next) => {
	try {
		const { postId, name, email, content } = req.body;

		if (!postId || !name?.trim() || !email?.trim() || !content?.trim()) {
			return res.status(400).json({ error: 'postId, name, email and content are required' });
		}

		if (!process.env.WP_USERNAME || !process.env.WP_APP_PASSWORD) {
			return res.status(500).json({ error: 'WordPress credentials are not configured on the server' });
		}

		const authHeader = 'Basic ' + Buffer.from(`${process.env.WP_USERNAME}:${process.env.WP_APP_PASSWORD}`).toString('base64');

		const wpRes = await fetch(`${WP_BASE}/comments`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: authHeader,
			},
			body: JSON.stringify({
				post: postId,
				author_name: name.trim().slice(0, 200),
				author_email: email.trim().slice(0, 200),
				content: content.trim().slice(0, 5000),
			}),
		});

		const data = await wpRes.json();
		if (!wpRes.ok) {
			return res.status(wpRes.status).json({ error: data?.message || 'WordPress rejected the comment' });
		}

		res.status(201).json({
			id: data.id,
			parent: data.parent || 0,
			author: data.author_name || name.trim(),
			avatar: data.author_avatar_urls?.['48'] || null,
			content: data.content?.rendered?.replace(/<[^>]*>/g, '') || content.trim(),
			date: data.date,
		});
	} catch (err) {
		next(err);
	}
});

export default router;
