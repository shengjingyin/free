<template>
  <div>
    <div>
      <div class="layoutJSON">
        Displayed as <code>[x, y, w, h]</code>:
        <div class="columns">
          <div class="layoutItem" v-for="item in layout" :key="item.i">
            <b>{{ item.i }}</b
            >: [{{ item.x }}, {{ item.y }}, {{ item.w }}, {{ item.h }}]
          </div>
        </div>
      </div>
    </div>
    <br />
    <div
      @drag="drag"
      @dragend="dragend"
      class="droppable-element"
      draggable="true"
      unselectable="on"
      >Droppable Element (Drag me!)</div
    >
    <div id="content">
      <grid-layout
        ref="layoutRef"
        v-model:layout="layout"
        :col-num="12"
        :row-height="30"
        :is-draggable="true"
        :is-resizable="true"
        :vertical-compact="true"
        :use-css-transforms="true"
      >
        <grid-item
          ref="gridItemRef"
          :key="item.i"
          v-for="item in layout"
          :x="item.x"
          :y="item.y"
          :w="item.w"
          :h="item.h"
          :i="item.i"
        >
          <span class="text">{{ item.i }}</span>
        </grid-item>
      </grid-layout>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, nextTick } from 'vue';
let mouseXY: Point = { x: 0, y: 0 };
let DragPos: GridItem = { x: 0, y: 0, w: 1, h: 1, i: '' };
const layout = ref<GridItem[]>([
  { x: 0, y: 0, w: 2, h: 2, i: '0' },
  { x: 2, y: 0, w: 2, h: 4, i: '1' },
  { x: 4, y: 0, w: 2, h: 5, i: '2' },
  { x: 6, y: 0, w: 2, h: 3, i: '3' },
  { x: 8, y: 0, w: 2, h: 3, i: '4' },
  { x: 10, y: 0, w: 2, h: 3, i: '5' },
  { x: 0, y: 5, w: 2, h: 5, i: '6' },
  { x: 2, y: 5, w: 2, h: 5, i: '7' },
  { x: 4, y: 5, w: 2, h: 5, i: '8' },
  { x: 5, y: 10, w: 4, h: 3, i: '9' },
]);

const layoutRef = ref();
const gridItemRef = ref();
let parentRect: DOMRect;

onMounted(() => {
  document.addEventListener(
    'dragover',
    function (e) {
      // 更新鼠标位置
      mouseXY.x = e.clientX;
      mouseXY.y = e.clientY;
    },
    false
  );
  parentRect = document.getElementById('content')!.getBoundingClientRect();
});
const drag = async function () {
  parentRect = document.getElementById('content')!.getBoundingClientRect();
  let mouseInGrid = false;
  // 1、判断鼠标是否在仪表盘中
  if (
    mouseXY.x > parentRect.left &&
    mouseXY.x < parentRect.right &&
    mouseXY.y > parentRect.top &&
    mouseXY.y < parentRect.bottom
  ) {
    mouseInGrid = true;
  }
  // 2、如果还在，并且仪表盘中没有当前元素，可以添加进来
  let index = layout.value.findIndex(item => item.i === 'drop');
  if (mouseInGrid === true && index === -1) {
    layout.value.push({
      // 这里可以根据相应规则变化
      x: (layout.value.length * 2) % 12,
      y: layout.value.length + 12, // puts it at the bottom
      w: 1,
      h: 1,
      i: 'drop',
    });
  }
  if (index !== -1) {
    // 目标元素已经存在与布局中
    await nextTick();
    try {
      const newGrid = gridItemRef.value[index];
      // 根据坐标 计算 位置
      let new_pos = newGrid.calcXY(mouseXY.y - parentRect.top, mouseXY.x - parentRect.left);
      if (mouseInGrid === true) {
        /* (eventName, id, x, y, h, w) */
        layoutRef.value.dragEvent('dragstart', 'drop', new_pos.x, new_pos.y, 1, 1);
        DragPos.i = String(index);
        DragPos.x = layout.value[index].x;
        DragPos.y = layout.value[index].y;
      }
      if (mouseInGrid === false) {
        layoutRef.value.dragEvent('dragend', 'drop', new_pos.x, new_pos.y, 1, 1);
        // 去除 drop
        layout.value = layout.value.filter(obj => obj.i !== 'drop');
      }
    } catch {}
  }
};
const dragend = function () {
  parentRect = document.getElementById('content')!.getBoundingClientRect();
  let mouseInGrid = false;
  if (
    mouseXY.x > parentRect.left &&
    mouseXY.x < parentRect.right &&
    mouseXY.y > parentRect.top &&
    mouseXY.y < parentRect.bottom
  ) {
    mouseInGrid = true;
  }
  // 如果最后还在layout中，则添加
  if (mouseInGrid === true) {
    layoutRef.value.dragEvent('dragend', 'drop', DragPos.x, DragPos.y, 1, 1);
    // UNCOMMENT below if you want to add a grid-item
    // layout.value.push({
    //   x: DragPos.x,
    //   y: DragPos.y,
    //   w: 1,
    //   h: 1,
    //   i: DragPos.i,
    // });
    // layoutRef.value.dragEvent('dragend', DragPos.i, DragPos.x, DragPos.y, 1, 1);
    // try {
    // layoutRef.value.$children[layout.value.length - 1].$refs.item.style.display = 'block';
    // } catch {}
  }
};
</script>

<style scoped>
.droppable-element {
  width: 150px;
  text-align: center;
  background: #fdd;
  border: 1px solid black;
  margin: 10px 0;
  padding: 10px;
}
.vue-grid-layout {
  background: #eee;
}
.vue-grid-item:not(.vue-grid-placeholder) {
  background: #ccc;
  border: 1px solid black;
}
.vue-grid-item .resizing {
  opacity: 0.9;
}
.vue-grid-item .static {
  background: #cce;
}
.vue-grid-item .text {
  font-size: 24px;
  text-align: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  height: 100%;
  width: 100%;
}
.vue-grid-item .no-drag {
  height: 100%;
  width: 100%;
}
.vue-grid-item .minMax {
  font-size: 12px;
}
.vue-grid-item .add {
  cursor: pointer;
}
.vue-draggable-handle {
  position: absolute;
  width: 20px;
  height: 20px;
  top: 0;
  left: 0;
  background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10'><circle cx='5' cy='5' r='5' fill='#999999'/></svg>")
    no-repeat;
  background-position: bottom right;
  padding: 0 8px 8px 0;
  background-repeat: no-repeat;
  background-origin: content-box;
  box-sizing: border-box;
  cursor: pointer;
}
.layoutJSON {
  background: #ddd;
  border: 1px solid black;
  margin-top: 10px;
  padding: 10px;
}
.layoutJSON {
  background: #ddd;
  border: 1px solid black;
  margin-top: 10px;
  padding: 10px;
}
.columns {
  -moz-columns: 120px;
  -webkit-columns: 120px;
  columns: 120px;
}
</style>
