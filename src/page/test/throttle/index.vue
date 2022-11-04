<template> <div @mousemove="_onmousemove"></div></template>
<script setup lang="ts">
const _onmousemove = throttle(listenMoveOn, 200);

function listenMoveOn() {
  // 监听的回调做一些事情
  console.log('arguments', arguments, this);
}
function throttle(fn: Function, delay: number, options?) {}
</script>
<style scoped>
div {
  background-color: #666;
  height: 300px;
}
</style>
