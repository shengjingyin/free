<template>
  <ConfigRender :config="conf"></ConfigRender>
</template>

<script lang="ts" setup>
import { ref, watch, computed } from 'vue';
import ConfigRender from '@/business-component/config-render/index.vue';
defineProps({
  conf: { type: Object, required: true },
});
</script>
<style lang="less" scoped></style>
