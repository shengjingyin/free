<template>
  <BaseComp :options="options" v-model="value"></BaseComp>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import BaseComp from './Input.vue';
const props = defineProps({
  element: {
    type: Object,
    required: true,
  },
  modelValue: {
    type: String,
  },
});
const options = computed(() => props.element.options);
const emit = defineEmits(['update:modelValue']);

const value = computed({
  get() {
    return props.modelValue;
  },
  set(newVal) {
    emit('update:modelValue', newVal);
  },
});
</script>
<style lang="less" scoped></style>
