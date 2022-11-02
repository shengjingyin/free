<template>
  <div class="module-container">
    <div class="widget-list-title">{{ listTitle }}</div>
    <template v-for="(component, i) in allComponents" :key="i">
      <h5 class="widget-cate"> {{ component.title }} </h5>
      <ul>
        <li
          v-for="element of component.list"
          :key="element.type"
          class="widget-edit-label no-put"
          @dragstart="dragstart(element, $event)"
          @drag="drag(element, $event)"
          @dragend="dragend(element)"
          draggable="true"
          unselectable="on"
        >
          <free-tip-icon
            v-if="element.popover && element.icon"
            style="margin-left: 2px"
            :element="{
              iconOptions: { size: 18, icon: element.icon },
              popoverOptions: { textDetail: element.popover, effect: 'dark', placement: 'top' },
            }"
          ></free-tip-icon>
          <el-icon v-else-if="element.icon" :size="16">
            <component :is="element.icon"></component>
          </el-icon>
          <span>{{ element.name }}</span>
        </li>
      </ul>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { COMPONENT_LIST } from '../data/componentsList';
import { cloneDeep } from 'lodash';
import emitter from '@/plugin/mitt';
const allComponents = computed(() => COMPONENT_LIST);
// const listTitle = computed(() => (lowcode.select?.component === 'page' ? '页面组件' : '表单组件'));
const listTitle = ref('Free');

const dragstart = (element, event: DragEvent) => {
  console.log('🚀 ~ file: left-comp-list.vue ~ line 45 ~ dragstart ~ event', event);
  // event.
  event.dataTransfer?.setData('element', JSON.stringify(element));
};
const drag = (element, event) => {
  event.dataTransfer?.setData('element', JSON.stringify(element));
  // console.log('🚀 ~ file: left-comp-list.vue ~ line 44 ~ drag ~ event', event);
  emitter.emit('add-component', cloneDeep(element));
};
const dragend = element => {
  emitter.emit('end-add-component', cloneDeep(element));
};
</script>
