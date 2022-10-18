<template> <router-view></router-view></template>

<script lang="ts" setup>
import { getCurrentInstance } from 'vue';
import { useCounterStore } from '@/store/index';

const $api = getCurrentInstance().proxy?.$api;
console.log('$api', $api);
const useCounter = useCounterStore();
</script>
<style lang="less" scoped></style>
