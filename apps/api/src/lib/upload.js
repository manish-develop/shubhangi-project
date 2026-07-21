import multer from 'multer';
import supabase from './supabase.js';

const upload = multer({
	storage: multer.memoryStorage(),
	limits: { fileSize: 8 * 1024 * 1024 },
});

const uploadToMedia = async (file, folder = 'uploads') => {
	const ext = file.originalname.split('.').pop();
	const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

	const { error } = await supabase.storage.from('media').upload(path, file.buffer, {
		contentType: file.mimetype,
		upsert: false,
	});

	if (error) throw error;

	const { data } = supabase.storage.from('media').getPublicUrl(path);

	return data.publicUrl;
};

export { upload, uploadToMedia };
