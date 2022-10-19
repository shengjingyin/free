<template>
  <free-input v-model="value"></free-input>
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
const key = computed(() => props.config.key);
const value = computed({
  get: () => {
    return props.select!.options[key.value];
  },
  set: val => {
    props.select!.options[key.value] = val;
  },
});
</script>
<style lang="less" scoped></style>
