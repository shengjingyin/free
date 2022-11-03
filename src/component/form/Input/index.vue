<template>
  <BaseComp class="size-100" :options="options" v-model:modelValue="value"></BaseComp>
</template>

<script lang="ts" setup>
import { computed, ref, watch, inject } from 'vue';
import BaseComp from './Input.vue';
const inForm = inject('inForm');
const props = defineProps({
  element: {
    type: Object,
    required: true,
  },
});
const options = computed(() => props.element.options);
const emit = defineEmits(['update:modelValue']);

const value = ref('');

watch(value, newVal => {
  if (props.element.inForm) {
    emit('update:modelValue', newVal);
  }
});

defineExpose({
  value,
});
</script>
<style lang="less" scoped></style>
