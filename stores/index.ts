import { defineStore } from 'pinia'
import { getConfig } from '~/constants'

export const useGlobalStore = defineStore('theme', () => {
  const config = ref<{
    channelInfo: undefined
    entInfo: {
      theme: string
    } | undefined
    wholeSituationParams: undefined
    userGrade: undefined
  }>({
    channelInfo: undefined,
    entInfo: undefined,
    wholeSituationParams: undefined,
    userGrade: undefined,
  })
  const initConfig = async () => {
    if (!config.value.channelInfo) {
      const data = await getConfig()
      config.value = data
    }
    return config.value
  }

  const color = computed(() => {
    return config.value.entInfo?.theme || 'red'
  })

  return { color, initConfig }
})
