import { App } from 'vue';

import api from './api/index';
import { setupRouter } from './router/index';
import { setupElement } from './plugin/element/index';
import { setupGlobComponent } from './component/index';
import VueGridLayout from 'vue-grid-layout';
const install = (app: App) => {
  setupInit(app); // 初始化安装开始
};
const setupInit = (app: App) => {
  setupRouter(app);
  setupElement(app);
  setupGlobComponent(app);
  app.use(VueGridLayout);
  // setupElement(app);
  // setupDirective(app);
  // setupComponents(app);
  // 接口挂载
  app.config.globalProperties.$api = api;
};
export default {
  install,
};
