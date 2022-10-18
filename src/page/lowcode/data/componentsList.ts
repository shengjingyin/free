const containerStyle = {
  backgroundColor: '#ffffff',
  backgroundImage: '',
  margin: '',
  padding: '',
  width: '',
  height: '',
  textAlign: '',
  bgType: undefined,
  borderType: undefined,
};
const requestConfig = {
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
};
const DATA_LIST = [
  {
    name: '表单',
    type: 'form',
    widgetType: 'page',
    icon: 'el-icon-tickets',
    list: [],
    rules: {},
    form: {},
    options: {
      dataBind: true,
      labelWidth: 100,
      labelPosition: 'right',
      size: 'small',
      customClass: '',
      layout: 'horizontal',
      labelCol: 3,
      width: '',
      height: 'auto',
      hideLabel: false,
      hideErrorMessage: false,
      visible: true,
      styles: {
        ...containerStyle,
        padding: '15px 0 0 0',
      },
      disabled: false,
      visibleExpression: '',
    },
    actions: [],
    common: {
      requestConfig,
    },
  },
  {
    name: '栅格布局',
    type: 'grid',
    widgetType: 'page',
    icon: 'icon-RectangleCopy',
    columns: [
      {
        type: 'col',
        widgetType: 'page',
        options: {
          span: 24,
          offset: 0,
          push: 0,
          pull: 0,
          xs: 24,
          sm: 24,
          md: 24,
          lg: 24,
          xl: 24,
          customClass: '',
        },
        list: [],
      },
    ],
    options: {
      gutter: 20,
      justify: 'start',
      align: 'top',
      customClass: '',
      hidden: false,
      flex: true,
      responsive: false,
      visible: true,
      styles: containerStyle,
      width: '',
      height: '',
    },
    actions: [],
  },
];
export const BASIC_LIST = [
  {
    name: '按钮',
    type: 'free-button', //对应组件名称，一定要和注册的全局组件对应上
    mode: 'edit', // show or edit
    icon: 'SwitchButton',
    actions: [],
    // 组件配置
    options: {
      hideLabel: true,
      width: '',
      type: 'primary', // 样式类型
      icon: '',
      size: 'medium',
      workType: 'submit', // 操作类型
      url: '',
      paramsList: [{ paramsKey: '', paramsValue: '' }], // 请求参数
      method: '',
      busName: '',
      text: '按钮',
      visibleExpression: '',
      visible: true,
      disabledExpression: '',
      disabled: false,
    },
  },
];
// 基础组件列表
export const BASE_LIST = [
  {
    list: BASIC_LIST,
    title: '基础组件',
  },
  {
    list: DATA_LIST,
    title: '容器类',
  },
  {
    list: [],
    title: '表单组件',
  },
  {
    list: [],
    title: '数据展示',
  },
  {
    list: [],
    title: '导航组件',
  },
  {
    list: [],
    title: '反馈组件',
  },
  {
    list: [],
    title: '其他',
  },
];
// 表单组件列表
export const FORM_LIST = [];
