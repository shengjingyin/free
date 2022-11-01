<template>
  <el-input placeholder="请输入" v-bind="attrs" />
</template>

<script lang="ts" setup name="BaseButton">
import { ref, useAttrs } from 'vue';
// const props = defineProps({
//   // ! 支持所有element原生配置
//   options: {
//     type: Object,
//     required: true,
//   },
// });
const attrs = useAttrs();
// 显式控制
const disabled = ref(false);
const loading = ref(false);

defineExpose({
  disabled,
  loading,
});
</script>
