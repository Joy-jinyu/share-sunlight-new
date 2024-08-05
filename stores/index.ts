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
    console.log(config.value.entInfo?.theme, 'good prev')
    if (!config.value.channelInfo) {
      const data = await getConfig()
      config.value = data
      console.log(config.value.entInfo?.theme, 'good idea')
    }
  }

  const color = computed(() => {
    console.log(config.value)
    return config.value.entInfo?.theme || 'red'
  })

  return { color, initConfig }
})
