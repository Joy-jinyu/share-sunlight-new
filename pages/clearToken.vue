<script setup lang="ts">
import { useNbCookie } from '~/composables/cookie'
import { useNbRouter } from '~/composables/route'
import { cookieKeys } from '~/constants/common'

const { router, query } = useNbRouter()
const { cookie, clearCookie } = useNbCookie(cookieKeys)

const data = reactive({
  href: '',
  page: '',
  params: '',
})

function clearLogin() {
  clearCookie()
}

function clearAuth() {
  clearCookie()
}

function set() {
  cookie.token.value = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjbGllbnQiOiIxMzEiLCJ0b2tlbl90eXBlIjoidG9rZW4iLCJ1c2VyTmFtZSI6IueOi-iJuumUpiIsInVzZXJJZCI6IjM0NjkzNTgxNTEyNzY5NTgiLCJ1c2VyIjoiMzAwIiwiYWNjb3VudCI6IjM0NjkzNTgxNTEyNzY5NTkiLCJpYXQiOjE2OTc4NjI0OTcsIm5iZiI6MTY5Nzg2MjQ5NywiZXhwIjoxNjk4NDY3Mjk3fQ.GM25m699e-_86slCigTuMidOk5G89CPzULc861mhOAg'
  cookie.wechatInfoId.value = '2c908424857b541501857fb05970003a'
  cookie.unionid.value = 'o0R6H5oGwAVkHgkA3KBazr89OedU'
  cookie.openid.value = 'okjN06KYunkJHzjAan7GFQtQyx6U'
  cookie.openToken.value = '0dd87aca-724d-43e0-82d7-9147a0c8f5a0'
}

function goLink() {
  const { href, page, params } = toRaw(data)
  if (href) {
    router.push(href)
  }
  else if (page) {
    router.push({
      name: page as any,
      params,
    })
  }
}
</script>

<template>
  <section class="basicInf-box">
    <van-button
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
      <van-field v-model="data.params" placeholder="参数" :clearable="true" />
      <van-button
        class="costumer-btn"
        block
        @click="goLink"
      >
        跳转链接
      </van-button>
    </template>
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
