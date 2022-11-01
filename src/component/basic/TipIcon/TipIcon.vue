<template>
  <el-popover :trigger="trigger" v-bind="popoverOptions">
    <slot> <p>提示语主体</p> </slot>

    <template #reference>
      <el-icon v-bind="iconOptions" style="cursor: pointer">
        <component :is="iconOptions.icon || icon"></component>
      </el-icon>
    </template>
  </el-popover>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
defineProps({
  iconOptions: {
    type: Object,
    required: true,
  },
  popoverOptions: {
    type: Object,
    required: true,
  },
  trigger: {
    type: String,
    default: 'hover',
  },
  icon: {
    type: String,
    default: 'InfoFilled',
  },
});
</script>
<style lang="less" scoped></style>
