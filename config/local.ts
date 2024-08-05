// const baseUrl = 'https://fuguo-dev-admin.newtamp.cn' // 富国开发环境
// const baseUrl = 'https://xindaaoya-dev-admin.newtamp.cn' // 
const baseUrl = 'http://localhost:14047'

const serviceList = [
  'v1',
  'mns',
  'marketing-product',
  'marketing-fund',
  'marketing-api',
  'marketing-course',
  'shorter',
  'newHttp',
  'http',
  'file-system',
  'uc-system',
  'aip_data',
]

const ProxyObject: Record<string, any> = {}

serviceList.forEach((service) => {
  ProxyObject[`/${service}`] = {
    target: `${baseUrl}/${service}`,
    changeOrigin: true,
    secure: false,
    pathRewrite: {
      [`^/${service}`]: '',
    },
  }
})

export const proxy = {
  ...ProxyObject,
}
