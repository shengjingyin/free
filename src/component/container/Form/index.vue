<template>
  <el-form
    class="form drop scrollbar"
    ref="form"
    label-width="100px"
    v-bind="options"
    @submit.prevent
    @dragleave="dragleave"
    @drop="drop"
    @dragover="dragover"
  >
    <draggable
      :list="formData"
      item-key="model"
      ghost-class="ghost"
      chosen-class="chosenClass"
      animation="300"
      handle=".el-form-item__label"
    >
      <template #item="{ element: item, index }">
        <el-form-item class="item" :label="item.label" :prop="item.model">
          <CompWrapVue
            :parent="element"
            :element="item"
            :index="index"
            v-model:modelValue="formValue[item.model]"
          ></CompWrapVue>
        </el-form-item>
      </template>
    </draggable>
    <!-- 后置插槽 -->
    <el-form-item>
      <el-button type="primary" @click="submitForm">提交</el-button>
      <el-button @click="resetForm">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup name="FreeButton">
import draggable from 'vuedraggable';
import CompWrapVue from '@/page/lowcode/edit/comp-wrap.vue';
import { generateKey, saveIdMap } from '@/shared/util';
import { computed, PropType, ref, watch } from 'vue';
import emitter from '@/plugin/mitt';
import { cloneDeep, extend } from 'lodash';
import { storeToRefs } from 'pinia';
import { useLowcodeStore } from '@/store/lowcode';
const { idMap } = storeToRefs(useLowcodeStore());

const props = defineProps({
  element: {
    type: Object as PropType<Container>,
    required: true,
  },
});

const formValue = ref({});

const options = computed(() => props.element.options);

// 按钮中触发时机只有点击、双击、等待
emitter.on(props.element.model + 'event', () => {});

const formData = computed<Comp[]>({
  get() {
    return props.element.children;
  },
  set() {},
});
watch(
  formValue,
  () => {
    console.log('formValue', formValue.value);
  },
  { deep: true }
);
const additionalInformation = {
  'free-input': {
    label: '输入框',
  },
};

let key;
const genElementInfo = (target: Comp) => {
  key = generateKey(target.component);
  return {
    ...target,
    options: {
      ...target.options,
    },
    i: String(idMap.value.total + 1), // + 1 ，从1开始计数
    // 绑定键值
    model: target.component + '_' + key,
    inForm: true,
  };
};
const dragleave = () => {};
const drop = (event: DragEvent) => {
  const data = event.dataTransfer?.getData('element'); // 值只有在放下时，才能获取
  if (data) {
    const element = JSON.parse(data);
    console.log('🚀 ~ 容器：放置', element);
    // 有补充信息的说明是表单
    if (additionalInformation.hasOwnProperty(element.component)) {
      extend(element, cloneDeep(additionalInformation[element.component]));
      // 处理
      // 生成渲染数据
      const _element = genElementInfo(element);
      // 生成表单值保存
      formValue.value[_element.model] = '';
      // 处理
      formData.value.push(_element);
      saveIdMap(_element.component, key);
    }
  }
};
const dragover = event => {
  event.preventDefault(); // 调用event.preventDefault才能触发drop事件
};

const submitForm = () => {
  alert(JSON.stringify(formValue.value, null, 2));
};
const resetForm = () => {
  Object.keys(formValue.value).forEach(key => {
    formValue.value[key] = null;
  });
};
</script>
<style lang="less" scoped>
.drop {
  height: 100%;
  z-index: 999999;
  box-sizing: border-box;
}
.form-container {
  display: flex;
  flex-direction: column;
}
.form {
  padding: 10px;
  overflow: auto;
  flex: 1;
}
:deep(.el-form-item__label) {
  cursor: move;
}
</style>
