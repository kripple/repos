import * as childProcess from 'child_process';
import dns from 'dns';
import { resolve } from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

dns.setDefaultResultOrder('verbatim');

const gitString = (type: 'branch' | 'hash') => {
  const command =
    type === 'branch'
      ? 'git branch --show-current'
      : 'git rev-parse --short HEAD';
  const value = childProcess.execSync(command).toString().trimEnd();
  return JSON.stringify(value);
};

// https://vitejs.dev/config/
export default defineConfig({
  base: '/repos/',
  build: {
    outDir: 'docs',
  },
  clearScreen: false,
  define: {
    'import.meta.env.APP_VERSION': gitString('hash'),
    'import.meta.env.GIT_BRANCH': gitString('branch'),
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    open: true,
  },
});
