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
          class="draggable-area"
          tag="transition-group"
          :component-data="{ name: 'fade', class: 'widget-list page-index' }"
          @add="add"
          @update="update"
        >
          <template #item="{ element }">
            <div class="widget-box">
              {{ element }}
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
const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
});
const lowcode = useStore();
const { select, data } = lowcode;
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
