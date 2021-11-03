// import { log4j } from '~/utils/log4j'

export default defineNuxtPlugin(() => {
  return {
    provide: {
      logger: console,
    },
  }
})
