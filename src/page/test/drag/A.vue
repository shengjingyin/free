<template>
  <div class="dropzone">
    <div id="draggable" draggable="true" @drag="drag" @dragstart="dragstart" @dragend="dragend">
      这个 div 可以拖动
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  setDragEle: {
    type: Function,
    required: true,
  },
});
// 【拖拽元素】拖拽进行中
const drag = () => {
  console.log('拖拽元素：dragging');
};
// 【拖拽元素】拖拽开始
const dragstart = event => {
  console.log('🚀 ~ 拖拽元素：开始');
  // store a ref. on the dragged elem
  props.setDragEle(event.target);
  // make it half transparent
  // 目标元素添加状态
  event.target.classList.add('dragging');
};
// 【拖拽元素】拖拽结束
const dragend = event => {
  // reset the transparency
  console.log('🚀 ~ 拖拽元素：结束');
  event.target.classList.remove('dragging');
};
</script>
<style lang="less" scoped></style>
