<template>
  <DynamicIorD :list="value">
    <template #item="{ index }">
      <!-- {{ String(data) + index }} -->
      <el-input v-model="value[index]" size="small"></el-input>
    </template>
  </DynamicIorD>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import DynamicIorD from '../../dynamic-i-or-d/index.vue';
const props = defineProps({
  select: {
    type: Object,
    require: true,
  },
  config: {
    type: Object,
    require: true,
  },
  group: String,
});
const key = computed(() => props.config?.key);
// 如果配置项的options中有目标属性，则取，否则返回
const getTarget = () => {
  /* 有设置 group 属性时，采用当前选项的[group]值来作为记录这条配置的地方，
  没有的话就优先options，其次当前组件本身 */
  return props.group
    ? props.select![props.group]
    : props.select!.options[key.value] !== undefined
    ? props.select!.options
    : props.select;
};
const value = computed({
  get: () => {
    const target = getTarget();
    return target[key.value];
  },
  set: val => {
    const target = getTarget();
    target[key.value] = val;
  },
});
</script>
<style lang="less" scoped></style>
