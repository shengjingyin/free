<template>
  <el-row class="freedom-main">
    <el-col :span="3"><LeftCompList></LeftCompList></el-col>
    <el-col :span="selected ? 15 : 21"><DashBoard></DashBoard></el-col>
    <el-col :span="6" v-if="selected"><ConfigurationCenter></ConfigurationCenter></el-col>
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
const { select } = storeToRefs(useLowcodeStore());
const selected = computed(() => isPlainObject(select.value) && !isEmptyObject(select.value));
</script>
<style lang="css" scoped></style>
