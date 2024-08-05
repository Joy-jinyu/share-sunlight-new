import { useGlobalStore } from '~/stores'

export default defineNuxtPlugin({
  name: 'nuxtServerInit',
  async setup() {
    const store = useGlobalStore()
    store.initConfig()
  },
})
