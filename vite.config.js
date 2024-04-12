// 使用 import 代替 require
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import prerender from 'vite-plugin-prerender';

export default defineConfig({
  plugins: [
    vue(),
    prerender({
      pages: ['/'],
    })
  ]
});
