<template>
  <!-- 卡片配置、组件属性、样式、动作 -->
  <div> 配置中心 </div>
  <el-tabs v-model="activeTab">
    <template v-for="tab of tabList" :key="tab.key">
      <el-tab-pane :label="tab.key" :name="tab.key">
        <component :is="tab.component"></component>
      </el-tab-pane>
    </template>
  </el-tabs>
</template>

<script lang="ts" setup>
import { ref, defineAsyncComponent, shallowRef } from 'vue';
import Card from './config/card.vue';
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
  activeTab = '属性';
</script>
<style lang="less" scoped></style>
