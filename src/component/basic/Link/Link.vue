<template>
  <el-link
    v-bind="options"
    class="base-link size-100 ellipsis"
    :title="options.href"
    :disabled="disabled"
  >
    <slot>link</slot>
  </el-link>
</template>

<script lang="ts" setup name="BaseLink">
import { ref } from 'vue';
defineProps({
  // ! 支持所有element原生配置
  options: {
    type: Object,
    required: true,
  },
});
// 显式控制
const disabled = ref(false);
defineExpose({
  disabled,
});
</script>
