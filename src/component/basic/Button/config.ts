import { useSystemStore } from '@/store/index';
const store = useSystemStore();
//* 这里是关于初始化时，按钮的配置 */
const init: Comp = {
  name: '按钮',
  icon: 'SetUp',
  component: 'free-button', //对应组件名称，一定要和注册的全局组件对应上
  model: '', // 绑定的key
  // 动作配置
  actions: [],
  // 组件配置
  options: {
    type: 'primary', // 样式类型
    size: 'default',
    icon: '',
    color: '',
    plain: false,
    text: false,
    round: false,
    textDetail: '按钮文本',
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
    group: 'options',
    children: [
      { label: '文本内容', key: 'textDetail', component: 'input' },
      {
        label: '文字尺寸',
        key: 'size',
        component: 'radio',
        option: [
          { label: '大尺寸', value: 'large' },
          { label: '中等尺寸', value: 'default' },
          { label: '小尺寸', value: 'small' },
        ],
      },
      {
        label: '预设样式',
        key: 'type',
        component: 'radio',
        option: [
          { label: '主要', value: 'primary' },
          { label: '成功', value: 'success' },
          { label: '警告', value: 'warning' },
          { label: '危险', value: 'danger' },
          { label: '信息', value: 'info' },
        ],
      },
      { label: '自定义颜色', key: 'color', component: 'color' },
      { label: '朴素按钮', key: 'plain', component: 'switch' },
      { label: '文字按钮', key: 'text', component: 'switch' },
      { label: '圆角按钮', key: 'round', component: 'switch' },
      { label: '前置icon', key: 'icon', component: 'select', option: store.iconListInSelect },
    ],
  },
];
//* 单选、输入、颜色 */
const style = [];

//* 动作配置 */
const action = {
  // 触发条件
  triggerCondition: [
    { label: '点击', value: 'click' },
    { label: '等待触发', value: 'await' },
  ],
  // 动作类型
  type: [
    { label: '下载', value: 'download' },
    { label: '跳转', value: 'skip' },
    { label: '触发事件', value: 'event' },
    { label: '触发动作', value: 'action' },
    { label: '发送请求', value: 'request' },
    { label: '更新数据', value: 'setModel' },
  ],
  // 默认监听事件
  eventList: [
    // { value: 'show', label: '显示' },
    // { value: 'hide', label: '隐藏' },
    { value: 'disabled', label: '禁用' },
    { value: 'cancelDisabled', label: '取消禁用' },
  ],
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
