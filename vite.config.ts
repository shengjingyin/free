import { defineConfig } from 'vite';
// 支持单文件组件
import vue from '@vitejs/plugin-vue';

const path = require('path');

export default defineConfig({
  base: '/',
  plugins: [vue()],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src'),
      },
    ],
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {},
        javascriptEnabled: true,
      },
    },
  },
});
