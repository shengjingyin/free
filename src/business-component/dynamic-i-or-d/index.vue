<template>
  <template v-if="Array.isArray(list)">
    <el-row class="row" :gutter="24" align="middle" v-for="(child, index) in list" :key="child">
      <slot name="item" :data="child" :index="index"></slot>

      <el-button type="primary" circle plain @click="increase(index)">+</el-button>
      <el-button type="danger" circle plain :disabled="list.length === 1" @click="decrease(index)">
        -
      </el-button>
    </el-row>
  </template>
</template>

<script lang="ts" setup>
import { PropType, computed, ref } from 'vue';
import { cloneDeep } from 'lodash';
const props = defineProps({
  list: {
    type: Array as PropType<unknown[]> | null,
    required: true,
  },
});
const emit = defineEmits(['update:list']);
const item = ref(props.list ? props.list[0] : null);
const formList = computed({
  get() {
    return props.list;
  },
  set(val) {
    emit('update:list', val);
  },
});

const increase = (index: number) => {
  formList.value.splice(index + 1, 0, cloneDeep(item.value));
  //   emits("update:list", props.list);
};
const decrease = (index: number) => {
  formList.value.splice(index, 1);
  //   emits("update:list", props.list);
};
</script>
<style lang="less" scoped>
.row {
  flex-wrap: nowrap !important;
  margin-left: unset !important;
  width: 100%;
}

:deep(.el-button) {
  width: 25px;
  margin-left: 5px;
  height: 25px;
}
</style>
