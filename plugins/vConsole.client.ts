import VConsole from 'vconsole'

export default defineNuxtPlugin({
  name: 'my-VConsole',
  async setup() {
    const vConsole = new VConsole()
    vConsole.setOption('disableLogScrolling', true)
  },
})
