<template>
  <div>
    {{ origin }}
  </div>
  <br />
  <div> {{ newData }} --- {{ newData.a1 === newData.a2 }} </div>
</template>
<script setup lang="ts">
import { createData } from '@/write/tool/createData/index';
import { cloneDeep2 } from '@/write/tool/clone/index';
console.log('🚀 ~ file: index.vue ~ line 11 ~ cloneDeep2', cloneDeep2);
var b = 1;
var origin = { a1: b, a2: b };
const newData = cloneDeep2(origin);
</script>
