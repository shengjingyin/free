<template>
  <el-input placeholder="请输入" v-bind="options" />
</template>

<script lang="ts" setup name="BaseButton">
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
const loading = ref(false);

defineExpose({
  disabled,
  loading,
});
</script>
