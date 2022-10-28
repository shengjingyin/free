// 菜单信息
import type { Route } from './type';
import { addUniqueId } from '@/shared/lodash';

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
    children: [
      {
        path: 'draggable/:type',
        component: () => import('@/page/test/draggable/index.vue'),
      },
      {
        path: 'vue-gird-layout/:type',
        component: () => import('@/page/test/vue-gird-layout/index.vue'),
      },
    ],
  },
];

export const defRoutes = addUniqueId(arr, 'id_');
