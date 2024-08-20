<script setup lang="ts">
import { useNbCookie } from '~/composables/cookie'
import { useNbRouter } from '~/composables/route'
import { cookieKeys } from '~/constants/common'
import { useBaseStore } from '~/stores/base'
import { Login, getConfig } from '~/constants'
import { useGlobalStore } from '~/stores/index'

const store = useGlobalStore()
await useAsyncData('layout_default', () => store.initConfig())
// await useAsyncData('layout_default', getConfig)

const { router, query } = useNbRouter()
const { cookie, clearCookie } = useNbCookie(cookieKeys)
const baseStore = useBaseStore()

const data = reactive({
  href: '',
  page: '',
  key: '',
  value: '',
})

function clearLogin() {
  clearCookie()
}

function clearAuth() {
  clearCookie()
}

async function set() {
  const { key, value } = toRaw(data)
  if (key && value) {
    cookie[key].value = value
    baseStore.addCookie({ key, value })
    return
  }
  const { accessToken, user } = await Login({
    email: 'joy.wyj@gmail.com',
    password: '0',
  })
  cookie.token.value = accessToken
  cookie.unionid.value = 'o0R6H5oGwAVkHgkA3KBazr89OedU'
  cookie.openid.value = 'okjN06KYunkJHzjAan7GFQtQyx6U'
  sessionStorage.setItem('user', user)
}

function goLink() {
  const { href, page, value } = toRaw(data)
  if (href) {
    router.push(href)
  }
  else if (page) {
    router.push({
      name: page as any,
      params: value,
    })
  }
}
</script>

<template>
  <section class="basicInf-box">
    <div class="costumer-btn">
      清除登录 {{ store.color }}
    </div>
    <!-- <van-button
      class="costumer-btn"
      block
      @click="clearLogin"
    >
      清除登录
    </van-button>
    <template
      v-if="query.dev"
    >
      <van-button
        class="costumer-btn"
        block
        @click="clearAuth"
      >
        清除授权
      </van-button>
      <van-button
        class="costumer-btn"
        block
        @click="set"
      >
        设置cookie
      </van-button>
      <van-field
        v-model="data.href"
        placeholder="链接" :clearable="true"
      />
      <van-field v-model="data.page" placeholder="页面" :clearable="true" />
      <van-field v-model="data.key" placeholder="属性" :clearable="true" />
      <van-field v-model="data.value" placeholder="值" :clearable="true" />
      <van-button
        class="costumer-btn"
        block
        @click="goLink"
      >
        跳转链接
      </van-button>
    </template> -->
  </section>
</template>

<style lang="scss" scoped>
.costumer-btn {
  @apply btn mt-1 rounded-sm last-of-type:mt-4;
  background-color: rgba(220,38,38,var(--un-bg-opacity)) !important;
}

:deep(.van-cell)  {
  @apply mt-1 border-1 rounded-sm py-1;

  input {
    @apply block w-100% pl-2;
  }
}
</style>
