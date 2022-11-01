// 基础组件
import button from './basic/Button/config';
import link from './basic/Link/config';
import TipIcon from './basic/TipIcon/config';
// 数据展示组件
import Image from './data/Image/config';

// 容器组件
import Dialog from './container/Dialog/config';
import Layout from './container/Layout/config';

// 页面配置
import page from '../config/lowcode';

export default {
  basic: ['free-button', 'free-link', 'free-tip-icon'],
  data: ['free-image'],
  container: ['free-layout'],
  'free-button': button,
  'free-link': link,
  'free-tip-icon': TipIcon,
  'free-image': Image,
  'free-dialog': Dialog,
  'free-layout': Layout,
  page,
};
