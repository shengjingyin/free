<template>
  <div
    class="dropzone"
    id="droptarget"
    @dragenter="dragenter"
    @dragover="dragover"
    @dragleave="dragleave"
    @drop="drop"
  ></div>
</template>

<script setup>
const props = defineProps({
  dragged: Object,
});
// 【放置容器】进入
const dragenter = event => {
  console.log('🚀 ~ 容器：进入');
  // highlight potential drop target when the draggable element enters it
  if (event.target.classList.contains('dropzone')) {
    event.target.classList.add('dragover');
  }
};
// 【放置容器】移动
const dragover = event => {
  // prevent default to allow drop
  console.log('🚀 ~ 容器：移动');
  event.preventDefault(); //  prevent default to allow drop
};
// 【放置容器】离开
const dragleave = event => {
  // reset background of potential drop target when the draggable element leaves it
  console.log('🚀 ~ 容器：离开');
  if (event.target.classList.contains('dropzone')) {
    event.target.classList.remove('dragover');
  }
};
// 【放置容器】放置
const drop = event => {
  console.log('🚀 ~ 容器：放置');
  // prevent default action (open as link for some elements)
  event.preventDefault();
  // move dragged element to the selected drop target
  if (event.target.classList.contains('dropzone')) {
    event.target.classList.remove('dragover');
    props.dragged.parentNode.removeChild(props.dragged);
    event.target.appendChild(props.dragged);
  }
};
</script>
<style lang="less" scoped></style>
