import { Router } from 'express';
import supabase from '../lib/supabase.js';
import { requireAdmin } from '../middleware/index.js';

const router = Router();
router.use(requireAdmin);

// Follow-ups due this week + events starting within the next hour, soonest first
router.get('/', async (req, res, next) => {
	try {
		const now = new Date();
		const today = now.toISOString().slice(0, 10);
		const weekAhead = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
		const hourAhead = new Date(now.getTime() + 60 * 60 * 1000).toISOString();
		const dayBehind = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString();

		const [followUps, events] = await Promise.all([
			supabase
				.from('prescriptions')
				.select('id, follow_up_date, patient_id, patients(id, name, phone)')
				.gte('follow_up_date', today)
				.lte('follow_up_date', weekAhead)
				.order('follow_up_date', { ascending: true }),
			supabase
				.from('events')
				.select('id, title, start_time, end_time, category')
				.gte('start_time', dayBehind)
				.lte('start_time', hourAhead)
				.order('start_time', { ascending: true }),
		]);

		if (followUps.error) throw followUps.error;
		if (events.error) throw events.error;

		const followUpNotifications = (followUps.data || [])
			.filter((p) => p.patients)
			.map((p) => ({
				type: 'follow_up',
				id: `follow_up-${p.id}`,
				patient_id: p.patient_id,
				patient_name: p.patients.name,
				patient_phone: p.patients.phone,
				follow_up_date: p.follow_up_date,
				is_today: p.follow_up_date === today,
				sort_time: `${p.follow_up_date}T00:00:00.000Z`,
			}));

		const eventNotifications = (events.data || []).map((e) => ({
			type: 'event',
			id: `event-${e.id}`,
			event_id: e.id,
			title: e.title,
			category: e.category,
			start_time: e.start_time,
			end_time: e.end_time,
			is_soon: new Date(e.start_time) - now <= 60 * 60 * 1000 && new Date(e.start_time) - now > 0,
			is_started: new Date(e.start_time) <= now,
			sort_time: e.start_time,
		}));

		const notifications = [...followUpNotifications, ...eventNotifications].sort(
			(a, b) => new Date(a.sort_time) - new Date(b.sort_time)
		);

		res.json(notifications);
	} catch (err) {
		next(err);
	}
});

export default () => router;
