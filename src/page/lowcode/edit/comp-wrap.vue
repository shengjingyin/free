<template>
  <div @click.stop="clickGrid(element)" :class="['item-container', isSelectCur ? 'active' : '']">
    <!-- 根据配置项中定义的 -->
    <!-- 在form中 -->
    <component
      v-if="element.inForm"
      :is="element.component"
      :element="element"
      v-model:modelValue="value"
    ></component>
    <!-- 在正常布局中6 -->
    <component v-else :is="element.component" :element="element"></component>

    <!-- 移动 -->
    <div class="node-list">
      <template v-if="element.options?.dataBind || true">
        <!-- 展示绑定的数据值 -->
        <span class="bind-model">{{ `${element?.model}` }}</span>
      </template>
      <template v-if="isSelectCur">
        <el-icon class="copy tool" title="复制" :size="16" @click.stop="copyComp">
          <CopyDocument />
        </el-icon>
        <el-icon class="delete tool" title="删除" :size="16" @click.stop="deleteComp">
          <Delete />
        </el-icon>
      </template>
    </div>
    <!-- 背景 -->
    <div :class="['drag-able', isSelectCur ? 'active' : '']"> </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType, computed } from 'vue';
import { useLowcodeStore } from '@/store/lowcode';
import { storeToRefs } from 'pinia';
import { cloneDeep } from 'lodash';
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
  modelValue: {
    type: [String, Object, Number, Boolean],
  },
});
const { select, idMap } = storeToRefs(useLowcodeStore());
const { SET_CUR_SELECT } = useLowcodeStore();
const isSelectCur = computed(() => select.value.model == props.element.model);
// 更新当前选中的组件
const clickGrid = element => {
  SET_CUR_SELECT(element.i);
};
const layout = computed<Comp[]>({
  get() {
    return props.parent.children;
  },
  set() {},
});
// 在form中时,需要把值传递给form, 当不在form中时,这段无效
const emit = defineEmits(['update:modelValue']);
const value = computed({
  get() {
    return props.modelValue || '';
  },
  set(newVal) {
    emit('update:modelValue', newVal);
  },
});
const copyComp = () => {
  // 在当前位置复制，后续有容器的时候可能会更复杂（包含嵌套关系）
  const clone = cloneDeep(props.element);
  const index = generateKey(clone.component);
  clone.model = clone.component + `_${index}`;
  clone.i = String(idMap.value.total + 1);
  // 还有位置信息也要改变
  clone.x = clone.x;
  clone.y = (clone.y as number) + (clone.h as number);
  layout.value.push(clone);
  // 保存id信息
  saveIdMap(clone.component, index);
};
const deleteComp = () => {
  layout.value.splice(props.index, 1);
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
      // background-color: rgba(101, 142, 175, 0.1);
    }
  }
}

.drag-able {
  position: absolute;
  left: -10px;
  right: -10px;
  top: -10px;
  bottom: -35px;
  z-index: -1;
  cursor: move;
  &:hover {
    background-color: rgba(101, 142, 175, 0.1);
  }
  &.active {
    background-color: rgba(101, 142, 175, 0.2);
  }
}

.node-list {
  position: absolute;
  bottom: -25px;
  left: 0;
  display: flex;
  align-items: center;
}
.bind-model {
  white-space: nowrap;
  margin-right: 5px;
  color: #999;
}
.tool {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  transition: all 0.3s;
  cursor: pointer;
  &:hover {
    background-color: skyblue;
    color: #fff;
  }
}
</style>
