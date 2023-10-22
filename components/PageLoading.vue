<script lang="ts" setup>
</script>

<template>
  <div
    absolute inset-x-0 inset-y-0
    flex justify-center items-center flex-col
  >
    <img src="/common/loading.gif" alt="正在努力加载">
    <p
      mt-2 text-gray-7 font-size-sm
      class="after:content-['*'] after:ml-1 after:animate-ping"
    >
      正在努力加载
    </p>
  </div>
</template>

<style lang="scss" scoped>
</style>
