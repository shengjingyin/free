<template>
  <el-button  v-bind="attrs" @click.stop="click">
    <slot>{{ '-' }}</slot>
  </el-button>
</template>

<script lang="ts" setup name='FreeButton'>
import { useAttrs } from 'vue';
const attrs = useAttrs();
const click = () => {
  if (attrs.disabled) {
    return;
  }
};
</script>
<style lang="less" scoped></style>
