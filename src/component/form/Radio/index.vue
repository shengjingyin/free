<template>
  <el-radio-group>
    <el-radio :label="item.value" v-for="item of option" :key="item.value">
      {{ item.label }}
    </el-radio>
  </el-radio-group>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const props = defineProps({
  option: {
    type: Array,
    required: true,
  },
});
</script>
<style lang="less" scoped></style>
