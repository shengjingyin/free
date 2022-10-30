<template>
  <BaseLink :options="options" ref="linkRef">
    {{ options.textDetail }}
  </BaseLink>
</template>

<script lang="ts" setup>
import { watch, computed, ref } from 'vue';
import BaseLink from './Link.vue';
import emitter from '@/plugin/mitt';
const props = defineProps({
  element: {
    type: Object,
    required: true,
  },
});
const options = computed(() => props.element.options);
const linkRef = ref();
// 按钮中触发时机只有点击、双击、等待
watch(
  () => props.element.model,
  model => {
    // 当修改model时，也能正常监听新的事件
    if (model) {
      emitter.on(model + 'disabled', () => {
        linkRef.value.disabled = true;
      });
      emitter.on(model + 'cancelDisabled', () => {
        linkRef.value.disabled = false;
      });
    }
  },
  { immediate: true }
);
</script>
<style lang="less" scoped></style>
