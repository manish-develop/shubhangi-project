// Run from apps/api: node scripts/import-static-diseases.js
//
// NOTE: this must be run AFTER the pending diseases migration
// (short_description/full_description/youtube_url columns etc.) has been
// applied in Supabase, otherwise inserts may fail or land with incomplete
// columns. See apps/api/scripts/pending-migration.sql.
import dotenv from 'dotenv';
dotenv.config();
import { createClient } from '@supabase/supabase-js';
import { diseaseDatabase } from '../../web/src/data/diseaseDatabase.js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SECRET_KEY);

let inserted = 0;
let skipped = 0;
let failed = 0;

for (const disease of diseaseDatabase) {
	const { data: existing } = await supabase
		.from('diseases')
		.select('id')
		.eq('slug', disease.id)
		.maybeSingle();

	if (existing) {
		console.log('Skipped (already exists):', disease.name);
		skipped += 1;
		continue;
	}

	const { error } = await supabase.from('diseases').insert({
		slug: disease.id,
		name: disease.name,
		category: disease.category,
		image: disease.image,
		published: true,
	});

	if (error) {
		console.error('FAILED:', disease.name, error.message);
		failed += 1;
	} else {
		console.log('Inserted:', disease.name);
		inserted += 1;
	}
}

console.log(
	`\nDone. Inserted: ${inserted}, Skipped: ${skipped}, Failed: ${failed}, Total: ${diseaseDatabase.length}`
);
