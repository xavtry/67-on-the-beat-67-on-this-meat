import { defineConfig } from 'vite';
export default defineConfig({ base: process.env.GITHUB_ACTIONS ? `/${process.env.GITHUB_REPOSITORY?.split('/')[1] || ''}/` : '/', build: { target: 'es2022' } });
