<template>
  <el-select placeholder="Select">
    <el-option v-for="item in cities" :key="item.value" :label="item.label" :value="item.value">
      <span style="float: left">{{ item.label }}</span>
      <span style="float: right; color: var(--el-text-color-secondary); font-size: 13px">{{
        item.value
      }}</span>
    </el-option>
  </el-select>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
</script>
<style lang="less" scoped></style>
