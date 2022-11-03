import { SkipType } from '@/shared/schema/data';
import { useSystemStore } from '@/store/index';
const store = useSystemStore();
//* 这里是关于初始化时，按钮的配置 */
const init: Comp = {
  name: '链接',
  icon: 'Eleme',
  popover: '链接跳转',
  component: 'free-link', //对应组件名称，一定要和注册的全局组件对应上
  model: '', // 绑定值
  valuePath: 'options.textDetail', // valuePath?: string; // 指向可以更新当前组件值的路径, options.textDetail
  // 组件配置
  // 动作配置
  actions: [],
  // 组件配置
  options: {
    textDetail: '文字链接（有链接时，可跳转）', // 展示label
    href: '',
    target: '_blank',
    type: 'primary',
    underline: false,
    icon: '',
  },
  // 样式配置
  style: {},
  x: 0,
  y: 0,
  w: 3,
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
    label: '样式信息',
    group: 'options',
    children: [
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
      {
        label: '下划线',
        key: 'underline',
        component: 'radio',
        option: [
          { label: '有', value: true },
          { label: '无', value: false },
        ],
      },
    ],
  },
  {
    label: '属性配置',
    group: 'options',
    children: [
      { label: '文本内容', key: 'textDetail', component: 'input' },
      { label: '链接地址', key: 'href', component: 'input' },
      {
        label: '在何处打开文档',
        key: 'target',
        component: 'select',
        option: SkipType,
      },
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
  type: [],
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
