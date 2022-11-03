import emitter from '@/plugin/mitt';
import { set, get } from 'lodash';
import http from '@/api/index';
import { findEleByPath } from '@/shared/tree/index';
import { download as Down } from '@/shared/download/index';

const dealFunc = {
  skip: dealSkip, // 处理跳转
  download: dealDownload, // 处理下载
  event: dealEvent, // 处理event
  action: dealAction, // 处理action
  request: dealRequest, // 处理发送请求
};
function dealSkip({ skip }) {
  window.open(skip.url, skip.type);
}
function dealDownload({ download }) {
  if ((download.type as SourceType) === 'image/jpeg') {
    Down(download.url);
  }
}
function dealEvent(action) {
  const order = action.event.slice(-2).join(''); // 取后面两位组合 key
  emitter.emit(order);
}
function dealRequest(action, tree) {
  const { request } = action;
  const queryParam = genQueryParam(request);
  http({
    ...request,
    ...queryParam,
    silence: false, // 是否静默请求（不提示成功与失败）
    url: request.url,
    method: request.method,
  }).then(res => {
    // 对于错误进行过滤
    const { data, code } = res;
    if (code === 0) {
      // 更新组件数据
      if (action?.request?.response?.updateModelList) {
        action.request.response.updateModelList.forEach(item => {
          const target = findEleByPath(tree, 'model', item.key);
          // 更新值
          if (item.type === 'fromServe') {
            set(target, target.valuePath, get(data, item.value)); // value?: string; // 指向可以更新当前组件值的路径, options.textDetail
          } else {
            set(target, target.valuePath, item.value);
          }
        });
      }
    }
  });
}
function genQueryParam(request: HttpData) {
  const data = {} as AnyObj;
  request.params.forEach(param => {
    if (param.key !== '') {
      data[param.key] = param.value;
    }
  });
  return { data };
}
function dealAction(action, data) {
  // 执行其他组件、自己本身的动作
  // 找到目标
  const target = findEleByPath(data, 'model', action.action.slice(0, -1)),
    [actionName] = action.action.slice(-1);
  if (target?.actions) {
    const actionProperty = target.actions.find(({ name }) => name === actionName);
    // emit 指令：  通过event 后两个参数： key+事件 获取
    const order = actionProperty.event.slice(-2).join('');
    emitter.emit(order);
  }
}
/**
 *
 * @param {Object} data - json对象数据
 * @param {Object} action - 当前执行的动作
 */
export function executeAction(data, action) {
  // 执行对应策略
  return dealFunc[action.type](action, data);
}
