<template>
  <el-form class="form" ref="form" label-width="100px" v-bind="$attrs" @submit.prevent>
    <draggable
      :list="formItemList"
      item-key="model"
      ghost-class="ghost"
      chosen-class="chosenClass"
      animation="300"
      @start="onStart"
      @end="onEnd"
    >
      <template #item="{ element, index }">
        <el-form-item class="item" :label="element.label" :prop="element.model">
          <!--  <component
            v-if="element.component"
            :is="element.component"
            :element="element"
            v-model:modelValue="form[element.model]"
          >
          </component> -->
          <CompWrapVue
            :parent="parent"
            :element="element"
            :index="index"
            v-model:modelValue="form[element.model]"
          ></CompWrapVue>
        </el-form-item>
      </template>
    </draggable>
    <!-- </template> -->
    <!-- 后置插槽 -->
    <slot name="suffix">
      <el-form-item>
        <el-button type="primary" @click="submitForm">Submit</el-button>
        <el-button @click="resetForm">Reset</el-button>
      </el-form-item>
    </slot>
  </el-form>
</template>

<script lang="ts" setup>
import { PropType, computed } from 'vue';
import draggable from 'vuedraggable';
import CompWrapVue from '@/page/lowcode/edit/comp-wrap.vue';
const props = defineProps({
  parent: {
    type: Object as PropType<Container>,
    required: true,
  },
  formItemList: {
    type: Array as PropType<Comp[]>,
    default: () => [],
  },
  modelValue: {
    type: [String, Object, Number, Boolean],
    required: true,
  },
});
const emit = defineEmits(['update:modelValue']);
const form = computed({
  get() {
    return props.modelValue;
  },
  set(newVal) {
    emit('update:modelValue', newVal);
  },
});
const submitForm = () => {};
const resetForm = () => {};

//拖拽开始的事件
const onStart = args => {
  console.log('开始拖拽', args);
};

//拖拽结束的事件
const onEnd = args => {
  console.log('结束拖拽', args);
};
</script>
<style lang="less" scoped>
.form-container {
  display: flex;
  flex-direction: column;
}
.form {
  padding: 10px;
  overflow: auto;
  flex: 1;
}
.item:hover,
:deep(.el-form-item__label) {
  cursor: move;
}
</style>
