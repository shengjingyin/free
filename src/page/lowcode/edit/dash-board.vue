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
        :margin="[2, 2]"
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
import { generateKey, saveIdMap } from '@/shared/util';
import emitter from '@/plugin/mitt';
import { storeToRefs } from 'pinia';
import { saveTreeData } from '@/shared/app';
import { debounce } from 'lodash';
defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
});
const { select } = useLowcodeStore();
const { data } = storeToRefs(useLowcodeStore());
// const layout = ref<Comp[]>([]);
const layout = computed<Comp[]>({
  get() {
    return data.value.children;
  },
  set(newData) {
    data.value.children = newData;
  },
});

const handleSelectPage = () => {};

// 保存所有更新数据
const _saveTreeData = debounce((...args) => {
  console.log('🚀 ~ 更新数据', ...args);
  saveTreeData.apply(null, args);
}, 1000);
watch(
  data,
  newData => {
    _saveTreeData(newData);
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
let _element;
const dragComponent = async element => {
  const _mouseInGrid = mouseInGrid();
  _element = genElementInfo(element);
  let index = layout.value.findIndex(item => item.i === _element.i);
  if (_mouseInGrid) {
    if (index === -1) {
      layout.value.push({
        ..._element,
        // 这里可以根据相应规则变化
        x: (layout.value.length * 2) % 12,
        y: layout.value.length + 12, // puts it at the bottom
      });
    } else {
      // 目标元素已经存在与布局中
      await nextTick();
      try {
        const newGrid = gridItemRef.value[index];
        // 根据坐标 计算 位置
        let new_pos = newGrid.calcXY(mouseXY.y - parentRect.top, mouseXY.x - parentRect.left);
        if (_mouseInGrid) {
          /* (eventName, id, x, y, h, w) */
          layoutRef.value.dragEvent('dragstart', _element.i, new_pos.x, new_pos.y, 1, 1);
          DragPos.i = _element.i;
          DragPos.x = layout.value[index].x;
          DragPos.y = layout.value[index].y;
        } else {
          layoutRef.value.dragEvent('dragend', _element.i, new_pos.x, new_pos.y, 1, 1);
          // 去除 当前添加的元素
          layout.value = layout.value.filter(obj => obj.i !== _element.i);
        }
      } catch {}
    }
  }
  if (index != -1) {
  }
};
let key;
const dragEnd = () => {
  // key = generateKey(); // 每次结束拖拽 重新生成1个key
  const _mouseInGrid = mouseInGrid();
  if (_mouseInGrid) {
    try {
      layoutRef.value.dragEvent('dragend', DragPos.i, DragPos.x, DragPos.y, 1, 1);
      // 保存id信息
      saveIdMap(_element.component, key);
    } catch {}
  }
};
const genElementInfo = (target: Comp) => {
  key = generateKey(target.component);
  return {
    ...target,
    options: {
      ...target.options,
    },
    i: String(key),
    // 绑定键值
    model: target.component + '_' + key,
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
