// Run from apps/api: node scripts/reset-admin-password.js <email> <newPassword>
// Use this when the admin forgets the password. No email flow needed since there is only one admin.
import dotenv from 'dotenv';
dotenv.config();
import bcrypt from 'bcryptjs';
import supabase from '../src/lib/supabase.js';

const [email, newPassword] = process.argv.slice(2);

if (!email || !newPassword) {
	console.error('Usage: node scripts/reset-admin-password.js <email> <newPassword>');
	process.exit(1);
}

const passwordHash = bcrypt.hashSync(newPassword, 10);

const { data, error } = await supabase
	.from('admin_users')
	.update({ password_hash: passwordHash })
	.eq('email', email.toLowerCase().trim())
	.select()
	.maybeSingle();

if (error) {
	console.error('Failed to reset password:', error.message);
	process.exit(1);
}

if (!data) {
	console.error(`No admin found with email ${email}`);
	process.exit(1);
}

console.log(`Password updated for ${data.email}`);
