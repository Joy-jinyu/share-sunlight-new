import { useThemeStore } from '~/stores'

export default defineNuxtPlugin({
  name: 'nuxtServerInit',
  async setup() {
    const store = useThemeStore()
    store.initColor()
  },
})
