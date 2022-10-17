// import store from '@/store/index';
// import { isGloballyWhitelisted } from '@vue/shared';

import { setAsyncRouter } from '../asyncRouter';
import { routeConfig } from '@/config';

const { whiteList } = routeConfig;

/* 
    1、有用户信息，直接跳转
    2、没有用户信息：
        2.1、通用页面（所有用户可访问的白名单）直接访问
        2.2、权限页面，需要请求用户信息后，再跳转，这里存储用户信息后，就不会再走这里了，所以只会注册一次路由
*/

const guard = async (to: any, from: any, next: Function) => {
  const accountInfo = {};
  // const accountInfo = (<any>store.getters).accountInfo;
  next();
  return;
  if (Object.keys(accountInfo).length > 0) {
    next();
  } else {
    if (whiteList.includes(to.path)) {
      next();
    } else {
      try {
        // const { data } = await fetchAccountInfo();
        const data = {
          id: '35000019921018986X',
          token: 'bm]2nB^5r6Fo!Vx$cyQBhbNvkpNWJ(',
          username: '羊先生',
          createTime: '16-09-11 12:59:36',
          text: '各带九片思界习龙命斗类当感。斗包别义不感度相式铁派海难万价反细。术消王达什意积者据式在进你级。列引如国业家候运维组清西建接总两维。光两白包类四质美方细省治合型子程只。',
          roles: ['admin', 'editor', 'test'],
          type: 'admin',
          contentType: 2,
          serviceUnreadCount: 6,
          userhead: '/src/packages/assets/image/yanghang.jpg',
          expiredTime: 43200,
          headimgurl: 'http://dummyimage.com/40x40/79f2d0/FFF&text=png',
        };
        // store.commit('user/UPDATE_ACCOUNT_INFO', data);
        await setAsyncRouter(data); // 根据权限加载异步路由
        next({ ...to, replace: true });
        console.log('to', to);
        debugger;
      } catch (error) {
        next('/login');
      }
    }
  }
};

export const setupBeforeGuard = guard;
