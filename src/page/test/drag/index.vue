<template>
  <div class="test">
    <div class="dropzone">
      <div id="draggable" draggable="true"> 这个 div 可以拖动 </div>
    </div>
    <div class="dropzone" id="droptarget"></div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
onMounted(() => {
  let dragged,
    i = 0;

  /* events fired on the draggable target */
  const source = document.getElementById('draggable');
  // 【拖拽元素】拖拽进行中
  source.addEventListener('drag', event => {
    console.log('拖拽元素：dragging', ++i);
  });
  // 【拖拽元素】拖拽开始
  source.addEventListener('dragstart', event => {
    console.log('🚀 ~ 拖拽元素：开始');
    // store a ref. on the dragged elem
    dragged = event.target;
    // make it half transparent
    // 目标元素添加状态
    event.target.classList.add('dragging');
  });
  // 【拖拽元素】拖拽结束
  source.addEventListener('dragend', event => {
    // reset the transparency
    console.log('🚀 ~ 拖拽元素：结束');
    event.target.classList.remove('dragging');
  });

  /* events fired on the drop targets */
  /* 放置容器元素触发以下事件 */
  const target = document.getElementById('droptarget');
  // 【放置容器】移动
  target.addEventListener(
    'dragover',
    event => {
      // prevent default to allow drop
      console.log('🚀 ~ 容器：移动', ++i);
      event.preventDefault();
    },
    false
  );
  // 【放置容器】进入
  target.addEventListener('dragenter', event => {
    console.log('🚀 ~ 容器：进入');
    // highlight potential drop target when the draggable element enters it
    if (event.target.classList.contains('dropzone')) {
      event.target.classList.add('dragover');
    }
  });

  // 【放置容器】离开
  target.addEventListener('dragleave', event => {
    // reset background of potential drop target when the draggable element leaves it
    console.log('🚀 ~ 容器：离开');
    if (event.target.classList.contains('dropzone')) {
      event.target.classList.remove('dragover');
    }
  });
  // 【放置容器】放置
  target.addEventListener('drop', event => {
    console.log('🚀 ~ 容器：放置');
    // prevent default action (open as link for some elements)
    event.preventDefault();
    // move dragged element to the selected drop target
    if (event.target.classList.contains('dropzone')) {
      event.target.classList.remove('dragover');
      dragged.parentNode.removeChild(dragged);
      event.target.appendChild(dragged);
    }
  });
});
</script>
<style lang="less" scoped>
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
