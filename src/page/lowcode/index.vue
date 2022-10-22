<template>
  <el-row class="freedom-main">
    <el-col :span="3"><LeftCompList></LeftCompList></el-col>
    <el-col :span="selected ? 15 : 21"><DashBoard></DashBoard></el-col>
    <el-col :span="6" v-if="selected"><ConfigurationCenter></ConfigurationCenter></el-col>
  </el-row>
  <el-row class="debugger-title">
    <el-col :span="12" style="height: 100%">
      <h4>所有属性</h4>
    </el-col>
    <el-col :span="12" style="height: 100%">
      <h4>当前选中</h4>
    </el-col>
  </el-row>
  <el-row class="debugger">
    <el-col :span="12" style="height: 100%">
      <free-raw-displayer
        :readOnly="true"
        :defaultValue="dataString"
        :modelValue="dataString"
      ></free-raw-displayer>
    </el-col>
    <el-col :span="12" style="height: 100%">
      <free-raw-displayer
        :readOnly="true"
        :defaultValue="selectString"
        :modelValue="selectString"
      ></free-raw-displayer>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import LeftCompList from './edit/left-comp-list.vue';
import DashBoard from './edit/dash-board.vue';
import ConfigurationCenter from './edit/configuration-center.vue';
import { isEmptyObject, isPlainObject } from '@/shared/util';
import { useLowcodeStore } from '@/store/lowcode';
import { storeToRefs } from 'pinia';
const { select, data } = storeToRefs(useLowcodeStore());

const dataString = computed(() => JSON.stringify(data.value, null, 2));
const selectString = computed(() => JSON.stringify(select.value, null, 2));

const selected = computed(() => isPlainObject(select.value) && !isEmptyObject(select.value));
</script>
<style lang="css" scoped>
.debugger-title {
  bottom: 500px;
  position: absolute;
  width: 100vw;
}
.debugger {
  position: absolute;
  bottom: 0;
  height: 500px;
  width: 100vw;
}
</style>
