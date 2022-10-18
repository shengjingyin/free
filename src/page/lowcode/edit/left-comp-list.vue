<template>
  <div class="components-list">
    <div class="widget-list-title">{{ listTitle }}</div>
    <template v-for="(component, i) in allComponents" :key="i">
      <h5 class="widget-cate"> {{ component.title }} </h5>
      <draggable
        v-model="component.list"
        item-key="type"
        tag="ul"
        v-bind="{
          group: { name: 'people', pull: 'clone', put: false },
          sort: false,
          ghostClass: 'ghost',
        }"
        :move="handleMove"
        @end="handleMoveEnd"
        @start="handleMoveStart"
      >
        <template #item="{ element }">
          <li :class="{ [`is-${element.type}`]: element.type }" class="widget-edit-label no-put">
            <a class="widget-pick-element">
              <el-icon v-if="element.icon" :size="16">
                <component :is="element.icon"></component>
              </el-icon>
              <span>{{ element.name }}</span>
            </a>
          </li>
        </template>
      </draggable>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import Draggable from 'vuedraggable';
import { BASE_LIST } from '../data/componentsList';
import { useStore } from '@/store/lowcode';
const lowcode = useStore();
console.log('store', lowcode);
const allComponents = computed(() => (lowcode.select?.type === 'form' ? [] : BASE_LIST));
const listTitle = computed(() => (lowcode.select?.type === 'form' ? '表单组件' : '页面组件'));

const isMove = ref(false);
// 正在移动
const handleMove = () => {
  isMove.value = true;
};
const handleMoveEnd = () => {
  isMove.value = false;
};
const handleMoveStart = () => {};
</script>
<style lang="less" scoped>
.a {
  color: #000;
}
</style>
