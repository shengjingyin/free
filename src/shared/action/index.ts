import { ComponentInternalInstance } from 'vue';

export function executeAction(instance: ComponentInternalInstance, action) {
  console.log('🚀 executeAction ~ instance', instance, action);
}
