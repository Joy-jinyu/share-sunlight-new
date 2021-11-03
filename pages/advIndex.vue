<script setup lang="ts">
import { useNbRouter } from '~/composables/route'
import { useNbFetch } from '~/composables/http'
import { getConfig } from '~/constants'

const activeName = ref()
const { router } = useNbRouter()

const { data } = await useNbFetch('/api/menu')

function goPage(cell: {
  routeInfo: any
}) {
  router.push(cell.routeInfo)
}

if (!data.value?.length) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page Not Found',
    data: {
      myCustomField: true,
    },
  })
}

onMounted(async () => {
  await getConfig()
  await useNbClientAuthorize()
})
</script>

<template>
  <section class="basicInf-box">
    <van-collapse v-model="activeName" accordion>
      <van-collapse-item v-for="item of data" :key="item.id" :title="item.name" :name="item.id">
        <van-cell-group>
          <van-cell v-for="cell of item.items" :key="cell.id" :title="cell.name" is-link @click="goPage(cell)" />
        </van-cell-group>
      </van-collapse-item>
    </van-collapse>
  </section>
</template>

<style lang="scss" scoped>
</style>
