<template>
  <el-form ref="form" :model="form" v-bind="$attrs" @submit.prevent>
    <!-- 前置插槽 -->
    <slot name="prefix"></slot>
    <template v-for="item of formItemList" :key="item.model">
      <!-- v-model 是 value + input 以及 checked || selected + change -->
      <el-form-item :label="item.label" :prop="item.model">
        <component
          v-if="item.component"
          :ref="item.model"
          :is="item.component"
          v-bind="item"
          v-model="form[item.model]"
        >
          <!-- 动态插槽，在free中应该用不到，但是在单独使用的场景可能会用到 -->
          <template v-for="slotName of item.slotNames">
            <slot :name="slotName"></slot>
          </template>
        </component>

        <!-- 自定义组件插槽 -->
        <slot v-else :name="item.model" :data="item"></slot>
      </el-form-item>
    </template>
    <!-- 后置插槽 -->
    <slot name="suffix"></slot>
  </el-form>
</template>

<script lang="ts" setup>
import { PropType, ref } from 'vue';
defineProps({
  formItemList: {
    type: Array as PropType<Comp[]>,
    default: () => [],
  },
});
const form = ref([]);
</script>
<style lang="less" scoped></style>
