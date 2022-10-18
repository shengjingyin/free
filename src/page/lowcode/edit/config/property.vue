<template>
  <div> 属性配置 </div>
  <template v-if="select.options">
    是否文字按钮：<el-switch v-model="select.options.text" size="large" />
  </template>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useStore } from '@/store/lowcode';
import { storeToRefs } from 'pinia';
const { select, data } = storeToRefs(useStore());
const value = ref(false);

watch(value, val => {
  // select.value.options.text = val;
});
watch(select, val => {
  console.log('当前选中：', val);
});
</script>
<style lang="less" scoped></style>
