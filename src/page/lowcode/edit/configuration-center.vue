<template>
  <!-- 卡片配置、组件属性、样式、动作 -->
  <section class="module-container">
    <h5> 配置中心 </h5>
    <el-tabs v-model="activeTab">
      <template v-for="confRelation of confIndex" :key="confRelation.key">
        <el-tab-pane :label="confRelation.key" :name="confRelation.key">
          <component :is="getComp(confRelation.key)" :config="conf[confRelation.field]"></component>
        </el-tab-pane>
      </template>
    </el-tabs>
  </section>
</template>

<script lang="ts" setup>
import { ref, defineAsyncComponent, shallowRef, computed } from 'vue';
import { useLowcodeStore } from '@/store/lowcode';
import { storeToRefs } from 'pinia';
import config from '@/component/config';
import ConfigRender from '@/business-component/config-render/index.vue';
const { select } = storeToRefs(useLowcodeStore());

// 识别对应组件的配置
const conf = computed(() => config[select.value.component]);
const confIndex = computed(() => conf.value.confIndex);
const getComp = tab => tabList.value.find(({ key }) => key === tab)?.component;

const tabList = ref([
  { key: '属性', component: shallowRef(ConfigRender) },
  { key: '样式', component: shallowRef(ConfigRender) },
  {
    key: '动作',
    component: shallowRef(defineAsyncComponent(() => import('./config/action.vue'))),
  },
  { key: '页面', component: shallowRef(ConfigRender) },
]);
const activeTab = computed({
  get() {
    return confIndex.value[0].key;
  },
  set() {},
});
</script>
<style lang="less" scoped></style>
