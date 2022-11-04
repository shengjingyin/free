<template>
  <el-button @click="click('/v1/classic/index')">数据上报</el-button>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

// 方式一
const click = function (src) {
  for (let i = 0; i < 10; i++) {
    const img = new Image();
    img.src = src + '?a=' + Math.random();
  }
};
// 方式二：闭包
// const click = (function () {
//   const imgs = [] as unknown[];
//   return function (src) {
//     for (let i = 0; i < 10; i++) {
//       const img = new Image();
//       console.log('🚀 ~ file: index.vue ~ line 19 ~ img', img);
//       imgs.push(img); // 临时存储img对象给闭包属性imgs，避免img被销毁
//       img.src = src + '?a=' + Math.random();
//     }
//   };
// })();
</script>
<style lang="less" scoped></style>
