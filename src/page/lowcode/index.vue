<template>
  <el-row class="freedom-main">
    <el-col :span="3"><LeftCompList></LeftCompList></el-col>
    <el-col :span="15"><DashBoard></DashBoard></el-col>
    <el-col :span="6">配置中心</el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import LeftCompList from './edit/left-comp-list.vue';
import DashBoard from './edit/dash-board.vue';
</script>
<style lang="css" scoped></style>
