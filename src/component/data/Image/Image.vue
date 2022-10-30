<template>
  <el-image class="size-100" fit="cover" v-bind="options" hide-on-click-modal preview-teleported>
    <template #error>
      <div class="image-slot">
        <!-- <el-icon :size="30"><icon-picture /></el-icon> -->
        <el-icon :size="30"> <PictureFilled /></el-icon>
        <p>图片加载失败</p>
      </div>
    </template>
  </el-image>
</template>

<script lang="ts" setup name="BaseImage">
import { defineExpose } from 'vue';
defineProps({
  // ! 支持所有element原生配置
  options: {
    type: Object,
    required: true,
  },
});
// 显式控制

defineExpose({});
</script>
<style scoped>
.image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: var(--el-fill-color-light);
  color: var(--el-text-color-secondary);
  flex-direction: column;
}
</style>
