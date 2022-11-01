<template>
  <free-select v-model="value" :option="config?.option" size="small">
    <!-- 定制 icon 列表渲染 -->
    <template v-if="config?.key === 'icon'" #="{ item }">
      <span style="float: left">{{ item.label }}</span>
      <el-icon :size="18" style="float: right; top: 50%; transform: translateY(-50%)">
        <component :is="item.value"></component>
      </el-icon>
    </template>
  </free-select>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
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
// const value = computed({
//   get: () => {
//     return props.select!.options[props.config?.key];
//   },
//   set: val => {
//     props.select!.options[props.config?.key] = val;
//   },
// });
</script>
<style lang="less" scoped></style>
