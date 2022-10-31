<template>
  <el-dialog
    v-model="visible"
    title="Tips"
    width="30%"
    v-bind="options"
    :before-close="handleClose"
  >
    <span>This is a message</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">Cancel</el-button>
        <el-button type="primary" @click="visible = false"> Confirm </el-button>
      </span>
    </template>
    <slot> {{ '按钮' }}</slot>
  </el-dialog>
</template>

<script lang="ts" setup name="BaseDialog">
import { ref, defineExpose } from 'vue';
defineProps({
  // ! 支持所有element原生配置
  options: {
    type: Object,
    required: true,
  },
});
// 显式控制
const visible = ref(true);
const loading = ref(false);
const handleClose = () => {};

defineExpose({
  loading,
});
</script>
