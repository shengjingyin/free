<template>
  <!-- 处理从低代码平台传递过来的数据 -->
  <!-- 解析之后再传递给基础组件 -->
  <!-- 这样子，将来如果别的系统想要用这个基础组件，也不会因为平台不同而不能够使用 -->
  <!-- <div> 中间层 </div> -->
  <BaseImage :options="options" ref="buttonRef">
    {{ options.textDetail }}
  </BaseImage>
</template>

<script lang="ts" setup name="FreeImage">
import BaseImage from './Image.vue';
import { computed, ref, watch } from 'vue';
import { executeAction } from '@/shared/action';
import { useLowcodeStore } from '@/store/lowcode';
import emitter from '@/plugin/mitt';
import { cloneDeep } from 'lodash';

const props = defineProps({
  element: {
    type: Object,
    required: true,
  },
});
const buttonRef = ref();
const lowcode = useLowcodeStore();

const options = computed(() => props.element.options);
const preview = computed(() => options.value.preview);
watch(
  preview,
  val => {
    if (val) {
      options.value['preview-src-list'] =
        cloneDeep(options.value['preview-src-list-copy']) || cloneDeep([options.value.src]);
      options.value['preview-src-list-copy'] = null;
    } else {
      options.value['preview-src-list-copy'] = cloneDeep(options.value['preview-src-list']);
      options.value['preview-src-list'] = null;
    }
  },
  { immediate: true }
);
</script>
<style lang="less" scoped>
.el-button {
  max-width: 100%;
  max-height: 100%;
}
</style>
