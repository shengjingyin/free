<template>
  <div @click.stop="clickGrid(element)" :class="['item-container', isSelectCur ? 'active' : '']">
    <!-- 根据配置项中定义的 -->
    <component :is="element.component" :element="element"></component>

    <!-- 移动 -->
    <template v-if="isSelectCur">
      <el-icon class="copy tool" title="复制" :size="16" @click.stop="copyComp"
        ><CopyDocument
      /></el-icon>
      <el-icon class="delete tool" title="删除" :size="16" @click.stop="deleteComp"
        ><Delete
      /></el-icon>
    </template>
    <div :class="['drag-able', isSelectCur ? 'active' : '']"> </div>
    <template v-if="element?.options.dataBind || true">
      <!-- 展示绑定的数据值 -->
      <span class="bind-model">{{ element?.model }}</span>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { PropType, computed } from 'vue';
import { useLowcodeStore } from '@/store/lowcode';
import { storeToRefs } from 'pinia';
import { cloneDeep } from 'lodash';
import { findParent } from '@/shared/tree/index';
import { generateKey, saveIdMap } from '@/shared/util';
const props = defineProps({
  parent: {
    type: Object as PropType<Container>,
    required: true,
  },
  element: {
    type: Object as PropType<Comp>,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
});
const { select, idMap } = storeToRefs(useLowcodeStore());
const { SET_CUR_SELECT } = useLowcodeStore();
const isSelectCur = computed(() => select.value.model == props.element.model);
// 更新当前选中的组件
const clickGrid = element => {
  SET_CUR_SELECT(element.i);
};
const copyComp = () => {
  // 在当前位置复制，后续有容器的时候可能会更复杂（包含嵌套关系）
  // const parent = findParent(props.parent, props.element);
  const clone = cloneDeep(props.element);
  const index = generateKey(clone.component);
  clone.model = clone.component + `_${index}`;
  clone.i = String(idMap.value.total + 1);
  // 还有位置信息也要改变
  clone.x = clone.x;
  clone.y = (clone.y as number) + (clone.h as number);
  props.parent.children.push(clone);
  // 保存id信息
  saveIdMap(clone.component, index);
};
const deleteComp = () => {
  props.parent.children.splice(props.index, 1);
  SET_CUR_SELECT('0');
};
</script>
<style lang="less" scoped>
.item-container {
  position: relative;
  width: 100%;
  height: 100%;
  &:hover {
    .drag-able {
      background-color: rgba(101, 142, 175, 0.1);
    }
  }
}

.drag-able {
  position: absolute;
  left: -20px;
  right: -20px;
  top: -20px;
  bottom: -20px;
  z-index: -1;
  cursor: move;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
  &.active {
    background-color: rgba(101, 142, 175, 0.2);
  }
}
.drag-widget {
  position: absolute;
  top: 0;
  left: 0;
  transform: translateX(-120%);
  z-index: 899999999999999999 !important;
}
.copy {
  position: absolute;
  top: 0;
  right: 0;
  transform: translateX(120%);
  cursor: pointer;
}
.delete {
  position: absolute;
  top: 25px;
  right: 0;
  transform: translateX(120%);
  cursor: pointer;
}
.bind-model {
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  transform: translateY(120%);
}
.tool {
  width: 25px;
  height: 25px;
  // background-color: #c6c0c0;
  border-radius: 50%;
  transition: all 0.3s;
  &:hover {
    background-color: skyblue;
    color: #fff;
  }
}
</style>
