import { onMounted, onUnmounted } from 'vue';

export function useEventListener(target, event: string, callback: Function) {
  onMounted(() => {
    target.addEventListener(event, callback);
  });
  onUnmounted(() => {
    target.removeEventListener(event, callback);
  });
}
