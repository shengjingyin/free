import { useSystemStore } from '@/store/index';
const store = useSystemStore();
//* 这里是关于初始化时，按钮的配置 */
const init: Comp = {
  name: '输入框',
  component: 'free-input', //对应组件名称，一定要和注册的全局组件对应上
  model: '', // 绑定的key
  // 动作配置
  actions: [],
  // 组件配置
  options: {
    type: 'text',
    maxlength: null,
    minlength: 0,
    'show-word-limit': true,
    placeholder: '请输入',
    clearable: false,
    'show-password': false,
    disabled: false,
    size: 'default',
    'prefix-icon': null,
    'suffix-icon': null,
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
    popover: '确保唯一',
    children: [
      { label: '绑定字段', key: 'model', component: 'input' },
      { label: 'label', key: 'label', component: 'input' },
    ],
  },
  {
    label: '属性配置',
    group: 'options',
    children: [
      {
        label: '类型',
        key: 'type',
        component: 'select',
        option: [
          { label: 'text', value: 'text' },
          { label: 'textarea', value: 'textarea' },
        ],
      },
      { label: '占位文本', key: 'placeholder', component: 'input' },
      { label: '最大输入长度', key: 'maxlength', component: 'input-number' },
      { label: '最小输入长度', key: 'minlength', component: 'input-number' },
      {
        label: '显示统计字数',
        key: 'show-word-limit',
        component: 'radio',
        option: [
          { label: '是', value: true },
          { label: '否', value: false },
        ],
      },
      {
        label: '可清除',
        key: 'clearable',
        component: 'radio',
        option: [
          { label: '是', value: true },
          { label: '否', value: false },
        ],
      },
      {
        label: '切换密码图标',
        key: 'show-password',
        component: 'radio',
        option: [
          { label: '是', value: true },
          { label: '否', value: false },
        ],
      },
      {
        label: '禁用',
        key: 'disabled',
        component: 'radio',
        option: [
          { label: '是', value: true },
          { label: '否', value: false },
        ],
      },
      {
        label: '尺寸 ',
        key: 'size',
        component: 'radio',
        option: [
          { label: 'large', value: 'large' },
          { label: 'default', value: 'default' },
          { label: 'small', value: 'small' },
        ],
      },
      {
        label: '前置图标',
        key: 'prefix-icon',
        component: 'select',
        option: store.iconListInSelect,
      },
      {
        label: '后置图标',
        key: 'suffix-icon',
        component: 'select',
        option: store.iconListInSelect,
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
    { key: '动作', field: 'action' },
  ],
  property,
  style,
  action,
  other,
};
