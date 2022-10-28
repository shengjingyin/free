<template>
  <!-- 仪表盘 -->
  <section
    :class="{ active: select.component === 'page' }"
    class="page-container"
    @click.stop="handleSelectPage"
  >
    <div id="content">
      <grid-layout
        ref="layoutRef"
        class="grid-layout"
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
          dragAllowFrom=".drag-able"
          :key="item.i"
          v-for="(item, index) of layout"
          :x="item.x"
          :y="item.y"
          :w="item.w"
          :h="item.h"
          :i="item.i"
        >
          <CompWrap :element="item" :index="index"></CompWrap>
        </grid-item>
      </grid-layout>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, nextTick, onUnmounted, watch } from 'vue';
import { useLowcodeStore } from '@/store/lowcode';
import CompWrap from './comp-wrap.vue';
import { generateKey } from '@/shared/util';
import emitter from '@/plugin/mitt';
import { storeToRefs } from 'pinia';
import store from 'storejs';
import { saveTreeData } from '@/shared/app';
const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
});
const layout = ref<Comp[]>([]);
const { select, SET_DATA_LIST } = useLowcodeStore();
const { data } = storeToRefs(useLowcodeStore());
console.log('🚀 ~ file: dash-board.vue ~ line 56 ~ data', data);

const handleSelectPage = () => {};
const update = b => {
  saveTreeData(data);
};
watch(
  data,
  newData => {
    console.log('val', newData);
  },
  { deep: true }
);
const mouseXY: Point = { x: 0, y: 0 };
let DragPos: GridItem = { x: 0, y: 0, w: 1, h: 1, i: '' };
const layoutRef = ref();
const gridItemRef = ref();
let parentRect: DOMRect;
onMounted(() => {
  emitter.on('add-component', dragComponent);
  emitter.on('end-add-component', dragEnd);
  document.addEventListener('dragover', updateMousePoint, false);
});

// 更新鼠标位置
const updateMousePoint = function (e) {
  mouseXY.x = e.clientX;
  mouseXY.y = e.clientY;
};
onUnmounted(() => {
  document.removeEventListener('dragover', updateMousePoint);
});
const mouseInGrid = () => {
  parentRect = document.getElementById('content')!.getBoundingClientRect();
  return (
    mouseXY.x > parentRect.left &&
    mouseXY.x < parentRect.right &&
    mouseXY.y > parentRect.top &&
    mouseXY.y < parentRect.bottom
  );
};
let key = generateKey(),
  _element;
const dragComponent = async element => {
  const _mouseInGrid = mouseInGrid();

  _element = genElementInfo(element);
  let index = layout.value.findIndex(item => item.i === _element.i);
  if (_mouseInGrid && index === -1) {
    layout.value.push({
      ..._element,
      // 这里可以根据相应规则变化
      x: (layout.value.length * 2) % 12,
      y: layout.value.length + 12, // puts it at the bottom
    });
  }
  if (index != -1) {
    // 目标元素已经存在与布局中
    await nextTick();
    try {
      const newGrid = gridItemRef.value[index];
      // 根据坐标 计算 位置
      let new_pos = newGrid.calcXY(mouseXY.y - parentRect.top, mouseXY.x - parentRect.left);
      if (_mouseInGrid === true) {
        /* (eventName, id, x, y, h, w) */
        layoutRef.value.dragEvent('dragstart', _element.i, new_pos.x, new_pos.y, 1, 1);
        DragPos.i = String(index);
        DragPos.x = layout.value[index].x;
        DragPos.y = layout.value[index].y;
      }
      if (_mouseInGrid === false) {
        layoutRef.value.dragEvent('dragend', _element.i, new_pos.x, new_pos.y, 1, 1);
        // 去除 drop
        layout.value = layout.value.filter(obj => obj.i !== _element.i);
      }
    } catch {}
  }
};
const dragEnd = () => {
  key = generateKey(); // 每次结束拖拽 重新生成1个key
  const _mouseInGrid = mouseInGrid();
  if (_mouseInGrid) {
    try {
      layoutRef.value.dragEvent('dragend', _element.i, DragPos.x, DragPos.y, 1, 1);
      SET_DATA_LIST(_element, 1, 'add'); // 因为有了坐标，其实和顺序已经没有关系了
    } catch {}
  }
};
const genElementInfo = (target: Comp) => {
  return {
    ...target,
    options: {
      ...target.options,
    },
    i: String(key + 1),
    // 绑定键值
    model: target.model || target.component + '_' + key,
  };
};
</script>

<style scoped lang="less">
#content {
  height: 100%;
}

.grid-layout {
  height: 100% !important;
}
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
/deep/.vue-grid-item.vue-grid-placeholder {
  background-color: skyblue;
  opacity: 0.4;
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
