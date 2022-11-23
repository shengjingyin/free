在线体验：https://shengjingyin.github.io/free/lowcode

## 特性

1. 基于技术栈：Vue3、TypeScript、Vite、Element plus
2. 支持以拖拽方式生成页面布局
3. 支持基础、容器、表单、数据展示类组件合计 7 个
4. 支持容器嵌套组件，对于需要立体的布局，可使用容器
5. 支持组件属性配置、组件动作系统（以按钮为例：支持跳转、下载、请求、触发其它组件事件、触发其它组件动作）
6. 所有组件属性配置均通过配置项数据生成
7. 代码风格统一

## Demo

## doing

1. 表单容器 form 及其附属表单项

## 架构图

## 系统架构

## 组件开发模板

以 button 为例，所有组件信息都封装在同一个文件夹内，具备较好的可维护性

```bash
├─component
│  │  config.ts           # 组件配置入口
│  │  index.ts            # 组件安装入口
│  │
│  ├─basic                # 组件分组
│  │  ├─Button            # 组件
│  │  │      __test__     # 单元测试（针对基础组件）
|  |  |      Button.vue   # 基础组件（基于element，理论上可以给任何安装element的项目使用）
│  │  │      config.ts    # 组件配置（初始化、属性面板、动作面板配置）
│  │  │      index.vue    # 中间组件（处理事件监听，属性过滤等操作）
```

## 组件配置

以 button 为例，属性配置、初始值、动作列表都在这里配置，需要什么加什么

```ts
// /Button/config.ts
import { useSystemStore } from '@/store/index';
const store = useSystemStore();
//* 这里是关于初始化时，按钮的配置 */
const init: Comp = {
  name: '按钮',
  icon: 'SetUp',
  component: 'free-button', // 对应组件名称，一定要和注册的全局组件对应上
  model: '', // 唯一key
  //* 动作配置 */
  actions: [],
  //* 属性配置 - 初始值 */
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
  //* 样式配置 */
  style: {},
  x: 0,
  y: 0,
  w: 1,
  h: 1,
};
//* 属性配置 列表 */
const property = [
  {
    label: '基本信息',
    group: '',
    popover: '确保唯一',
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
```

## 最后

恰饭时间，目前我处于离职状态，深圳的兄弟们如果您有 HC 帮忙内推一下，在此感激不尽；
