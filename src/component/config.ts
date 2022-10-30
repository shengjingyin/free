// 基础组件
import button from './basic/Button/config';
import link from './basic/Link/config';
// 数据展示组件
import Image from './data/Image/config';

import page from '../config/lowcode';

export default {
  basic: ['free-button', 'free-link'],
  data: ['free-image'],
  'free-button': button,
  'free-link': link,
  'free-image': Image,
  page,
};
