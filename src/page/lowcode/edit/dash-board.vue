<template>
  <!-- 仪表盘 -->
  <section
    :class="{ active: select.type === 'page' }"
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
          :disabled="isDisabled"
          tag="transition-group"
          :component-data="{ name: 'fade' }"
          @add="add"
          @update="update"
        >
          <template #item="{ element, index }">
            <div class="widget-box">
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
import { useStore } from '@/store/lowcode';
import CompWrap from './comp-wrap.vue';
const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
});
const { select, data } = useStore();
const isDisabled = computed(() => props.disabled);
const handleSelectPage = () => {};
const add = (...a) => {
  console.log('🚀 ~ file: dash-board.vue ~ line 56 ~ add ~ a', a);
};
const update = (...b) => {
  console.log('🚀 ~ file: dash-board.vue ~ line 58 ~ update ~ b', b);
};
</script>
<style lang="less" scoped></style>
