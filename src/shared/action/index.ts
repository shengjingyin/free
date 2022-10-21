import { ComponentInternalInstance } from 'vue';
import emitter from '@/plugin/mitt';
export function executeAction(instance: ComponentInternalInstance, action) {
  console.log('🚀 executeAction ~ instance', instance, action);
  const event = action.event.slice(-2).join(''); // 取后面两位组合 key
  if (action.type === 'event') {
    emitter.emit(event);
  } else if (action.type === 'action') {
    // 执行其他组件、自己本身的动作
  }
}
