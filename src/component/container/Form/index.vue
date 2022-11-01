<template>
  <!-- 处理从低代码平台传递过来的数据 -->
  <!-- 解析之后再传递给基础组件 -->
  <!-- 这样子，将来如果别的系统想要用这个基础组件，也不会因为平台不同而不能够使用 -->
  <!-- <div> 中间层 </div> -->
  <div class="drop" @dragleave="dragleave" @drop="drop">
    <BaseComp> </BaseComp>
  </div>
</template>

<script lang="ts" setup name="FreeButton">
import dashBoardVue from '@/page/lowcode/edit/dash-board.vue';
import { formList } from '@/component/config';
import BaseComp from './Form.vue';
/* emitter.on('add-component', dragComponent);
  emitter.on('end-add-component', dragEnd); 
*/
// 接受emit事件，是不是也能接受组件
import { computed, PropType, ref } from 'vue';
import emitter from '@/plugin/mitt';

const props = defineProps({
  element: {
    type: Object as PropType<Container>,
    required: true,
  },
});

const options = computed(() => props.element.options);
console.log('🚀 ~ file: index.vue ~ line 25 ~ options', options);

// 按钮中触发时机只有点击、双击、等待
emitter.on(props.element.model + 'event', () => {});

const dragComponent = element => {
  if (formList.includes(element.component)) {
    // console.log('🚀 ~ file: index.vue ~ line 32 ~ dragComponent ~ element', element);
  }
  // 只接收 表单组件
};
const dragEnd = element => {
  // console.log('🚀 ~ file: index.vue ~ line 34 ~ dragComponent ~ element', element);
};
const dragleave = () => {};
const drop = (event, ...args) => {
  console.log('event, args', event, args);
};
// emitter.on('add-component', dragComponent);
// emitter.on('end-add-component', dragEnd);
</script>
<style lang="less" scoped>
.drop {
  height: 100%;
}
</style>
