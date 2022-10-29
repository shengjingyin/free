<template>
  <!-- 卡片配置、组件属性、样式、动作 -->
  <h5> 配置中心 </h5>
  <el-tabs v-model="activeTab">
    <template v-for="tab of tabList" :key="tab.key">
      <el-tab-pane :label="tab.key" :name="tab.key">
        <component :is="tab.component" :conf="conf"></component>
      </el-tab-pane>
    </template>
  </el-tabs>
</template>

<script lang="ts" setup>
import { ref, defineAsyncComponent, shallowRef, computed } from 'vue';
import Card from './config/card.vue';
import { useLowcodeStore } from '@/store/lowcode';
import { storeToRefs } from 'pinia';
import config from '@/component/config';
const { select } = storeToRefs(useLowcodeStore());
// 识别对应组件的配置
const conf = computed(() => config[select.value.component]);
const tabList = ref([
    { key: '卡片', component: shallowRef(Card) },
    {
      key: '属性',
      component: shallowRef(defineAsyncComponent(() => import('./config/property.vue'))),
    },
    {
      key: '样式',
      component: shallowRef(defineAsyncComponent(() => import('./config/style.vue'))),
    },
    {
      key: '动作',
      component: shallowRef(defineAsyncComponent(() => import('./config/action.vue'))),
    },
  ]),
  activeTab = '动作';
</script>
<style lang="less" scoped></style>
