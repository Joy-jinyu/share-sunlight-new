/*
* 判断是否是微信环境
* */
function getIsWxClient() {
  const ua = navigator.userAgent.toLowerCase()
  const isMatch = ua.match(/MicroMessenger|micromessenger/i)
  return !!isMatch
}

let setWxTimeOut: NodeJS.Timeout
/**
 * 隐藏微信分享
 */
export function hideWxShare(callback?: () => undefined) {
  clearTimeout(setWxTimeOut)
  const isWx = getIsWxClient()
  if (!isWx) {
    if (typeof callback === 'function')
      callback()

    return false
  }
  function onBridgeReady() {
    WeixinJSBridge.call('hideOptionMenu')
    if (typeof callback === 'function') {
      setWxTimeOut = setTimeout(() => {
        clearTimeout(setWxTimeOut)
        callback()
      }, 500)
    }
  }

  if (typeof WeixinJSBridge == 'undefined') {
    if (document.addEventListener) {
      document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false)
    }
    else if (document.attachEvent) {
      document.attachEvent('WeixinJSBridgeReady', onBridgeReady)
      document.attachEvent('onWeixinJSBridgeReady', onBridgeReady)
    }
  }
  else {
    onBridgeReady()
  }
}
