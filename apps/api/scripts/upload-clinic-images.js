// Run from apps/api: node scripts/upload-clinic-images.js
import dotenv from 'dotenv';
dotenv.config();
import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SECRET_KEY);

const sourceDir = 'C:\\Users\\Lenovo\\OneDrive\\Desktop\\shubhangi-website\\shubhangi - project';

const files = fs.readdirSync(sourceDir).filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f));

const results = {};

for (const file of files) {
	const filePath = path.join(sourceDir, file);
	const buffer = fs.readFileSync(filePath);
	const ext = path.extname(file);
	const safeName = file
		.replace(ext, '')
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/(^-|-$)/g, '');
	const storagePath = `clinic/${safeName}${ext.toLowerCase()}`;

	const contentTypeMap = { '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp', '.avif': 'image/avif' };

	const { error } = await supabase.storage.from('media').upload(storagePath, buffer, {
		contentType: contentTypeMap[ext.toLowerCase()] || 'application/octet-stream',
		upsert: true,
	});

	if (error) {
		console.error('FAILED:', file, error.message);
		continue;
	}

	const { data } = supabase.storage.from('media').getPublicUrl(storagePath);
	results[file] = data.publicUrl;
	console.log('Uploaded:', file, '->', data.publicUrl);
}

fs.writeFileSync(
	path.join(sourceDir, '_uploaded-urls.json'),
	JSON.stringify(results, null, 2)
);

console.log('\nDone. URL map saved to _uploaded-urls.json');
