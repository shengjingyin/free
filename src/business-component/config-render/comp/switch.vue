<template>
  <free-switch v-model="value"> </free-switch>
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
    return !!props.select!.options[props.config.key];
  },
  set: val => {
    props.select!.options[props.config.key] = val;
  },
});
</script>
<style lang="less" scoped></style>
