import { useThemeStore } from '~/stores/index'

export default defineNuxtPlugin({
  name: 'nuxtServerInit',
  async setup() {
    const store = useThemeStore()
    store.initColor()
  },
})
