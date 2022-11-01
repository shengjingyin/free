<template>
  <div class="test">
    <AVue :setDragEle="setDragEle"></AVue>
    <BVue :dragged="dragged"></BVue>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import AVue from './A.vue';
import BVue from './B.vue';

const dragged = ref(null);
const setDragEle = target => {
  dragged.value = target;
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
