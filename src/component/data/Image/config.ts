//* 这里是关于初始化时，按钮的配置 */
const init: Comp = {
  name: '图片',
  component: 'free-image', //对应组件名称，一定要和注册的全局组件对应上
  model: '', // 绑定的key
  // 动作配置
  actions: [],
  // 组件配置
  options: {
    src: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg', // 图片地址
    fit: 'cover',
    lazy: true, // 'eager' | 'lazy' 原生支持！
    preview: true, // 自定义属性，用来控制是否预览，默认可以预览，并且默认添加当前图片
    'preview-src-list': [''], // 预览列表
  },
  // 样式配置
  style: {},
  x: 0,
  y: 0,
  w: 5,
  h: 5,
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
    conf: {
      'label-position': 'top',
    },
    children: [
      { label: '图片源地址', key: 'src', component: 'input' },
      {
        label: '文字尺寸',
        key: 'fit',
        component: 'radio',
        option: [
          { label: 'fill', value: 'fill' },
          { label: 'contain', value: 'contain' },
          { label: 'cover', value: 'cover' },
          { label: 'none', value: 'none' },
          { label: 'scale-down', value: 'scale-down' },
        ],
      },
      {
        label: '加载图像策略',
        key: 'lazy',
        component: 'radio',
        option: [
          { label: '立即加载图像', value: false },
          { label: '懒加载图像', value: true },
        ],
      },
      {
        label: '图片预览',
        key: 'preview',
        component: 'radio',
        option: [
          { label: '开启', value: true },
          { label: '关闭', value: false },
        ],
      },
      {
        label: '图片预览列表',
        key: 'preview-src-list',
        component: 'dynamic-input',
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
  confIndex: [{ key: '属性', field: 'property' }],
  property,
  style,
  action,
  other,
};
