const baseUrl = 'https://fuguo-dev-admin.newtamp.cn' // 富国开发环境

export const proxy = {
  '/oye': {
    target: `${baseUrl}/oye`,
    changeOrigin: true,
  },
  '/stat': {
    target: `${baseUrl}/stat`,
    changeOrigin: true,
  },
  '/mns': {
    target: `${baseUrl}/mns`,
    changeOrigin: true,
  },
  '/marketing-product': {
    target: `${baseUrl}/marketing-product`,
    changeOrigin: true,
  },
  '/marketing-fund': {
    target: `${baseUrl}/marketing-fund`,
    changeOrigin: true,
  },
  '/marketing-api': {
    target: `${baseUrl}/marketing-api`,
    changeOrigin: true,
  },
  '/marketing-course': {
    target: `${baseUrl}/marketing-course`,
    changeOrigin: true,
  },
  '/engine/api': {
    target: 'https://fac.newbanker.cn/data',
    changeOrigin: true,
  },
  '/dataEngine': {
    target: 'https://data-engine.newbanker.cn',
    changeOrigin: true,
  },
  '/newHttp/fs': {
    target: 'https://admin-test321.newtamp.cn/fs',
    changeOrigin: true,
  },
  '/newHttp': {
    target: `${baseUrl}/newHttp`,
    changeOrigin: true,
  },
  '/http': {
    target: `${baseUrl}/http`,
    changeOrigin: true,
  },
  '/shorter': {
    target: `${baseUrl}/shorter`,
    changeOrigin: true,
  },
  '/file-system': {
    target: `${baseUrl}/file-system`,
    changeOrigin: true,
  },
  '/uc-system': {
    target: `${baseUrl}/uc-system`,
    changeOrigin: true,
  },
  '/tools': {
    target: `${baseUrl}/tools`,
    changeOrigin: true,
  },
  '/marketing-points': {
    target: `${baseUrl}/marketing-points`,
    changeOrigin: true,
  },
}
