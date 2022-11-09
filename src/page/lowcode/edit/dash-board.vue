<template>
  <!-- 仪表盘 -->
  <section
    ref="dashBoardRef"
    class="size-100 dash-board"
    :style="styles"
    @click.stop="handleSelectPage"
  >
    <grid-layout
      ref="layoutRef"
      class="grid-layout"
      :margin="[margin, margin]"
      v-model:layout="layout"
      :col-num="colNum"
      :row-height="rowHeight"
      :is-draggable="true"
      :is-resizable="true"
      :vertical-compact="false"
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
        <CompWrap :element="item" :parent="parent" :index="index"></CompWrap>
      </grid-item>
    </grid-layout>
  </section>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, nextTick, watch, PropType } from 'vue';
import { useLowcodeStore } from '@/store/lowcode';
import CompWrap from './comp-wrap.vue';
import { generateKey, saveIdMap } from '@/shared/util';
import emitter from '@/plugin/mitt';
import { storeToRefs } from 'pinia';
import { saveTreeData } from '@/shared/app';
import { debounce, throttle } from 'lodash';
import { useMouse } from '@/composables/mouse';
const emit = defineEmits(['update:layout-data']);
const { x, y } = useMouse();
const props = defineProps({
  layoutData: {
    type: Array as PropType<Comp[]>,
    required: true,
  },
  parent: {
    type: Object as PropType<Container>,
    required: true,
  },
});
const { SET_CUR_SELECT } = useLowcodeStore();
const { data, idMap, selectId, select } = storeToRefs(useLowcodeStore());
// 设置当前选中组件为页面
const handleSelectPage = () => {
  SET_CUR_SELECT('0');
};
// 列、数量
const colNum = computed(() => props.parent.options?.col);
// 行高
const rowHeight = computed(() => props.parent.options && props.parent.options['row-height']); // 这里怎么写?
// 卡片间距
const margin = computed(() => props.parent.options && props.parent.options['card-margin']);
// 样式
const styles = computed(() => props.parent.style);

const layout = computed<Comp[]>({
  get() {
    return props.layoutData;
  },
  set(val) {
    emit('update:layout-data', val);
  },
});

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
let DragPos: GridItem = { x: 0, y: 0, w: 1, h: 1, i: '' };
const layoutRef = ref();
const gridItemRef = ref();
let parentRect: DOMRect;

onMounted(() => {
  emitter.on('add-component', dragComponent);
  emitter.on('end-add-component', dragEnd);
});
const dashBoardRef = ref<HTMLElement>();
const mouseInGrid = () => {
  if (!dashBoardRef.value) return false;
  parentRect = dashBoardRef.value.getBoundingClientRect();
  return (
    x.value > parentRect.left &&
    x.value < parentRect.right &&
    y.value > parentRect.top &&
    y.value < parentRect.bottom &&
    // 除了满足在仪表盘内，还需要满足不在嵌套外面，如果我想去嵌套A内，经过全局时，需要在进入嵌套A内，把全局内的元素删除掉
    // 如果在内层任意嵌套内，发现了当前元素，那么要删除外层该元素
    // 通过选中容器与当前容器id做对比，看看哪个容器可以添加元素，有children属性的是容器
    props.parent.hasOwnProperty('children') &&
    selectId.value === props.parent.i
  );
};
let _element;
const log = throttle(() => {
  console.log(
    `布局属性 容器：${props.parent.i} 当前选中：${selectId.value}----` +
      JSON.stringify(layout.value, null, 2)
  );
}, 200);
const computedPosition = index => {
  const newGrid = gridItemRef.value[index];
  const new_pos = newGrid.calcXY(y.value - parentRect.top, x.value - parentRect.left);
  return new_pos;
};
const dragComponent = async element => {
  // 如果当前选中的组件不是容器组件，那么重置当前选中为page
  if (!select.value.hasOwnProperty('children')) {
    SET_CUR_SELECT('0');
  }
  const _mouseInGrid = mouseInGrid();
  _element = genElementInfo(element);
  // 判断添加进来的组件是不是已经在列表中
  // 查找元素需要支持嵌套关系【对于每一层的布局来说，只是一个一维数组】
  let index = layout.value.findIndex(item => item.i === _element.i);
  if (_mouseInGrid) {
    if (index === -1) {
      layout.value.push(_element);
    } else {
      // 目标元素已经存在与布局中，变化坐标
      await nextTick();
      try {
        // 根据坐标 计算 位置
        let new_pos = computedPosition(index);
        /* (eventName, id, x, y, h, w) */
        layoutRef.value.dragEvent('dragstart', _element.i, new_pos.x, new_pos.y, 1, 1);
        DragPos.i = _element.i;
        DragPos.x = layout.value[index].x as number;
        DragPos.y = layout.value[index].y as number;
      } catch {}
    }
  }
};
let key;
const dragEnd = () => {
  const _mouseInGrid = mouseInGrid();
  // 除了满足在仪表盘内，还需要满足不在嵌套外面，如果我想去嵌套A内，经过全局时，需要在进入嵌套A内，把全局内的元素删除掉
  // 如果在内层任意嵌套内，发现了当前元素，那么要删除外层该元素
  try {
    layoutRef.value.dragEvent('dragend', DragPos.i, DragPos.x, DragPos.y, 1, 1);
    if (_mouseInGrid) {
      // 保存id信息
      saveIdMap(_element.component, key);
    } else {
      // 去除 当前添加的元素
      layout.value = layout.value.filter(obj => obj.i != _element.i);
      // layout.value = [];
    }
  } catch {}
};
const genElementInfo = (target: Comp) => {
  key = generateKey(target.component);
  let new_pos;
  if (gridItemRef.value && gridItemRef.value.length > 0) {
    new_pos = computedPosition(gridItemRef.value.length - 1);
  } else {
    new_pos = { x: 0, y: 0 };
  }

  return {
    ...target,
    options: {
      ...target.options,
    },
    i: String(idMap.value.total + 1), // + 1 ，从1开始计数
    // 绑定键值
    model: target.component + '_' + key,
    // 这里可以根据相应规则变化
    x: new_pos.x,
    y: new_pos.y, // puts it at the bottom
  };
};
</script>

<style scoped lang="less">
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
.vue-grid-item {
  box-sizing: border-box;
}
.vue-grid-item:not(.vue-grid-placeholder) {
  background: transparent;
  border: 1px solid black;
}
:deep(.vue-grid-item.vue-grid-placeholder) {
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
