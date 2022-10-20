<template>
  <free-select v-model="value" :option="config?.option">
    <!-- 定制 icon 列表渲染 -->
    <template v-if="config.key === 'icon'" #="{ item }">
      <span style="float: left">{{ item.label }}</span>
      <el-icon :size="18" style="float: right; top: 50%; transform: translateY(-50%)">
        <component :is="item.value"></component>
      </el-icon>
    </template>
  </free-select>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
const props = defineProps({
  select: {
    type: Object,
    require: true,
  },
  config: {
    type: Object,
    require: true,
  },
});
const value = computed({
  get: () => {
    return props.select!.options[props.config.key];
  },
  set: val => {
    props.select!.options[props.config.key] = val;
  },
});
</script>
<style lang="less" scoped></style>
