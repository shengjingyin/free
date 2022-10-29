<template>
  <div class="components-list">
    <div class="widget-list-title">{{ listTitle }}</div>
    <template v-for="(component, i) in allComponents" :key="i">
      <h5 class="widget-cate"> {{ component.title }} </h5>
      <ul>
        <li
          v-for="element of component.list"
          :key="element.type"
          :class="{ [`is-${element.component}`]: element.component }"
          class="widget-edit-label no-put"
          @drag="drag(element)"
          @dragend="dragend(element)"
          draggable="true"
          unselectable="on"
        >
          <a class="widget-pick-element">
            <el-icon v-if="element.icon" :size="16">
              <component :is="element.icon"></component>
            </el-icon>
            <span>{{ element.name }}</span>
          </a>
        </li>
      </ul>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { COMPONENT_LIST } from '../data/componentsList';
import { useLowcodeStore } from '@/store/lowcode';
import { cloneDeep } from 'lodash';
import emitter from '@/plugin/mitt';
const lowcode = useLowcodeStore();
console.log('store', lowcode);
const allComponents = computed(() => COMPONENT_LIST);
const listTitle = computed(() => (lowcode.select?.component === 'page' ? '页面组件' : '表单组件'));

const drag = element => {
  emitter.emit('add-component', cloneDeep(element));
};
const dragend = element => {
  emitter.emit('end-add-component', cloneDeep(element));
};
</script>
<style lang="less" scoped>
.a {
  color: #000;
}
</style>
