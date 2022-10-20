<template>
  <el-button v-bind="options" @click.stop="click">
    {{ options.textDetail || '请输入文本' }}
    <slot> </slot>
  </el-button>
</template>

<script lang="ts" setup name="FreeButton">
import { useAttrs, computed } from 'vue';
const props = defineProps({
  element: {
    type: Object,
    required: true,
  },
});
const attrs = useAttrs();
const options = computed(() => props.element.options);
const click = () => {
  if (attrs.disabled) {
    return;
  }
};
</script>
<style lang="less" scoped></style>
