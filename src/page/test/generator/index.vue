<template> </template>
<script setup lang="ts">
//
function asyncFunc<T>(v: T): Promise<T> {
  return new Promise((resolve, reject) => {
    resolve(v);
  });
}
const g = function* () {
  try {
    const foo = yield asyncFunc(12);
    const foo2 = yield asyncFunc('foo');
    console.log('🚀 ~ file: index.vue ~ line 18 ~ foo', foo);
  } catch (error) {
    console.log('🚀 ~ file: index.vue ~ line 20 ~ error', error);
  }
};
run(g);
// -----------核心---------

function run(generator: GeneratorFunction) {
  const it = generator();
  function go(result) {
    if (result.done) return result.value;

    return result.value.then(
      res => go(it.next(res)),
      error => go(it.throw(error))
    );
  }
  go(it.next());
}

// -----------核心---------

function fn(num) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(num * 3);
    }, 1000);
  });
}

function* gen() {
  const num1 = yield fn(1);
  console.log('🚀 ~ file: index.vue ~ line 49 ~ function*gen ~ num1', num1);
  const num2 = yield fn(num1);
  console.log('🚀 ~ file: index.vue ~ line 51 ~ function*gen ~ num2', num2);
  const num3 = yield fn(num2);
  console.log('🚀 ~ file: index.vue ~ line 53 ~ function*gen ~ num3', num3);
  return num3;
}

// const g2 = gen();

// const next1 = g2.next(); // yield fn(1);
// next1.value.then(res1 => {
//   console.log('res1', res1);

//   const next2 = g2.next(res1); // yield fn(num1); res1 赋值给 num1
//   next2.value.then(res2 => {
//     console.log('res2', res2);

//     const next3 = g2.next(res2); // yield fn(num2);  res2 赋值给 num2
//     next3.value.then(res3 => {
//       console.log('res3', res3);

//       const next4 = g2.next(res3); // 最后一次，res3 赋值给 num3
//       console.log('next4', next4);
//     });
//   });
// });

run(gen);
</script>
