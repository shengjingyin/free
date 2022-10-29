<template>
  <!-- 配置渲染中心，根据配置项，来渲染对应的配置内容 -->
  <el-collapse :model-value="activeCollapse">
    <template v-for="item of config" :key="item.key">
      <el-collapse-item :name="item.label" :title="item.label">
        <template #title>
          <h5>
            {{ item.label }}
            <el-icon class="header-icon"> <info-filled /> </el-icon>
          </h5>
        </template>
        <template v-for="conf of item.children" :key="conf.key">
          <el-form-item :label="conf.label" :show-message="false">
            <component
              :is="configurator[conf.component]"
              :config="conf"
              :select="lowcode.select"
              :group="item.group"
            ></component>
          </el-form-item>
        </template>
      </el-collapse-item>
    </template>
  </el-collapse>
</template>

<script lang="ts" setup>
import { ref, defineAsyncComponent, shallowRef } from 'vue';
import { useLowcodeStore } from '@/store/lowcode';
const lowcode = useLowcodeStore();
const configurator = ref({
  switch: shallowRef(defineAsyncComponent(() => import('./comp/switch.vue'))),
  radio: shallowRef(defineAsyncComponent(() => import('./comp/radio.vue'))),
  select: shallowRef(defineAsyncComponent(() => import('./comp/select.vue'))),
  input: shallowRef(defineAsyncComponent(() => import('./comp/input.vue'))),
  'input-number': shallowRef(defineAsyncComponent(() => import('./comp/input-number.vue'))),
  color: shallowRef(defineAsyncComponent(() => import('./comp/color.vue'))),
});
const props = defineProps({
  config: {
    type: Object,
    default: () => {},
  },
});
const activeCollapse = ref(props.config.map(({ label }) => label));
</script>
<style lang="less" scoped>
:deep(.el-form-item) {
  margin-bottom: 0;
}
</style>
