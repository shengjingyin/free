<template>
  <BaseComp :options="options"></BaseComp>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import BaseComp from './Input.vue';
const props = defineProps({
  element: {
    type: Object,
    required: true,
  },
});
const options = computed(() => props.element.options);
console.log('🚀 ~ file: index.vue ~ line 15 ~ options', options);
</script>
<style lang="less" scoped></style>
