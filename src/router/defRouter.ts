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
    children: [
      {
        path: 'draggable/:type',
        // component: DraggablePage,
        component: () => import('@/page/test/draggable/index.vue'),
      },
      {
        path: 'vue-gird-layout/:type',
        component: () => import('@/page/test/vue-gird-layout/index.vue'),
        // component: VueGridLayoutPage,
      },
      {
        path: 'drag',
        component: () => import('@/page/test/drag/index.vue'),
        // component: VueGridLayoutPage,
      },
    ],
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
