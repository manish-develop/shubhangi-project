// All blog articles now live in the database (managed via the admin panel).
// This file is kept as a graceful-degradation fallback if the API is ever
// unreachable — see apps/web/src/lib/blogs.js.
export const blogArticles = [];
