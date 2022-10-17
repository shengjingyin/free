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
  },
];

export const defRoutes = addUniqueId(arr, 'id_');
