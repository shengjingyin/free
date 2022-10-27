<template>
  <!-- 对组件进行一层包装 -->
  <div
    :class="{
      active: select.model === element?.model,
      is_req: element?.options.required,
      is_hidden: element?.options.hidden,
      [element?.options.customClass]: !!element?.options.customClass,
    }"
    class="widget-view no-mask"
    @click.stop="handleSelect"
  >
    <!-- 根据配置项中定义的 -->
    <component :is="element?.component" :element="element"></component>
    <!-- <div>{{ element }}</div> -->
    <div v-if="select.model == element?.model" class="widget-view-action flex-center-y">
      <el-icon title="复制" :size="16" @click.stop="copyComp"><CopyDocument /></el-icon>
      <el-icon title="删除" :size="16" @click.stop="deleteComp"><Delete /></el-icon>
    </div>

    <!-- 移动 -->
    <div v-if="select.model == element?.model" class="widget-view-drag flex-center">
      <el-icon :size="16"><Rank /></el-icon>
    </div>
    <!-- 展示绑定的数据值 -->
    <!-- v-if="element?.options.dataBind" -->
    <div class="widget-view-model">
      <span>{{ element?.model }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';
import { useLowcodeStore } from '@/store/lowcode';
import { storeToRefs } from 'pinia';
import { cloneDeep } from 'lodash';
import { findParent } from '@/shared/tree/index';
const props = defineProps({
  element: {
    type: Object as PropType<Comp>,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
});
const { select, data } = storeToRefs(useLowcodeStore());
const { SET_CUR_SELECT } = useLowcodeStore();
// 更新当前选中的组件
const handleSelect = () => {
  SET_CUR_SELECT(props.element);
};
const copyComp = () => {
  // 在当前位置复制，后续有容器的时候可能会更复杂（包含嵌套关系）
  const parent = findParent(data.value, props.element);
  const clone = cloneDeep(props.element);
  clone.model = clone.model + '_copy';
  parent.children.splice(props.index + 1, 0, clone);
};
const deleteComp = () => {
  const parent = findParent(data.value, props.element);
  parent.children.splice(props.index, 1);
  SET_CUR_SELECT({});
};
console.log('🚀 ~ file: comp-wrap.vue ~ line 12 ~ props', props.element);
</script>
<style lang="less" scoped></style>
