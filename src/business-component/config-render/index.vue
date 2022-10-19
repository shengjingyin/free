<template>
  <!-- 配置中心，根据配置项，来渲染对应的配置内容 -->
  <template v-for="item of config.property" :key="item.key">
    <el-form-item :label="item.label">
      <component
        :is="configurator[item.component]"
        :config="item"
        :select="lowcode.select"
      ></component>
    </el-form-item>
  </template>
</template>

<script lang="ts" setup>
import { ref, defineAsyncComponent, shallowRef } from 'vue';
import { useLowcodeStore } from '@/store/lowcode';
const lowcode = useLowcodeStore();
const configurator = ref({
  switch: shallowRef(defineAsyncComponent(() => import('./comp/switch.vue'))),
  radio: shallowRef(defineAsyncComponent(() => import('./comp/radio.vue'))),
  select: shallowRef(defineAsyncComponent(() => import('./comp/select.vue'))),
});
const props = defineProps({
  config: {
    type: Object,
    default: () => {},
  },
});
</script>
<style lang="less" scoped></style>
