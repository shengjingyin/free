<template> <router-view></router-view></template>

<script lang="ts" setup>
import { getCurrentInstance } from 'vue';
import { useSystemStore } from '@/store/index';
const $api = getCurrentInstance().proxy?.$api;
// console.log('$api', $api);
const useCounter = useSystemStore();
// console.log('🚀 ~ file: App.vue ~ line 10 ~ useCounter', useCounter);
</script>
<style lang="less" scoped></style>
