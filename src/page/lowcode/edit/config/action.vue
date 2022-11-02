<template>
  <h5> 默认监听事件 </h5>
  <el-tag v-for="tag of config.eventList" :key="tag">{{ tag.label }}</el-tag>
  <h5> 动作配置 <el-button @click="addAction">添加</el-button> </h5>
  <!-- 做动作配置 -->
  <div v-for="(action, i) of lowcode.select.actions" :key="i">
    <!-- 动作名称 -->
    <EditableText v-model="action.name"></EditableText>
    <br />
    <!-- 触发条件 -->
    <el-form-item label="触发条件">
      <el-select :option="actionTriggerList" v-model="action.trigger"></el-select>
    </el-form-item>
    <el-form-item label="触发类型">
      <el-select :option="actionTypeList" v-model="action.type"></el-select>
    </el-form-item>

    <!-- 跳转 -->
    <template v-if="action.type === 'skip'">
      <el-form-item label="资源地址">
        <el-input v-model="action.skip.url" placeholder="请输入资源地址" />
      </el-form-item>
      <el-form-item label="在何处打开文档">
        <!-- 下载的资源类型可选择 -->
        <el-select :option="SkipType" v-model="action.skip.type"></el-select>
      </el-form-item>
    </template>
    <!-- 触发下载 -->
    <template v-if="action.type === 'download'">
      <el-form-item label="资源地址">
        <el-input v-model="action.download.url" placeholder="请输入资源地址" />
      </el-form-item>
      <el-form-item label="资源类型">
        <!-- 下载的资源类型可选择 -->
        <el-select :option="DownloadType" v-model="action.download.type"></el-select>
      </el-form-item>
    </template>
    <!-- 触发事件 -->
    <el-form-item label="事件" v-if="action.type === 'event'">
      <el-cascader v-model="action.event" :options="lowcode.eventOption" :show-all-levels="false" />
    </el-form-item>

    <!-- 触发动作 -->
    <el-form-item label="动作" v-if="action.type === 'action'">
      <el-cascader
        v-model="action.action"
        :options="lowcode.actionOption"
        :show-all-levels="false"
      />
    </el-form-item>
    <!-- 请求配置 -->
    <el-form-item label="请求配置" v-if="action.type === 'request'">
      <el-button @click="openRequestConfig(i)">配置</el-button>
    </el-form-item>
  </div>
  <RequestConfig ref="requestRef"></RequestConfig>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue';
import { useLowcodeStore } from '@/store/lowcode';
import EditableText from '@/business-component/editable-text/index.vue';
import RequestConfig from './comp/request.vue';
import { DownloadType, SkipType } from '@/shared/schema/data';
import store from 'storejs';
const lowcode = useLowcodeStore(); // lowcode.select.actions
const props = defineProps({
  config: { type: Object, required: true },
});
const requestRef = ref<{ openDialog: RequestRef }>();
const actionTriggerList = computed(() => props.config.triggerCondition);
console.log('🚀 ~ file: action.vue ~ line 72 ~ actionTriggerList', actionTriggerList);
const actionTypeList = computed(() => props.config.type);

watch(
  () => lowcode.select,
  () => {
    // 只要属性有变化，就更新树
    store.set('data', JSON.stringify(lowcode.data));
  },
  { deep: true }
);
const addAction = () => {
  const emptyAction = getAction(lowcode.select);
  lowcode.select.actions.push(emptyAction);
};
// 返回配置信息
const getAction = (element: Comp) => {
  return {
    name: `${element.name} - 动作 ${element.actions.length + 1}`,
    download: { type: 'image/jpeg' },
    skip: { type: '_blank' },
  } as Action;
};
const openRequestConfig = (index: number) => {
  const curAction = lowcode.select.actions[index];
  requestRef.value?.openDialog(curAction);
};
</script>
<style lang="less" scoped></style>
