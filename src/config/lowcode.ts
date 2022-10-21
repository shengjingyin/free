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
export const initPage = cloneDeep({
  type: 'page',
  key: 'page_' + new Date().getTime(),
  widgetType: 'page',
  name: '页面',
  model: 'page',
  version: '1.1.7',
  actions: [],
  options: {
    width: '100%',
    height: '100%',
    styles: {
      backgroundColor: '#ffffff',
      backgroundImage: '',
      margin: '',
      padding: '',
      bgType: '1',
    },
    pageRegs: [],
  },
  common: {
    skip,
    request,
  },
  children: [] as AnyObj[],
});
