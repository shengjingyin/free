//* 这里是关于初始化时，按钮的配置 */
const init: Comp = {
  name: '表单',
  icon: 'List',
  popover: '收集表单，对表单进行统一管理',
  component: 'free-form', //对应组件名称，一定要和注册的全局组件对应上
  model: '', // 绑定的key
  // 动作配置
  actions: [],
  // 组件配置
  options: {
    inline: false,
    'label-position': 'right',
    'label-width': 80,
    'require-asterisk-position': 'left',
    'show-message': true,
    'inline-message': false,
  },
  // 样式配置
  style: {},
  children: [], // 子元素列表
  x: 0,
  y: 0,
  w: 10,
  h: 10,
};
//* 这里是关于配置项配置 列表 */
const property = [
  {
    label: '基本信息',
    group: '',
    children: [{ label: '绑定字段', key: 'model', component: 'input' }],
  },
  {
    label: '表单设置',
    group: 'options',
    children: [
      {
        label: '行内模式',
        key: 'inline',
        component: 'radio',
        option: [
          { label: '是', value: true },
          { label: '否', value: false },
        ],
      },
      {
        label: '标签位置',
        key: 'label-position',
        component: 'radio',
        option: [
          { label: 'left', value: 'left' },
          { label: 'right', value: 'right' },
          { label: 'top', value: 'top' },
        ],
      },
      { label: '标签长度', key: 'label-width', component: 'input-number' },
    ],
  },
  {
    label: '表单校验',
    group: 'options',
    children: [
      {
        label: '必填星号的位置',
        key: 'require-asterisk-position',
        component: 'radio',
        option: [
          { label: 'left', value: 'left' },
          { label: 'right', value: 'right' },
        ],
      },
      {
        label: '显示校验信息',
        key: 'show-message',
        component: 'radio',
        option: [
          { label: '是', value: true },
          { label: '否', value: false },
        ],
      },
      {
        label: '行内形式展示校验信息',
        key: 'inline-message',
        component: 'radio',
        option: [
          { label: '是', value: true },
          { label: '否', value: false },
        ],
      },
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
    // { key: '动作', field: 'action' },
  ],
  property,
  style,
  action,
  other,
};
