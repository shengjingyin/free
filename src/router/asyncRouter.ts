import _ from 'lodash';
import router from './index';
// import store from "../store/index";
// import { AsyncMenu } from '@/config/asyncMenu';
// import { addUniqueId } from '@/shared/lodash';
// import { flatByKey } from '@/shared/arr';
import type { Route } from '@/router/type';

// const AsyncMenus = addUniqueId(AsyncMenu, 'local_');
// const routes = flatByKey(AsyncMenu, 'children').filter(item => item.path !== '');

export const setAsyncRouter = async (data: any) => {
  // 生成路由信息，根据path自动导入
  // const _routes = await loadRoute(routes);
  // 存储所有的路由信息（已拍平）
  // store.commit("app/UPDATE_ROUTES_LIST", _routes);
  // 存储侧栏
  // store.commit("app/UPDATE_MENU_LIST", AsyncMenus);
  // 设置固定tab
  // store.commit("app/RESET_PROCESS_LIST");

  // 注册异步路由
  for (let i = 0; i < (_routes as any[]).length; i++) {
    const route = (_routes as any[])[i];
    router.addRoute('admin', route);
  }
};

// 加载路由
const loadRoute = (routerArr: Route[]) => {
  return new Promise(async resolve => {
    for (let i = 0; i < routerArr.length; i++) {
      const item = routerArr[i];
      if (item.path) {
        item.component = await import(`../views${item.path}.vue`).then(module => {
          return module.default;
        });
      } else {
        // 忽略没写路径的（有些父结构，不带path，只为了menu结构）
        continue;
      }
    }
    resolve(routerArr);
  });
};
