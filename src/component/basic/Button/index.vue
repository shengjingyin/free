<template>
  <!-- 处理从低代码平台传递过来的数据 -->
  <!-- 解析之后再传递给基础组件 -->
  <!-- 这样子，将来如果别的系统想要用这个基础组件，也不会因为平台不同而不能够使用 -->
  <!-- <div> 中间层 </div> -->
  <BaseButton :options="options" ref="buttonRef" @click.stop="click">
    {{ options.textDetail }}
  </BaseButton>
</template>

<script lang="ts" setup name="FreeButton">
import BaseButton from './Button.vue';
import { computed, ref } from 'vue';
import { executeAction } from '@/shared/action';
import { useLowcodeStore } from '@/store/lowcode';
import emitter from '@/plugin/mitt';
const props = defineProps({
  element: {
    type: Object,
    required: true,
  },
});
const buttonRef = ref();
const lowcode = useLowcodeStore();

const options = computed(() => props.element.options);

// 按钮中触发时机只有点击、双击、等待
emitter.on(props.element.model + 'disabled', () => {
  buttonRef.value.disabled = true;
});
emitter.on(props.element.model + 'cancelDisabled', () => {
  buttonRef.value.disabled = false;
});
const click = async () => {
  if (options.value.disabled) {
    return;
  }
  buttonRef.value.loading = true;
  await executeActionList();
  buttonRef.value.loading = false;
  async function executeActionList() {
    const { actions } = props.element;
    for (let i = 0; i < actions.length; i++) {
      const action = actions[i];
      if (action.trigger === 'click') {
        await executeAction(lowcode.data, action);
      }
    }
    return true;
  }
};
</script>
<style lang="less" scoped>
.el-button {
  max-width: 100%;
  max-height: 100%;
}
</style>
