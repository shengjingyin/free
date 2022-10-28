<template>
  <component :is="component"></component>
</template>

<script lang="ts" setup>
import { defineAsyncComponent } from 'vue';
import { useRoute } from 'vue-router';
const { params } = useRoute();
const demoList = {
  1: defineAsyncComponent(() => import('./基础拖拽.vue')),
  2: defineAsyncComponent(() => import('./从外部拖拽进来.vue')),
};
const component = demoList[params.type as string];
</script>
<style lang="less" scoped></style>
