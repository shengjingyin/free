import { App } from 'vue';

import { setupRouter } from './router/index';
import api from './api/index';

const install = (app: App) => {
  console.log('🚀 ~ file: install.ts ~ line 4 ~ install ~ app', app);
  setupInit(app); // 初始化安装开始
};
const setupInit = (app: App) => {
  setupRouter(app);
  // setupElement(app);
  // setupDirective(app);
  // setupComponents(app);
  // 接口挂载
  app.config.globalProperties.$api = api;
};
export default {
  install,
};
