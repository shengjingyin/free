<template>
  <div> 卡片配置 </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useLowcodeStore } from '@/store/lowcode';
import { storeToRefs } from 'pinia';
const { select, data } = storeToRefs(useLowcodeStore());
watch(select, val => {
  console.log('当前选中：', val);
});
</script>
<style lang="less" scoped></style>
