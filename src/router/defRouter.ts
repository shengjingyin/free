// 菜单信息
import type { Route } from './type';
import { addUniqueId } from '@/shared/lodash';

// 自动注册page/test/下所有的测试页面
const pages = import.meta.glob('../page/test/**/index.vue'); // 异步方式
const setupTestPage = () => {
  // 读取当前文件目录、遍历
  const route = [] as Route[];
  for (const [path, value] of Object.entries(pages)) {
    const match = path.match(/.*\/(.*)\/index.vue$/);
    if (match && match[1]) {
      const path = `${match[1]}`; // 命名规则 文件夹名称
      route.push({
        path,
        component: value,
      });
    }
  }
  return route;
};
// 基础路由信息
const arr: Route[] = [
  {
    path: '/',
    name: 'lowcode',
    tabFix: false,
    meta: {
      title: '低代码',
    },
    component: () => import('@/App.vue'),
    redirect: '/lowcode',
    children: [
      {
        path: '/lowcode',
        // component: LowcodePage,
        component: () => import('@/page/lowcode/index.vue'),
      },
    ],
  },
  {
    path: '/test',
    name: '测试',
    tabFix: false,
    meta: {
      title: '测试',
    },
    component: () => import('@/App.vue'),
    redirect: '/test/draggable/:type',
    children: setupTestPage(),
  },
  {
    path: '/login',
    name: '登录',
    meta: {
      title: '登录',
    },
    component: () => import('@/page/login/index.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    meta: {
      title: '404',
    },
    component: () => import('@/page/404/index.vue'),
  },
];

export const defRoutes = addUniqueId(arr, 'id_');
