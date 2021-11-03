// 北京时间ISO
function getISOLocalDate() {
  const currentTime = new Date(+new Date() + 8 * 3600 * 1000)
  return currentTime.toISOString().replace(/(T|Z)/g, ' ')
}

  type Method = 'log' | 'error'

function getProxyLogger(log: Console) {
  const _logger = { ...log }
  const proxy = (methodName: Method) => {
    const method = _logger[methodName]
    _logger[methodName] = (...params: any) => method(`[ ${methodName} - ${getISOLocalDate()} ] -`, ...params)
  }

  ['info', 'error'].forEach(methodName => proxy(methodName as
 Method))
  return _logger
}

export const logger = getProxyLogger(console)
