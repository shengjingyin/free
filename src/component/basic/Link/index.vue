<template>
  <div class="flex-center">
    <a
      :class="[options.href ? 'has-url' : 'no-url', 'link', 'ellipsis']"
      :title="options.href"
      :href="options.href"
      :target="options.target"
      @click.stop="click"
    >
      <slot>{{ options.textDetail ? options.textDetail : '文字链接' }}</slot>
    </a>
    <!-- <slot name="icon" :href="href" v-if="slots.icon && textDetail">
      <Download :title="textDetail" :url="href" />
    </slot> -->
  </div>
</template>

<script lang="ts" setup>
import { watch, computed } from 'vue';
import emitter from '@/plugin/mitt';
// import Download from '@/components/Icon/download.vue';
// const slots = useSlots();
const props = defineProps({
  element: {
    type: Object,
    required: true,
  },
});
const options = computed(() => props.element.options);
// 按钮中触发时机只有点击、双击、等待
watch(
  () => props.element.model,
  model => {
    if (model) {
      emitter.on(model + 'disabled', () => {
        // disabled.value = true;
      });
    }
  },
  { immediate: true }
);
const click = e => {
  if (!options.value.href) {
    e.stopPropagation();
    e.preventDefault();
    return false;
  }
};
</script>
<style lang="less" scoped>
a.link {
  display: block;
  width: 100%;
}

.has-url {
  cursor: pointer;
  color: #2d8cf0;
}
.no-url {
  cursor: default;
  color: rgb(51, 54, 57);
}
</style>
