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
  icon: string;
  list: [];
  rules: {};
  form: {};
  options: {
    dataBind: true;
    labelWidth: 100;
    labelPosition: 'right';
    size: 'small';
    customClass: string;
    layout: 'horizontal';
    labelCol: 3;
    width: string;
    height: 'auto';
    hideLabel: false;
    hideErrorMessage: false;
    visible: true;
    styles: ContainerStyle & { padding: string };
    disabled: false;
    visibleExpression: string;
  };
  actions: [];
  common: {
    requestConfig;
  };
};

declare type AnyObj = Record<string, any>;
