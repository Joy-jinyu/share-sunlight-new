import { createPinia } from 'pinia'
import { useGlobalStore } from '~/stores'

export default defineNuxtPlugin({
  name: 'nuxtServerInit',
  async setup() {
    // const pinia = createPinia()
    // const store = useGlobalStore(pinia)
    // store.initConfig()
  },
})
