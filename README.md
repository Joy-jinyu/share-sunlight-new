* 判断代码的执行环境
`import.meta.env.SSR`、`useNuxtApp`钩子的`isHydrating`

+ 异常
异常展示： 创建~/error.vue文件
server端： showError
client端： createError

+ useAsyncData
handle的promise必须通过`Promise.all`来进行调用，否则必须通过`useNuxtApp`钩子的`runWithContext`来调用。

* useFetch
`useAsyncData` 和 `$fetch` 的组合

* unocss `v-` 和vue `v-`指令冲突报错
unocss `v-` 开头的写在 `class` 中

