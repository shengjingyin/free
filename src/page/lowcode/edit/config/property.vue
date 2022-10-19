<template>
  <ConfigRender :config="conf"></ConfigRender>
</template>

<script lang="ts" setup>
import { ref, watch, computed } from 'vue';
import { useLowcodeStore } from '@/store/lowcode';
import { storeToRefs } from 'pinia';
import ConfigRender from '@/business-component/config-render/index.vue';
const { select } = storeToRefs(useLowcodeStore());

// 如何获取到当前选中组件的配置项
import config from '@/component/config';

const conf = computed(() => config[select.value.component]);
</script>
<style lang="less" scoped></style>
