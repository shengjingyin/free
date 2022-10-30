<template>
  <!-- 处理从低代码平台传递过来的数据 -->
  <!-- 解析之后再传递给基础组件 -->
  <!-- 这样子，将来如果别的系统想要用这个基础组件，也不会因为平台不同而不能够使用 -->
  <div> 中间层 </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
</script>
<style lang="less" scoped></style>
