<template>
  <el-color-picker v-model="value" show-alpha :predefine="predefineColors" />
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
const predefineColors = [
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
];
</script>
