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

declare type Point = {
  x: number;
  y: number;
};
declare type Size = {
  w: number;
  h: number;
};

declare type GridItem = Point &
  Size & {
    i: string;
    [key: string]: unknown;
  };

declare type Comp = Partial<GridItem> & {
  name: string; // 中文别名
  component: `free-${string}` | 'page'; //对应组件名称，一定要和注册的全局组件对应上
  model: string; // 组件绑定的key，唯一
  mode?: 'edit' | 'show'; // 模式(编辑/展示)
  value?: string; // 指向可以更新当前组件值的路径, options.textDetail
  options: AnyObj; // 组件配置
  actions: Action[]; // 动作配置
  children?: Comp[]; // 子组件
  style: StyleValue; // 样式配置
};

// 怎么把指定的属性改成必填/可选
declare type Container = Omit<Comp, 'children'> & {
  children: Comp[];
};

declare type AnyObj = Record<string, any>;
declare type HttpParam = {
  key: string;
  type: 'custom' | 'fromDataTree';
  value: string[];
};
declare type UpdateModel = {
  key: string[];
  type: 'custom' | 'fromServe';
  value: string | unknown;
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

declare type SourceType = 'image/jpeg';

declare type Action = {
  name: string; // 动作名称（key）
  trigger?: 'click' | 'await'; // 触发时机
  type?: 'download' | 'skip' | 'event' | 'action' | 'request'; // 动作类型
  event?: string[]; // 触发事件
  action?: string[]; // 触发动作信息
  request?: HttpData; // 请求参数
  skip: {
    url?: string; // 跳转地址
    type: '_blank';
  }; // 下载资源类型
  download: {
    url?: string; // 下载资源地址
    type: SourceType;
  }; // 下载资源类型
};

declare interface KV {
  key: string;
  value: unknown;
}

declare type RequestRef = (action: Action) => void;
