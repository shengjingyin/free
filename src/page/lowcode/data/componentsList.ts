import config from '@/component/config';
// 基础组件列表
export const BASIC_LIST = config.basic.map(key => config[key].init);
export const DATA_LIST = config.data.map(key => config[key].init);

// 表单组件列表
export const FORM_LIST = [];

export const COMPONENT_LIST = [
  {
    list: BASIC_LIST,
    title: '基础组件',
  },
  {
    list: [],
    title: '容器类',
  },
  {
    list: FORM_LIST,
    title: '表单组件',
  },
  {
    list: DATA_LIST,
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
