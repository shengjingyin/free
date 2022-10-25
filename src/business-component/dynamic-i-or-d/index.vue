<template>
  <el-row :gutter="24" align="middle" v-for="(child, index) in list" :key="child.key">
    <slot name="item" :data="child" :index="index"></slot>
    <slot name="tool"> </slot>
    <el-button circle plain @click="increase(index)">+</el-button>
    <el-button circle plain :disabled="index === 0" @click="decrease(index)"> - </el-button>
  </el-row>
</template>

<script lang="ts" setup>
import { PropType, computed } from 'vue';
import { cloneDeep } from 'lodash';
const props = defineProps({
  list: {
    type: Array as PropType<AnyObj[]>,
    required: true,
  },
  item: {
    type: Object,
    required: true,
  },
});
const emit = defineEmits(['update:list']);
const formList = computed({
  get() {
    return props.list;
  },
  set(val) {
    emit('update:list', val);
  },
});

const increase = (index: number) => {
  formList.value.splice(index + 1, 0, cloneDeep(props.item));
  //   emits("update:list", props.list);
};
const decrease = (index: number) => {
  formList.value.splice(index, 1);
  //   emits("update:list", props.list);
};
</script>
<style lang="less" scoped></style>
