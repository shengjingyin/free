<template>
  <div>
    <grid-layout
      v-model:layout="layout"
      :col-num="12"
      :row-height="35"
      :is-draggable="true"
      :is-resizable="true"
      :is-mirrored="false"
      :vertical-compact="true"
      :margin="[10, 10]"
      :use-css-transforms="true"
    >
      <grid-item
        style="background: skyblue"
        v-for="item in layout"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i"
        :key="item.i"
        @resize="resizeEvent"
        @move="moveEvent"
        @resized="resizedEvent"
        @container-resized="containerResizedEvent"
        @moved="movedEvent"
      >
        <!-- 组件的位置 -->
        {{ item.i }}
      </grid-item>
    </grid-layout>
  </div>
</template>

<script lang="ts" setup>
// 栅格的初始布局。
// 官网地址：https://jbaysolutions.github.io/vue-grid-layout/zh/guide/properties.html#gridlayout
/* left 和 transform3d 有什么性能区别？ */
const layout = [
  // 第一行
  // 坐标轴：x,y ；尺寸：w。h； i：id
  { x: 0, y: 0, w: 2, h: 1, i: '0' },
  { x: 2, y: 0, w: 2, h: 4, i: '1' },
  { x: 4, y: 0, w: 2, h: 5, i: '2' },
  { x: 6, y: 0, w: 2, h: 3, i: '3' },
  { x: 8, y: 0, w: 2, h: 3, i: '4' },
  { x: 10, y: 0, w: 2, h: 3, i: '5' },
  // 第二行
  { x: 0, y: 5, w: 2, h: 5, i: '6' },
  { x: 2, y: 5, w: 2, h: 5, i: '7' },
  { x: 4, y: 5, w: 2, h: 5, i: '8' },
  { x: 6, y: 3, w: 2, h: 4, i: '9' },
  { x: 8, y: 4, w: 2, h: 4, i: '10' },
  { x: 10, y: 4, w: 2, h: 4, i: '11' },
  // 第三行
  { x: 0, y: 10, w: 2, h: 5, i: '12' },
  { x: 2, y: 10, w: 2, h: 5, i: '13' },
  { x: 4, y: 8, w: 2, h: 4, i: '14' },
  { x: 6, y: 8, w: 2, h: 4, i: '15' },
  { x: 8, y: 10, w: 2, h: 5, i: '16' },
  { x: 10, y: 4, w: 2, h: 2, i: '17' },
  // 第四行
  { x: 0, y: 9, w: 2, h: 5, i: '18' },
  { x: 2, y: 6, w: 2, h: 2, i: '19' },
];

const moveEvent = function (i, newX, newY) {
  console.log('MOVE i=' + i + ', X=' + newX + ', Y=' + newY);
};
const resizeEvent = function (i, newH, newW, newHPx, newWPx) {
  console.log(
    'RESIZE i=' + i + ', H=' + newH + ', W=' + newW + ', H(px)=' + newHPx + ', W(px)=' + newWPx
  );
};
const movedEvent = function (i, newX, newY) {
  console.log('MOVED i=' + i + ', X=' + newX + ', Y=' + newY);
};
const resizedEvent = function (i, newH, newW, newHPx, newWPx) {
  console.log(
    'RESIZED i=' + i + ', H=' + newH + ', W=' + newW + ', H(px)=' + newHPx + ', W(px)=' + newWPx
  );
};
const containerResizedEvent = function (i, newH, newW, newHPx, newWPx) {
  console.log(
    'CONTAINER RESIZED i=' +
      i +
      ', H=' +
      newH +
      ', W=' +
      newW +
      ', H(px)=' +
      newHPx +
      ', W(px)=' +
      newWPx
  );
};
</script>
<style lang="less" scoped></style>
