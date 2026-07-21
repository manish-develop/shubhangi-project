import { createClient } from '@supabase/supabase-js';

let client;

const getClient = () => {
	if (!client) {
		client = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SECRET_KEY, {
			auth: {
				autoRefreshToken: false,
				persistSession: false,
			},
		});
	}

	return client;
};

const supabase = new Proxy({}, {
	get: (_target, prop) => getClient()[prop],
});

export default supabase;
export { supabase };
