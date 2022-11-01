//* 这里是关于初始化时，按钮的配置 */
const init: Comp = {
  name: '布局',
  icon: 'Folder',
  popover: '选中当前组件，才能往该容器内添加其它组件/自身(支持嵌套)',
  component: 'free-layout', //对应组件名称，一定要和注册的全局组件对应上
  model: '', // 绑定的key
  // 动作配置
  actions: [],
  // 组件配置
  options: {
    col: 12,
    'row-height': 30,
    'card-margin': 2,
  },
  // 样式配置
  style: {
    'background-color': '#eee',
  },
  children: [], // 子元素列表
  x: 0,
  y: 0,
  w: 10,
  h: 6,
};
//* 这里是关于配置项配置 列表 */
const property = [
  {
    label: '基本信息',
    group: '',
    children: [{ label: '绑定字段', key: 'model', component: 'input' }],
  },
  {
    label: '容器设置',
    group: 'options',
    children: [
      { label: '栅格（列）', key: 'col', component: 'input-number' },
      { label: '行高（px）', key: 'row-height', component: 'input-number' },
      { label: '卡片间距（px）', key: 'card-margin', component: 'input-number' },
    ],
  },
  {
    label: '主题设置',
    group: 'style',
    children: [{ label: '背景色', key: 'background-color', component: 'color' }],
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
    // { key: '动作', field: 'action' },
  ],
  property,
  style,
  action,
  other,
};
