/* 全局配置 */
import { BASE } from '@/shared/constants';
/* 路由配置 */
export const routeConfig = {
  whiteList: ['login', '404'].map(path => `${BASE}${path}`),
};

export default {
  routeConfig,
};
