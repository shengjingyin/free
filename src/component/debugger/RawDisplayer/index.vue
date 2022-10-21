<template>
  <!-- 做json展示，调试用的 -->
  <textarea ref="codeEditor" class="code-editor" :placeholder="placeholder"></textarea>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref, toRefs, watch, computed } from 'vue';
// codemirror基础资源引入
import CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript.js';

// 折叠资源引入:开始
import 'codemirror/addon/fold/foldgutter.css';
import 'codemirror/addon/fold/foldcode.js';
import 'codemirror/addon/fold/brace-fold.js';
import 'codemirror/addon/fold/comment-fold.js';
import 'codemirror/addon/fold/indent-fold.js';
import 'codemirror/addon/fold/foldgutter.js';
// 折叠资源引入:结束

// 搜索资源引入:开始
import 'codemirror/addon/scroll/annotatescrollbar.js';
import 'codemirror/addon/search/matchesonscrollbar.js';
import 'codemirror/addon/search/match-highlighter.js';
import 'codemirror/addon/search/jump-to-line.js';

import 'codemirror/addon/dialog/dialog.js';
import 'codemirror/addon/dialog/dialog.css';
import 'codemirror/addon/search/searchcursor.js';
import 'codemirror/addon/search/search.js';
// 搜索资源引入:结束

// 启用placeholder
import 'codemirror/addon/display/placeholder.js';

import 'codemirror/addon/selection/active-line.js'; //光标行背景高亮，配置里面也需要styleActiveLine设置为true

const props = defineProps({
  // 表单值
  modelValue: String,
  // 默认值
  defaultValue: String,
  // 只读
  readOnly: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['update:modelValue']);

const { modelValue, defaultValue, readOnly } = toRefs(props);
const placeholder = computed(() => (props.readOnly ? '' : '请输入...'));

const codeEditor = ref();
let editor: any;
if (modelValue) {
  watch(modelValue, () => {
    if (null != editor && modelValue.value && modelValue.value !== editor.getValue()) {
      // 触发v-model的双向绑定
      editor.setValue(modelValue.value);
    }
  });
}
watch(readOnly, () => {
  if (null != editor) {
    editor.setOption('readOnly', readOnly.value);
  }
});
onMounted(() => {
  editor = CodeMirror.fromTextArea(codeEditor.value, {
    value: modelValue?.value,
    indentWithTabs: false, // 在缩进时，是否需要把 n*tab宽度个空格替换成n个tab字符，默认为false
    smartIndent: true, // 自动缩进，设置是否根据上下文自动缩进（和上一行相同的缩进量）。默认为true
    lineNumbers: true, // 是否在编辑器左侧显示行号
    // mime: "text/javascript",
    // matchBrackets: true, // 括号匹配
    readOnly: readOnly.value,
    // 启用代码折叠相关功能:开始
    foldGutter: true,
    lineWrapping: true,
    gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter', 'CodeMirror-lint-markers'],
    // 启用代码折叠相关功能:结束
    styleActiveLine: true, // 光标行高亮
  });
  // 监听编辑器的change事件
  editor.on('change', () => {
    // 触发v-model的双向绑定
    emit('update:modelValue', editor.getValue());
  });
  if (defaultValue?.value) {
    editor.setValue(defaultValue.value);
  }
});
onBeforeUnmount(() => {
  if (null !== editor) {
    editor.toTextArea();
    editor = null;
  }
});
</script>

<style scoped lang="less">
.code-editor {
  width: 100%;
  height: 100%;
}
</style>
<style>
.CodeMirror {
  height: 100% !important;
}
</style>
