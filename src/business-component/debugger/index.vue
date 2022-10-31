<template>
  <el-dialog
    v-model="showDebugger"
    width="100%"
    style="height: 80%"
    title="debugger"
    destroy-on-close
  >
    <el-row class="debugger-title">
      <el-col :span="5">
        <h4>所有属性</h4>
      </el-col>
      <el-col :span="4">
        <h4>当前选中</h4>
      </el-col>
      <el-col :span="5">
        <h4>事件树</h4>
      </el-col>
      <el-col :span="5">
        <h4>动作树</h4>
      </el-col>
      <el-col :span="4">
        <h4>数据绑定</h4>
      </el-col>
    </el-row>
    <el-row class="debugger">
      <el-col :span="5" style="height: 100%">
        <free-raw-displayer
          :readOnly="true"
          :defaultValue="dataString"
          :modelValue="dataString"
        ></free-raw-displayer>
      </el-col>
      <el-col :span="4" style="height: 100%">
        <free-raw-displayer
          :readOnly="true"
          :defaultValue="selectString"
          :modelValue="selectString"
        ></free-raw-displayer>
      </el-col>
      <el-col :span="5" style="height: 100%">
        <free-raw-displayer
          :readOnly="true"
          :defaultValue="evenTree"
          :modelValue="evenTree"
        ></free-raw-displayer>
      </el-col>
      <el-col :span="5" style="height: 100%">
        <free-raw-displayer
          :readOnly="true"
          :defaultValue="actionTree"
          :modelValue="actionTree"
        ></free-raw-displayer>
      </el-col>
      <el-col :span="4" style="height: 100%">
        <free-raw-displayer
          :readOnly="true"
          :defaultValue="modelMapTree"
          :modelValue="modelMapTree"
        ></free-raw-displayer>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useLowcodeStore } from '@/store/lowcode';
import { storeToRefs } from 'pinia';
const { select, data, eventOption, modelMap, actionOption } = storeToRefs(useLowcodeStore());

const dataString = computed(() => JSON.stringify(data.value, null, 2));
const selectString = computed(() => JSON.stringify(select.value, null, 2));
const evenTree = computed(() => JSON.stringify(eventOption.value, null, 2));
const actionTree = computed(() => JSON.stringify(actionOption.value, null, 2));
const modelMapTree = computed(() => JSON.stringify(modelMap.value, null, 2));
const showDebugger = ref(false);

const open = () => {
  showDebugger.value = true;
};

defineExpose({
  open,
});
</script>
<style lang="less" scoped></style>
