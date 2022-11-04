<template>
  <div> 测试文本 </div>
</template>

<script lang="ts" setup>
import { download } from '@/shared/download/index';
import { ref } from 'vue';
for (let i = 0; i < 143; i++) {
  let index: string | number = i + 1;
  let len = 5 - String(index).length;
  while (len > 0) {
    --len;
    index = `0${index}`;
  }
  const url = `https://bucket.zhiyun-tech.com/detail/wbl3/wbl3-detail-animation-1/wbl3-detail-animation-${index}.jpg`;
  // download(url);
}
</script>
<style lang="less" scoped></style>
