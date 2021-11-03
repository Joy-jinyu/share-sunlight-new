export default defineEventHandler((event) => {
  const res = event.node.res
  res.setHeader('Content-Security-Policy', 'frame-ancestors \'self\'')
  res.setHeader('x-frame-options', 'SAMEORIGIN')
})
