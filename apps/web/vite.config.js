import path from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { readFileSync } from 'node:fs';

const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'));
const allDeps = Object.keys(pkg.dependencies || {});

export default defineConfig({
	optimizeDeps: {
		include: allDeps,
	},
	plugins: [react()],
	server: {
		port: 3000,
		cors: true,
		fs: {
			strict: true,
			allow: [
				path.resolve(__dirname),
				path.join(path.resolve(__dirname, '../..'), 'node_modules'),
			],
		},
	},
	resolve: {
		extensions: ['.jsx', '.js', '.tsx', '.ts', '.json'],
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
	build: {
		outDir: 'dist',
	},
});
