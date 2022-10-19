<template>
  <!-- 仪表盘 -->
  <section
    :class="{ active: select.component === 'page' }"
    class="page-container"
    @click.stop="handleSelectPage"
  >
    <div class="page-index-dragarea">
      <div class="page-tag" @click.stop="handleSelectPage">页面</div>

      <div class="widget-list page-index">
        <draggable
          v-model="data.list"
          item-key="id"
          v-bind="{
            group: 'people',
            ghostClass: 'ghost',
            animation: 200,
            handle: '.drag-widget',
            scroll: true,
            scrollSensitivity: 150,
          }"
          tag="main"
          style="flex: 1"
          :disabled="isDisabled"
          @add="add"
          @update="update"
        >
          <template #item="{ element, index }">
            <div class="widget-box" :key="element.key">
              <CompWrap :element="element" :index="index"></CompWrap>
            </div>
          </template>
        </draggable>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import Draggable from 'vuedraggable';
import { useLowcodeStore } from '@/store/lowcode';
import CompWrap from './comp-wrap.vue';
import { generateKey } from '@/shared/util';
const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
});
const { select, data, SET_DATA_LIST } = useLowcodeStore();
const isDisabled = computed(() => props.disabled);
const handleSelectPage = () => {};
// 添加组件（添加唯一key、全局data添加属性）
const add = (event: any) => {
  const newIndex = event.newIndex;
  let target = data.list[newIndex];

  const key = generateKey();

  SET_DATA_LIST(
    {
      ...target,
      options: {
        ...target.options,
        // remoteFunc: target.options.remoteFunc || 'func_' + key,
        // remoteOption: target.options.remoteOption || 'option_' + key,
      },
      key: target.key || key,
      // 绑定键值
      model: target.model || target.component + '_' + key,
    },
    newIndex,
    'add'
  );
};
const update = (...b) => {
  console.log('🚀 ~ file: dash-board.vue ~ line 58 ~ update ~ b', b);
};
const getKey = (...a) => {
  console.log('🚀 ~ file: dash-board.vue ~ line 82 ~ getKey ~ a', a);
  debugger;
  return Math.random();
};
</script>
<style lang="less" scoped></style>
