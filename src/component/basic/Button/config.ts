/* 这里是关于初始化时，按钮的配置 */
const init = {
  name: '按钮',
  component: 'free-button', //对应组件名称，一定要和注册的全局组件对应上
  model: '', // 绑定值
  mode: 'edit', // show or edit
  icon: 'SwitchButton',
  actions: [],
  // 组件配置
  options: {
    hideLabel: true,
    width: '',
    type: 'primary', // 样式类型
    icon: '',
    size: 'small',
    workType: 'submit', // 操作类型
    url: '',
    paramsList: [{ paramsKey: '', paramsValue: '' }], // 请求参数
    method: '',
    busName: '',
    text: false,
    visibleExpression: '',
    visible: true,
    disabledExpression: '',
    disabled: false,
  },
};
/* 这里是关于配置项配置 */
const property = [
  { label: '文本内容', key: 'textDetail', component: 'input' },
  {
    label: '尺寸',
    key: 'size',
    component: 'radio',
    option: [
      { label: '大尺寸', key: 'large' },
      { label: '中等尺寸', key: 'default' },
      { label: '小尺寸', key: 'small' },
    ],
  },
  {
    label: '类型',
    key: 'type',
    component: 'radio',
    option: [
      { label: 'primary', key: 'primary' },
      { label: 'success', key: 'success' },
      { label: 'warning', key: 'warning' },
      { label: 'danger', key: 'danger' },
      { label: 'info', key: 'info' },
    ],
  },
  { label: '朴素按钮', key: 'plain', component: 'switch' },
  { label: '文字按钮', key: 'text', component: 'switch' },
  { label: '圆角按钮', key: 'round', component: 'switch' },
  { label: '前置icon', key: 'icon', component: 'select' },
];
/* 单选、输入、颜色 */
const style = [];

export default {
  init,
  property,
  style,
};
