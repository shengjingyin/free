<template>
  <el-button type="primary" text @click="click" v-if="!edit">
    {{ value }}<el-icon class="el-icon--right"><Edit /></el-icon>
  </el-button>
  <el-input ref="textInput" v-else v-model="value" autofocus @blur="blur" placeholder="请输入" />
</template>

<script lang="ts" setup>
import { sleep } from '@/shared/util';
import { ref, computed } from 'vue';
const props = defineProps({
  modelValue: String,
});
const emit = defineEmits(['update:modelValue']);
const value = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit('update:modelValue', val);
  },
});
const textInput = ref<any>(null);
const edit = ref(false);
const click = async () => {
  edit.value = true;
  await sleep(200);
  textInput.value?.focus();
};
const blur = () => {
  if (value.value!.length != 0) {
    edit.value = false;
  }
};
</script>
<style lang="less" scoped></style>
