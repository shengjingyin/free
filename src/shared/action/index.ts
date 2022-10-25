import emitter from '@/plugin/mitt';
import { cloneDeep, set, get } from 'lodash';
import http from '@/api/index';

const dealFunc = {
  event: dealEvent, // 处理event
  action: dealAction, // 处理action
  request: dealRequest, // 处理发送请求
};

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
          const target = _findEle([tree], item.key);
          if (item.type === 'fromServe') {
            set(target, target.value, get(data, item.value));
          } else {
            set(target, target.value, item.value);
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
  // 找到目标event
  const event = findEle(cloneDeep(data), action.action);
  const order = event.slice(-2).join('');
  emitter.emit(order);
}
function findEle(root, path) {
  // const p = path.shift()
  // 最后一位才是动作的名称，所以前面的都是路径，直接去children取即可
  const fullPath = path.slice(0, -1);
  let copyRoot = cloneDeep(root);
  while (fullPath.length) {
    fullPath.shift();
    if (fullPath.length > 0) {
      // 在还有路径之前，一直查找正确的组件
      const firstPath = fullPath[0];
      copyRoot = copyRoot.children.find(child => child.model === firstPath);
    }
  }
  // 最后一步找到对应的动作
  const action = copyRoot.actions.find(action => action.name === path[path.length - 1]);
  return action.event;
}
// 当作多维数组处理
/**
 * 获取指定的元素
 * @param {Array<component>} data - 所有元素集合
 * @param {Array<string>} path - 路径《完整》
 * @returns {Object} 具有响应式的目标元素
 */
function _findEle(data: any[] = [], path = []) {
  let target;
  while (path.length) {
    const first = path.shift();
    target = data.find(item => item.model === first);
    if (target) {
      data = target.children;
    } else {
      return null;
    }
  }
  return target;
}

export function executeAction(data, action) {
  return dealFunc[action.type](action, data);
}
