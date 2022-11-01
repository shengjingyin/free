<template>
  <div class="test">
    <div class="dropzone">
      <div id="draggable" draggable="true" @drag="drag" @dragstart="dragstart" @dragend="dragend">
        这个 div 可以拖动
      </div>
    </div>
    <div
      class="dropzone"
      id="droptarget"
      @dragenter="dragenter"
      @dragover="dragover"
      @dragleave="dragleave"
      @drop="drop"
    ></div>
  </div>
</template>

<script setup>
let dragged,
  i = 0;
// 【拖拽元素】拖拽进行中
const drag = () => {
  console.log('拖拽元素：dragging', ++i);
};
// 【拖拽元素】拖拽开始
const dragstart = event => {
  console.log('🚀 ~ 拖拽元素：开始');
  // store a ref. on the dragged elem
  dragged = event.target;
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
  console.log('🚀 ~ 容器：移动', ++i);
  event.preventDefault();
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
    dragged.parentNode.removeChild(dragged);
    event.target.appendChild(dragged);
  }
};
</script>
<style lang="less">
.test {
  /* Prevent the user selecting text in the example */
  user-select: none;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #000;
}

#draggable {
  text-align: center;
  background: white;
}

.dropzone {
  width: 200px;
  height: 20px;
  background: blueviolet;
  margin: 10px;
  padding: 10px;
}

.dropzone.dragover {
  background-color: purple;
}

//
#draggable.dragging {
  opacity: 0.5;
  background: #000;
}
</style>
