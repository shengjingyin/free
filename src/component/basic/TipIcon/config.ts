import { useSystemStore } from '@/store/index';
const store = useSystemStore();
const init: Comp = {
  name: 'Tips',
  icon: 'ChatDotRound',
  popover: 'icon提示',
  component: 'free-tip-icon', //对应组件名称，一定要和注册的全局组件对应上
  model: '', // 绑定的key
  // 动作配置
  actions: [],
  // 组件配置
  iconOptions: {
    size: 26,
    icon: 'InfoFilled',
  },
  popoverOptions: {
    textDetail: '文本提示内容',
    effect: 'light',
    placement: 'top',
  },
  // 样式配置
  style: {},
  x: 0,
  y: 0,
  w: 1,
  h: 1,
};
//* 这里是关于配置项配置 列表 */
const property = [
  {
    label: '基本信息',
    group: '',
    children: [{ label: '绑定字段', key: 'model', component: 'input' }],
  },
  {
    label: '属性配置',
    group: 'popoverOptions',
    children: [
      { label: '提示内容', key: 'textDetail', component: 'input' },
      {
        label: '提示文本背景色',
        key: 'effect',
        component: 'select',
        option: [
          { label: '黑', value: 'dark' },
          { label: '白', value: 'light' },
        ],
      },
      {
        label: '出现位置',
        key: 'placement',
        component: 'select',
        option: [
          { label: 'top', value: 'top' },
          { label: 'top-start', value: 'top-start' },
          { label: 'top-end', value: 'top-end' },
          { label: 'bottom', value: 'bottom' },
          { label: 'bottom-start', value: 'bottom-start' },
          { label: 'bottom-end', value: 'bottom-end' },
          { label: 'left', value: 'left' },
          { label: 'left-start', value: 'left-start' },
          { label: 'left-end', value: 'left-end' },
          { label: 'right', value: 'right' },
          { label: 'right-start', value: 'right-start' },
          { label: 'right-end', value: 'right-end' },
        ],
      },
    ],
  },
  {
    label: '图标配置',
    group: 'iconOptions',
    children: [
      { label: '图标', key: 'icon', component: 'select', option: store.iconListInSelect },
      { label: '尺寸', key: 'size', component: 'input-number' },
    ],
  },
];
//* 单选、输入、颜色 */
const style = [];

//* 动作配置 */
const action = {
  // 触发条件
  triggerCondition: [{ label: '点击', value: 'click' }],
  // 动作类型
  type: [
    { label: '下载', value: 'download' },
    { label: '跳转', value: 'skip' },
    { label: '触发事件', value: 'event' },
    { label: '触发动作', value: 'action' },
    { label: '发送请求', value: 'request' },
    { label: '更新数据', value: 'setModel' },
  ],
  // （自身）默认监听事件
  eventList: [],
};
//* 请求+通用+跳转配置 */
const other = {};
export default {
  init,
  confIndex: [
    { key: '属性', field: 'property' },
    { key: '动作', field: 'action' },
  ],
  property,
  style,
  action,
  other,
};
