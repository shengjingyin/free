import { ComponentInternalInstance } from 'vue';
import emitter from '@/plugin/mitt';
import { cloneDeep } from 'lodash';
export function executeAction(data, action) {
  if (action.type === 'event') {
    const order = action.event.slice(-2).join(''); // 取后面两位组合 key
    emitter.emit(order);
  } else if (action.type === 'action') {
    // 执行其他组件、自己本身的动作
    // 找到目标event
    const event = findEle(cloneDeep(data), action.action);
    const order = event.slice(-2).join('');
    emitter.emit(order);
  }
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
