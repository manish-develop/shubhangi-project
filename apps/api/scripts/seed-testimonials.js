// Run from apps/api: node scripts/seed-testimonials.js
import dotenv from 'dotenv';
dotenv.config();
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SECRET_KEY);

const BASE = 'https://gvmdrttrwesitnqgaedl.supabase.co/storage/v1/object/public/media/clinic';

const cases = [
	{ title: 'Hands Eczema', category: 'Skin', file: 'hands-eczema-test-1.jpeg' },
	{ title: 'Fungal Infection', category: 'Skin', file: 'fungal-infection-test-2.jpeg' },
	{ title: 'Alopecia Areata', category: 'Skin', file: 'alopecia-areata-test-3.jpeg' },
	{ title: 'Wart Removal', category: 'Skin', file: 'wart-removal-test-4.jpeg' },
	{ title: 'Ganglion Cyst', category: 'Skin', file: 'ganglion-cyst-test-5.jpeg' },
	{ title: 'Urticaria Case', category: 'Skin', file: 'urticaria-case-test-6.jpeg' },
	{ title: 'Hyperpigmentation', category: 'Skin', file: 'hyperpigmentation-case-test-7.jpeg' },
	{ title: 'Hair Fall Case', category: 'Hair', file: 'hairfall-case-test-8.jpeg' },
	{ title: 'Varicose Veins', category: 'Other', file: 'varicose-veins-test-9.jpeg' },
	{ title: 'Acne Case', category: 'Skin', file: 'acne-case-test-10.jpeg' },
	{ title: 'Hands Psoriasis', category: 'Skin', file: 'hands-psoriasis-test-11.jpeg' },
	{ title: 'Vitiligo Case', category: 'Skin', file: 'vitiligo-case-test-12.jpeg' },
];

for (const [index, c] of cases.entries()) {
	const { error } = await supabase.from('testimonials').insert({
		title: c.title,
		category: c.category,
		before_image: `${BASE}/${c.file}`,
		after_image: `${BASE}/${c.file}`,
		published: true,
		display_order: index,
	});

	if (error) {
		console.error('FAILED:', c.title, error.message);
	} else {
		console.log('Inserted:', c.title);
	}
}

console.log('Done.');
