// import store from '@/store/index';
// import { isGloballyWhitelisted } from '@vue/shared';
import { useUserStore } from '@/store/user';
import { RouteLocationNormalized } from 'vue-router';

// import { setAsyncRouter } from '../asyncRouter';
import { routeConfig } from '@/config';

const { whiteList } = routeConfig;

/* 
    1、有用户信息，直接跳转
    2、没有用户信息：
        2.1、通用页面（所有用户可访问的白名单）直接访问
        2.2、权限页面，需要请求用户信息后，再跳转，这里存储用户信息后，就不会再走这里了，所以只会注册一次路由
*/
// 鉴权
const guard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: Function
) => {
  const user = useUserStore();
  const hasUserInfo = user.info;
  if (hasUserInfo) {
    next();
  } else {
    // whiteList 不需要登录的页面
    if (whiteList.includes(to.path)) {
      next();
    } else {
      next('/login');
    }
  }
};

export const setupBeforeGuard = guard;
