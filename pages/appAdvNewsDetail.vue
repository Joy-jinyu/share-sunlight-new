<script setup lang="ts">
import { getAdvisorInfo, getNewsDetail } from '~/constants'
import { getPreHandleSource } from '~/utils/common'
import { hideWxShare } from '~/utils/wx'

interface Detail {
  title: string
  author: string
  timePublished: string
  summary: string
}

const detail = ref<Detail>()
const advisorInfo = ref()
const richText = ref()

await useAsyncData('auth', () => useNbServerAuthorize())

const { data: detailData } = await useAsyncData('detail', () => getNewsDetail())

function getHeadInfo() {
  const { detail: _detail, richText: _richText } = unref<any>(detailData)
  const imgs: string[] = _richText?.match?.imgs

  return {
    title: _detail?.title || '资讯文章',
    link: getPreHandleSource({
      imgs: imgs.slice(0, 2),
    }),
  }
}

useHead({
  ...getHeadInfo(),
})

onMounted(async () => {
  hideWxShare()
  const { code: detailCode, detail: _detail, richText: _richText } = unref<any>(detailData)
  if (detailCode === 401)
    await useNbClientAuthorize()
  detail.value = _detail
  richText.value = _richText

  const { code: advisorInfoCode, data: _advisorInfo } = await getAdvisorInfo()
  if (advisorInfoCode === 0)
    advisorInfo.value = _advisorInfo
})
</script>

<template>
  <section flex flex-col min-h-screen>
    <div
      border-rounded-lg
      class="bg-gradient-linear bg-gradient-shape-[270deg] from-#e7ebff  to-#f5f9fc"
      flex-initial
    >
      <div p-4>
        <img
          class="border-rounded-50% v-mid" w-18 h-18 inline-block
          :src="advisorInfo?.avatar"
        >
        <div class="v-mid" inline-block ml-4>
          <p font-bold text-gray-8 font-size-lg>
            {{ advisorInfo?.name }}
          </p>
          <p mt-1 text-gray-5 font-size-xs>
            {{ advisorInfo?.companyName }}
          </p>
        </div>
      </div>
      <div mt-4 bg-blue-6:85 py-2 border-rounded-b-lg>
        <div class="w-50%" inline-block text-center text-white>
          <span
            class="v-middle"
            inline-block font-size-xs
          >电话</span>
          <i
            inline-block ml-1
            class="iconfont ali-icon-wode  v-middle"
          />
        </div>
        <div class="w-50%" inline-block text-center text-white>
          <span
            class="v-middle"
            inline-block font-size-xs
          >微信</span>
          <i
            inline-block ml-1
            class="iconfont ali-icon-yaoqing v-middle"
          />
        </div>
      </div>
    </div>
    <div mt-4 relative flex-1>
      <template v-if="richText?.description">
        <h1 font-bold text-dark-8 font-size-lg>
          {{ detail?.title }}
        </h1>
        <p mt-2 text-gray font-size-xs>
          <span>{{ detail?.author }}</span>
          <span>|</span>
          <span>{{ detail?.timePublished }}</span>
        </p>
        <p mt-2 text-gray font-size-sm>
          {{ detail?.summary }}
        </p>
        <div mt-4 v-html="richText?.description" />
      </template>
      <PageLoading v-else />
    </div>
  </section>
</template>

<style lang="scss" scoped>
</style>
