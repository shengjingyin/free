<template>
  <h5> 默认监听事件 </h5>
  <free-tag v-for="tag of conf.action.eventList" :key="tag">{{ tag.name }}</free-tag>
  <h5> 动作配置 <el-button @click="addAction">添加</el-button> </h5>
  <div v-for="(action, i) of lowcode.select.actions" :key="i">
    {{ action.name }}
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useLowcodeStore } from '@/store/lowcode';
const lowcode = useLowcodeStore(); // lowcode.select.actions
const props = defineProps({
  conf: { type: Object, required: true },
});
const actionList = ref([]);

const addAction = () => {
  const emptyAction = getAction(lowcode.select.component);

  lowcode.select.actions.push(emptyAction);
};
const getAction = (type: string) => {
  console.log('type', type);
  return { name: 'dasd' };
};
console.log('props.conf.action', props.conf.action);
</script>
<style lang="less" scoped></style>
