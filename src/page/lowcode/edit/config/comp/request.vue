<!-- 发送请求的弹窗 -->

<template>
  <el-dialog v-model="visible" title="请求参数配置">
    <el-form label-position="top" size="small">
      <el-button type="primary" @click="test">测试接口</el-button>
      <el-card shadow="never">
        <template #header>
          <div class="card-header">基本配置</div>
        </template>
        <el-form-item label="请求路径">
          <el-input v-model="data.url" placeholder="请输入地址" class="input-with-select">
            <template #prepend>
              <el-select v-model="data.method" placeholder="请选择请求方法" style="width: 100px">
                <el-option v-for="item in methodsOptions" :key="item" :value="item" />
              </el-select>
            </template>
          </el-input>
        </el-form-item>
      </el-card>
      <br />
      <el-card shadow="never">
        <template #header>
          <div class="card-header"> 请求参数设置 </div>
        </template>
        <el-form-item>
          <li
            v-for="(item, index) in data.params"
            :key="index"
            class="table_prop"
            style="list-style: none"
          >
            <el-input v-model="item.key" placeholder="参数键Key" style="width: 180px" />
            <el-select v-model="item.type" style="width: 150px; margin-left: 5px">
              <el-option
                v-for="paramType in paramOptions"
                :key="paramType.value"
                :label="paramType.label"
                :value="paramType.value"
              />
            </el-select>
            <el-input
              v-if="item.type === 'custom'"
              v-model="item.value"
              placeholder="请输入自定义值"
              style="width: 220px; margin-left: 1px"
            />
            <!-- 展示所有组件的内部值 -->
            <el-cascader
              v-else
              v-model="item.value"
              :options="lowcode.modelMap"
              :show-all-levels="false"
              :props="{ checkStrictly: true }"
              style="width: 220px; margin-left: 1px"
              placeholder="请选择一个数据"
            />
            <el-button
              circle
              plain
              type="primary"
              size="mini"
              icon="Plus"
              style="padding: 4px; margin-left: 5px; height: 24px"
              @click="addParam(index)"
            />
            <el-button
              circle
              plain
              type="danger"
              size="mini"
              icon="Minus"
              style="padding: 4px; margin-left: 5px; height: 24px"
              @click="delParam(index)"
            />
          </li>
        </el-form-item>
      </el-card>
      <br />
      <el-card shadow="never">
        <template #header>
          <div class="card-header">响应配置</div>
        </template>
        <el-form-item label="响应数据节点">
          <el-input
            v-model="data.response.node"
            placeholder="接口返回数据节点, 该节点的数据会赋值给组件, 比如data.list"
          />
        </el-form-item>
        <el-form-item label="静默请求(失败后不提示报错信息)">
          <el-switch v-model="data.response.quietness" />
        </el-form-item>
        <!--  -->
        <el-form-item label="更新数据">
          <li
            v-for="(item, index) in data.response.updateModelList"
            :key="index"
            class="table_prop"
            style="list-style: none"
          >
            <el-cascader
              v-model="item.key"
              :options="updateModelMap"
              :show-all-levels="false"
              :props="{ checkStrictly: true }"
              clearable
              style="width: 180px"
              placeholder="目标数据"
            />
            <el-select
              v-model="item.type"
              placeholder="数据类型"
              style="width: 160px; margin-left: 5px"
            >
              <el-option
                v-for="mode in updateMode"
                :key="mode.value"
                :label="mode.label"
                :value="mode.value"
              />
            </el-select>
            <el-input
              v-model="item.value"
              :placeholder="item.type === 'custom' ? '请输入更新值' : '请输入数据字段(如data.name)'"
              style="width: 220px; margin-left: 5px"
            />
            <el-button
              circle
              plain
              type="danger"
              size="mini"
              icon="el-icon-plus"
              style="padding: 4px; margin-left: 5px"
              @click="addUpdate(index)"
            />
            <el-button
              circle
              plain
              type="danger"
              size="mini"
              icon="el-icon-minus"
              style="padding: 4px; margin-left: 5px"
              @click="delUpdate(index)"
            />
          </li>
        </el-form-item>
      </el-card>
    </el-form>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useLowcodeStore } from '@/store/lowcode';
const lowcode = useLowcodeStore(); // lowcode.select.actions
const visible = ref(false);
const props = defineProps({});
const data = ref<HttpData>({
  url: '',
  method: 'get',
  params: [{ key: '', type: 'fromDataTree', value: [] }],
  response: {
    node: 'data',
    quietness: false,
  },
});
const updateModelMap = [];
const methodsOptions = ['get', 'post', 'put', 'update', 'delete'],
  paramOptions = [
    { label: '自定义', value: 'custom' },
    { label: '从数据结构选择', value: 'fromDataTree' },
  ],
  updateMode = [
    { label: '自定义', value: 'custom' },
    { label: '来自返回数据', value: 'fromServe' },
  ];
const openDialog = action => {
  // 双向绑定
  if (action.request) data.value = action.request;
  if (!action.request) action.request = data.value;
  visible.value = true;
};
const delParam = (index: number) => {
  data.value?.params.splice(index, 1);
};
const addParam = (index?: number) => {
  index = index || 0;
  data.value?.params.splice(index, 0, {
    key: '',
    value: [],
    type: 'fromDataTree',
  });
};
const delUpdate = (index: number) => {
  data.value?.response.updateModelList?.splice(index, 1);
};
const addUpdate = (index?: number) => {
  index = index || 0;
  data.value?.response.updateModelList?.splice(index, 0, {
    key: '',
    value: '',
    type: 'fromServe',
  });
};
const test = () => {};

defineExpose({
  openDialog,
});
</script>
<style lang="less" scoped></style>
