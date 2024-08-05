<template>
  <main class="bg-[#f7f7f7] p4 min-h-full text-dark-100"
  :style="{
    '--primary-color': store.color
  }">
    <slot />
  </main>
</template>

<script setup lang="ts">
import { useGlobalStore } from '~/stores/index'

const store = useGlobalStore()
</script>