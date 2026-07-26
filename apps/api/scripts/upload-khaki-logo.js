import dotenv from 'dotenv';
dotenv.config();
import fs from 'fs';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SECRET_KEY);

const filePath = 'C:/Users/Lenovo/OneDrive/Desktop/shubhangi-website/pictures/Maharana-Logo-Khaki.png';
const buffer = fs.readFileSync(filePath);

const { error } = await supabase.storage
	.from('media')
	.upload('clinic/maharana-logo-khaki.png', buffer, { contentType: 'image/png', upsert: true });

if (error) {
	console.error('FAILED:', error.message);
	process.exit(1);
}

const { data } = supabase.storage.from('media').getPublicUrl('clinic/maharana-logo-khaki.png');
console.log('Uploaded:', data.publicUrl);
