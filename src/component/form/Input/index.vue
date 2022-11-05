<template>
  <BaseComp class="size-100" :options="options" v-model:modelValue="value"></BaseComp>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import BaseComp from './Input.vue';
import emitter from '@/plugin/mitt';
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
// 监听动作：change、blur

// 监听事件：清空
emitter.on(props.element.model + 'clear', () => {
  value.value = '';
});

defineExpose({
  value,
});
</script>
<style lang="less" scoped></style>
