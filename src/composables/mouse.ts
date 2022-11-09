import { ref } from 'vue';
import { useEventListener } from './event';
export function useMouse() {
  const x = ref(0);
  const y = ref(0);

  const update = (e: MouseEvent) => {
    x.value = e.clientX;
    y.value = e.clientY;
  };

  useEventListener(document, 'dragover', update);

  return {
    x,
    y,
  };
}
