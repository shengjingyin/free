<template>
  <free-input v-model="value"></free-input>
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
});
const key = computed(() => props.config?.key);
// 如果配置项的options中有目标属性，则取，否则返回
const value = computed({
  get: () => {
    const target =
      props.select!.options[key.value] !== undefined ? props.select!.options : props.select;
    return target[key.value];
  },
  set: val => {
    const target =
      props.select!.options[key.value] !== undefined ? props.select!.options : props.select;
    target[key.value] = val;
  },
});
</script>
<style lang="less" scoped></style>
