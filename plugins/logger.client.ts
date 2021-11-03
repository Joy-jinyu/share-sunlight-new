export default defineNuxtPlugin(() => {
  return {
    provide: {
      logger: console,
    },
  }
})
