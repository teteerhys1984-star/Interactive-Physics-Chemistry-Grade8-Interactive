import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({ base: '/Interactive-Physics-Chemistry-Grade8-Interactive/', plugins: [react()], server: { host: '0.0.0.0', allowedHosts: true } });
