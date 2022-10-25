//* 这里是关于初始化时，按钮的配置 */
const init = {
  name: '文字',
  component: 'free-link', //对应组件名称，一定要和注册的全局组件对应上
  model: '', // 绑定值
  mode: 'edit', // show or edit
  // 组件配置
  // 动作配置
  actions: [],
  // 组件配置
  options: {
    textDetail: '',
    href: '',
    target: '_blank',
  },
  // 样式配置
  style: {},
};
//* 这里是关于配置项配置 列表 */
const property = [
  { label: '绑定字段', key: 'model', component: 'input' },
  { label: '文本内容', key: 'textDetail', component: 'input' },
  { label: '链接地址', key: 'href', component: 'input' },
  {
    label: '在何处打开文档',
    key: 'target',
    component: 'select',
    option: [
      { label: '在新窗口中打开被链接文档', value: '_blank' },
      { label: '在当前窗口打开被链接文档', value: '_self' },
      { label: '在父框架集中打开被链接文档', value: '_parent' },
      { label: '在整个窗口中打开被链接文档', value: '_top' },
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
    { label: '跳转', value: 'href' },
    { label: '触发事件', value: 'event' },
    { label: '触发动作', value: 'action' },
    { label: '发送请求', value: 'request' },
    { label: '自定义事件', value: 'communicate' },
    { label: '触发数值更新', value: 'setModel' },
  ],
  // 默认监听事件
  eventList: [
    // { value: 'show', label: '显示' },
    // { value: 'hide', label: '隐藏' },
    // { value: 'disabled', label: '禁用' },
    // { value: 'cancelDisabled', label: '取消禁用' },
  ],
};
//* 请求+通用+跳转配置 */
const other = {};
export default {
  init,
  property,
  style,
  action,
  other,
};
