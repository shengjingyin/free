declare type ContainerStyle = {
  backgroundColor: string;
  backgroundImage: string;
  margin: string;
  padding: string;
  width: string;
  height: string;
  textAlign: string;
  bgType: undefined;
  borderType: undefined;
};
declare type Comp = {
  name: string;
  type: 'form' | 'page';
  widgetType: 'page';
  children: Comp[];
  model: string;
  options: AnyObj;
  actions: Action[];
  common: {
    requestConfig;
  };
};

declare type AnyObj = Record<string, unknown>;
declare type HttpParam = {
  key: string;
  type: 'custom' | 'fromDataTree';
  value: string[];
};
declare type UpdateModel = {
  key: string;
  type: 'custom' | 'fromServe';
  value: unknown;
};
declare type HttpData = {
  url: string;
  method: 'get' | 'post';
  params: HttpParam[]; // query也使用param，根据方法类别进行解析
  required?: boolean;
  filter?: boolean;
  response: {
    node: string; // 接口返回数据节点, 该节点的数据会赋值给组件, 比如data.list
    // successMessage: string; // 请求成功提示语,无论成功还是失败都使用后台返回的msg字段
    quietness: boolean; // 静默请求(失败后不提示报错信息)，默认false
    updateModelList?: UpdateModel[]; // 需要更新的组件列表
  };
};

declare type Action = {
  name: string;
  trigger?: 'click' | 'await';
  type?: 'event' | 'action' | 'request';
  event?: string;
  action?: string;
  request?: HttpData;
};
