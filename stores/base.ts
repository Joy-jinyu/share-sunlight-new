import { STORE } from '~/constants'

interface Cookie {
  key: string
  value: string
}

export const useBaseStore = defineStore(STORE.BASE, () => {
  const cookies = ref<Cookie[]>([])

  const addCookie = (cookie: Cookie) => {
    cookies.value.push(cookie)
  }
  return {
    cookies,
    addCookie,
  }
})
