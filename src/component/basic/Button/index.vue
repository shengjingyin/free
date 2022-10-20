<template>
  <el-button v-bind="options" @click.stop="click">
    {{ options.textDetail || '请输入文本' }}
    <slot> </slot>
  </el-button>
</template>

<script lang="ts" setup name="FreeButton">
import { getCurrentInstance, computed } from 'vue';
import { executeAction } from '@/shared/action';
import emitter from '@/plugin/mitt';
const props = defineProps({
  element: {
    type: Object,
    required: true,
  },
});
// const attrs = useAttrs();
const instance = getCurrentInstance();
console.log('🚀 ~ file: index.vue ~ line 18 ~ instance', instance);
const options = computed(() => props.element.options);

emitter.on('click', args => {
  console.log('🚀 ~ file: index.vue ~ line 26 ~ emitter.on ~ args', args);
});
const click = () => {
  if (options.value.disabled) {
    return;
  }
  emitter.emit('click', ['g1', 'g2']);
  executeActionList();
  function executeActionList() {
    const { actions } = props.element;
    for (let i = 0; i < actions.length; i++) {
      const ac = actions[i];
      if (instance) {
        executeAction(instance, ac);
      }
    }
  }
};
</script>
<style lang="less" scoped></style>
