import antfu from '@antfu/eslint-config'
import unocss from '@unocss/eslint-plugin'

export default antfu(
  {
  },
  Object.assign(unocss.configs.flat, {
    rules: {
      'no-console': 'off',
    },
  }),
)
