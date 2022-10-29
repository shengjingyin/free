import { cloneDeep } from 'lodash';
// 跳转
export const skip = cloneDeep({
  hrefTarget: '',
  outLink: false,
  hrefUrlParams: [
    {
      paramsKey: '',
      paramsValue: '',
      required: false,
      info: '',
      custom: false,
      neededDataType: '', // 参数转换类型
      filter: false,
    },
  ],
});
// 请求
export const request = cloneDeep({
  isLoop: false, // 是否轮询
  loopType: 'time', // 轮询类型
  loopProp: '', // 轮询字段
  updateStatus: '', // 通知更新事件
  processProp: '', // 进度状态字段
  infoProp: '', // 信息提示字段
  intervals: '', // 请求间隔时间
  resultEvent: '', // 请求结果触发事件
  endType: '', // 结束类型
  endCondition: '', // 结束条件
  loopCount: '', // 轮询次数
  loopStatus: '', // 轮询状态：用于存储轮询进度，如果轮询完成则该为true
  url: '',
  paramsList: [
    {
      paramsKey: '',
      paramsValue: '',
      required: false,
      info: '',
      custom: false,
      neededDataType: '', // 参数转换类型
      filter: false,
    },
  ], // 请求参数
  method: 'get',
  requestSilence: false,
  headers: [],
  nodeData: '',
  nodeTotal: 'data.total',
  sendTerms: '',
  filter: false,
  updateModelList: [
    {
      updateKey: '',
      updateValue: '',
      dataType: '',
      custom: false,
    },
  ],
  setModelMap: [
    {
      custom: false,
      source: '', // 数据源
      target: '', // 目标model
      typeChange: '', // 类型转换
    },
  ],
  successCondition: '',
});
// 初始化页面
export const initPage: Comp = cloneDeep({
  name: '页面',
  model: 'page',
  component: 'page',
  actions: [],
  options: {
    col: 12,
    'row-height': 30,
    'card-margin': 2,
  },
  common: {
    // skip,
    // request,
  },
  style: {
    'background-color': '#eee',
  },
  children: [] as Comp[],
  i: '0',
});
//* 这里是关于配置项配置 列表 */
const property = [
  {
    label: '页面设置',
    group: 'options',
    children: [
      { label: '页面栅格', key: 'col', component: 'input-number', placeholder: '列' },
      { label: '页面行高', key: 'row-height', component: 'input-number', placeholder: '像素' },
      { label: '卡片间距', key: 'card-margin', component: 'input-number', placeholder: '像素' },
    ],
  },
  {
    label: '主题设置',
    group: 'style',
    children: [{ label: '背景色', key: 'background-color', component: 'color' }],
  },
];
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
//* 单选、输入、颜色 */
const style = [];
export default {
  init: initPage,
  confIndex: [{ key: '页面', field: 'property' }],
  property,
  style,
  action,
  other: {},
};
