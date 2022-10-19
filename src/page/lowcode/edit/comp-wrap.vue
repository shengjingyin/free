<template>
  <!-- 对组件进行一层包装 -->
  <div
    :class="{
      active: select.key === element?.key,
      is_req: element?.options.required,
      is_hidden: element?.options.hidden,
      [element?.options.customClass]: !!element?.options.customClass,
    }"
    class="widget-view no-mask"
    @click.stop="handleSelect"
  >
    <!-- <widget-element-item
      :element="element"
      :is-table="false"
      :key="element.key"
      :index="index"
      :data="data"
      :parent="parent"
      :draggable="draggable"
    />
 -->
    <!-- 根据配置项中定义的 -->
    <component :is="element?.component" :element="element"></component>
    <!-- <div>{{ element }}</div> -->
    <div v-if="select.key == element?.key" class="widget-view-action flex-center-y">
      <el-icon title="复制" :size="16" @click.stop="copyComp"><CopyDocument /></el-icon>
      <el-icon title="删除" :size="16" @click.stop="deleteComp"><Delete /></el-icon>
    </div>

    <!-- 移动 -->
    <div v-if="select.key == element?.key" class="widget-view-drag flex-center">
      <el-icon :size="16"><Rank /></el-icon>
    </div>
    <!-- 展示绑定的数据值 -->
    <!-- v-if="element?.options.dataBind" -->
    <div class="widget-view-model">
      <span>{{ element.model }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useLowcodeStore } from '@/store/lowcode';
import { storeToRefs } from 'pinia';
const props = defineProps({
  element: {
    type: Object,
  },
  index: {
    type: Number,
  },
});
const { select } = storeToRefs(useLowcodeStore());
const { SET_CUR_SELECT } = useLowcodeStore();
// 更新当前选中的组件
const handleSelect = () => {
  SET_CUR_SELECT(props.element);
};
const copyComp = () => {
  console.log('props.index', props.index);
};
const deleteComp = () => {
  console.log('props.index', props.index);
};
console.log('🚀 ~ file: comp-wrap.vue ~ line 12 ~ props', props.element);
</script>
<style lang="less" scoped></style>
