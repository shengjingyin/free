<template>
  <el-row class="freedom-main" v-loading="loading">
    <el-col :span="3">
      <LeftCompList></LeftCompList>
      <el-button @click="openDebugger" type="primary" plain class="debugger-btn">
        debugger
      </el-button>
    </el-col>
    <el-col :span="17">
      <DashBoard
        v-model:layout-data="layout"
        :parent="data"
        class="base-dashboard scrollbar"
      ></DashBoard>
    </el-col>
    <el-col :span="4"><ConfigurationCenter></ConfigurationCenter></el-col>
  </el-row>
  <Debugger ref="debuggerRef" />
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, provide } from 'vue';
import { useLowcodeStore } from '@/store/lowcode';
import { storeToRefs } from 'pinia';
import LeftCompList from './edit/left-comp-list.vue';
import DashBoard from './edit/dash-board.vue';
import ConfigurationCenter from './edit/configuration-center.vue';
import Debugger from '@/business-component/debugger/index.vue';
const { data } = storeToRefs(useLowcodeStore());

const layout = computed<Comp[]>({
  get() {
    return data.value.children;
  },
  set(val) {
    data.value.children = val;
  },
});
// 修改当前元素值
const updateItem = (element, { key, value }) => {
  // 根据element 在layout中查找
  element[key] = value;
};
provide('updateItem', updateItem);
const loading = ref(true);
onMounted(() => {
  loading.value = false;
});
const debuggerRef = ref();
const openDebugger = () => {
  debuggerRef.value.open();
};
</script>
<style lang="less" scoped>
@debugger-height: 600px;
.base-dashboard {
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
}
.debugger-title {
  width: 100%;
}
.debugger-btn {
  position: absolute;
  bottom: 20px;
}
.debugger {
  // position: absolute;
  height: @debugger-height;
  // width: 100vw;
  width: 100%;
}
</style>
