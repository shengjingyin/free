<template>
  <!-- 处理从低代码平台传递过来的数据 -->
  <!-- 解析之后再传递给基础组件 -->
  <!-- 这样子，将来如果别的系统想要用这个基础组件，也不会因为平台不同而不能够使用 -->
  <!-- <div> 中间层 </div> -->
  <dashBoardVue v-model:layout-data="layout" :parent="element"></dashBoardVue>
</template>

<script lang="ts" setup name="FreeButton">
import dashBoardVue from '@/page/lowcode/edit/dash-board.vue';
import { computed, PropType, ref, inject } from 'vue';
import emitter from '@/plugin/mitt';
const updateItem = inject<Function>('updateItem');
const props = defineProps({
  element: {
    type: Object as PropType<Container>,
    required: true,
  },
});

const options = computed(() => props.element.options);

const layout = computed<Comp[]>({
  get() {
    return props.element.children;
  },
  set(val) {
    console.log('🚀 ~ file: index.vue ~ line 29 ~ set ~ val', val);
    // props.element.children = val; // 嵌套有点深，直接在这里改了
    updateItem!(props.element, { key: 'children', value: val });
  },
});

// 按钮中触发时机只有点击、双击、等待
emitter.on(props.element.model + 'event', () => {});
</script>
<style lang="less" scoped></style>
