<template>
  <n-button type="tertiary" v-bind="attrs" @click.stop="click">
    <slot>{{ '-' }}</slot>
  </n-button>
</template>

<script lang="ts" setup>
import { useAttrs } from 'vue';
const attrs = useAttrs();
const click = () => {
  if (attrs.disabled) {
    return;
  }
};
</script>
<style lang="less" scoped></style>
