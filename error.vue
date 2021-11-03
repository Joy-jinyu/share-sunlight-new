<script setup lang="ts">
const props = defineProps({
  error: Object,
})

const error = props.error

function handleError() {
  return clearError({ redirect: '/' })
}
</script>

<template>
  <div p-4 p-t-10 flex flex-col items-center h-full>
    <img w-xs src="/common/no-data@2x.png" alt="" @click="handleError">
    <p>
      <span text-gray font-bold>{{ error?.statusCode }}</span>
      <span text-gray:80 font-400 m-l>   {{ error?.message }}</span>
    </p>
  </div>
</template>
