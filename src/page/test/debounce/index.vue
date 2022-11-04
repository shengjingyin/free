<template> <div @mousemove="_onmousemove"></div></template>
<script setup lang="ts">
const _onmousemove = debounce(listenMoveOn, 200, true);

function listenMoveOn() {
  // 监听的回调做一些事情
  console.log('arguments', arguments, this);
}
// /**
//  *
//  * @param {function} fn - 回调函数
//  * @param {number} delay - 等待时间
//  */
// function debounce(fn: Function, delay: number) {
//   let timer;
//   return function (this: unknown, ...args) {
//     // this -> 当前script作用域
//     if (timer) clearTimeout(timer);
//     timer = setTimeout(fn.bind(this, ...args), delay);
//   };
// }
// function debounce(fn, delay, immediate = false) {
//   /**
//    *
//    * @param timer - 定时器
//    * @param timestamp - 当前时间
//    * @param context - 保存上下文使用
//    * @param param - 保存事件参数使用
//    */
//   let timer, timestamp, context, param;

//   const later = function () {
//     let last = +new Date() - timestamp; // 距离上一次操作的时间间隔ms
//     if (last < delay && last >= 0) {
//       timer = setTimeout(later, delay); // 重置定时器
//     } else {
//       // 进入 else 说明设置的delay时间已经到了
//       timer = null; // 清除闭包中的保存的变量，并且如果有后续的话，可以让立即调用中的callNow更改为true，进行调用事件回调函数
//       if (!immediate) {
//         fn.apply(context, param); // 如果immediate = false需要调用一下事件处理函数；当immediate = true 时，因为立即调用过，所以在后面就不需要调用，在本段代码 倒数第五行 执行立即调用
//         context = param = null; // 清除闭包中的保存的变量
//       }
//     }
//   };

//   return function (this: unknown, ...args) {
//     context = this; // 保存变量到闭包内，方便后面调用时拿到值
//     param = args;
//     timestamp = +new Date();

//     let callNow = immediate && !timer; // 当 immediate 设置true，并且timer还没有被赋值时，说明刚进来，可进行立刻调用，下面一句话就会重新赋值timer
//     if (!timer) {
//       timer = setTimeout(later, delay); // 当第一次进入或者timer被清除后（表示已经调用过一次）才能再继续设置timer
//     }
//     if (callNow) {
//       fn.apply(context, args); // 立即执行的调用一直都是在这里,后面如果还有继续操作，也是在这里调用
//       context = param = null; // 清除闭包中的保存的变量
//     }
//   };
// }
function debounce(fn: Function, delay: number, immediate: boolean) {
  let context, params, timer, timestamp;

  // 执行后续时间判断，函数调用
  const later = () => {
    // 调用间隔时间, 因为timestamp是一直变化的，但是+new Date() 是调用setTimeout后才能获取到
    const last = +new Date() - timestamp;
    if (last < delay && last >= 0) {
      // 重置
      timer = setTimeout(later, delay);
    } else {
      // 到这里整个流程结束，如果不是立即调用的，则在这里执行
      timer = null;
      if (!immediate) {
        fn.apply(context, ...params);
        context = params = null;
      }
    }
  };

  return function (this: unknown, ...args) {
    context = this;
    params = args;
    timestamp = +new Date(); // 更新时间快照

    let callNow = immediate && !timer;
    if (!timer) timer = setTimeout(later, delay);
    if (callNow) {
      fn.apply(context, ...params);
      context = params = null;
    }
  };
}
</script>
<style scoped>
div {
  background-color: #666;
  height: 300px;
}
</style>
