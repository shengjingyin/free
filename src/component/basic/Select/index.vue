<template>
  <el-select placeholder="请选择" filterable clearable>
    <el-option v-for="item in option" :key="item.value" :label="item.label" :value="item.value">
      <slot :item="item"></slot>
    </el-option>
  </el-select>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const props = defineProps({
  option: {
    type: Array,
    required: true,
  },
});
</script>
<style lang="less" scoped></style>
