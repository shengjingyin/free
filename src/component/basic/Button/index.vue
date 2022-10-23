<template>
  <el-button v-bind="options" :disabled="disabled" @click.stop="click">
    <slot> {{ options.textDetail || '请输入文本' }}</slot>
  </el-button>
</template>

<script lang="ts" setup name="FreeButton">
import { getCurrentInstance, computed, useAttrs, ref, watch } from 'vue';
import { executeAction } from '@/shared/action';
import { useLowcodeStore } from '@/store/lowcode';
import emitter from '@/plugin/mitt';
const props = defineProps({
  element: {
    type: Object,
    required: true,
  },
});
const lowcode = useLowcodeStore();
const attrs = useAttrs();
const disabled = ref(false);

const instance = getCurrentInstance();

const options = computed(() => {
  return props.element ? props.element.options : attrs;
});

// 按钮中触发时机只有点击、双击、等待
watch(
  () => props.element.model,
  model => {
    if (model) {
      emitter.on(model + 'disabled', () => {
        disabled.value = true;
      });
      emitter.on(model + 'cancelDisabled', () => {
        disabled.value = false;
      });
    }
  },
  { immediate: true }
);
const click = () => {
  if (options.value.disabled) {
    return;
  }
  executeActionList();
  function executeActionList() {
    const { actions } = props.element;
    for (let i = 0; i < actions.length; i++) {
      const action = actions[i];
      if (action.trigger === 'click') {
        executeAction(lowcode.data, action);
      }
    }
  }
};
</script>
<style lang="less" scoped></style>
