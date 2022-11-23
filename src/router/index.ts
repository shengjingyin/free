// import App from "../pages/admin/Index.vue";
// !import VueRouter from "vue-router";  错误示例
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
// import store from '../store';
import type { App } from 'vue';
import type { Route } from '@/router/type';
import { Window } from '@/types/dom';
import { Nprogress } from '@/plugin/nprogress/index';
import { defRoutes } from './defRouter';
import { setupBeforeGuard } from './guard/before';

const router = createRouter({
  history: createWebHistory(), // history 与 hash 区别
  routes: defRoutes,
});

// 路由守卫，跳转前
router.beforeEach((to, from, next) => {
  Nprogress.start();
  console.log('路由跳转开始');
  setupBeforeGuard(to, from, next);
});
router.afterEach((to, from, failure) => {
  if (to.name !== 'lowcode') {
    Nprogress.done();
  }
});

// 保存路由信息
const storeRouterInfo = (app: App) => {
  const {
    defaults = true,
    file = [],
    paths = [],
  } = app.config.globalProperties?.$plugin?.router || {};
  if (defaults) {
    // 存储所有的路由信息（已拍平）
    // store.commit('app/UPDATE_ROUTES_LIST', defRoutes);
    // // 保存基础菜单信息（所有用户共有的）
    // store.commit('app/UPDATE_MENU_LIST', []);
    // store.commit('app/RESET_PROCESS_LIST');
  }
  // store.commit('app/updateAppRouter', { defaults, file, paths }); // 存储路由相关信息
  console.log('路由初始化结束');
};
// 注册路由 (main)
export const setupRouter = async (app: App) => {
  storeRouterInfo(app);
  app.use(router);
  await router.isReady();
  // store.commit('app/updateAppRouter', { router }); // 存储 router 实例
};
(window as Window).router = router;
export default router;
