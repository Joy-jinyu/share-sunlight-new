import { defineStore } from 'pinia'

// export const useThemeStore = defineStore('theme', {
//   state: () => ({
//     color: '',
//   }),
//   getters: {
//     color: state => state.color,
//   },
//   actions: {
//     initColor() {
//       this.color = 'red'
//     },
//   },
// })

export const useThemeStore = defineStore('theme', () => {
  const color = ref('')
  const initColor = () => {
    color.value = 'red'
  }

  return { color, initColor }
})
