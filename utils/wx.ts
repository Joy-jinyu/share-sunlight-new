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

// 设置微信分享
export function setWxShare({
  appInfo,
  shareInfo,
  onError = () => undefined,
  onSuccess = () => undefined,
  onComplete = () => undefined,
}: any) {
  wx.config({
    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: appInfo.appId, // 必填，公众号的唯一标识
    timestamp: appInfo.timestamp, // 必填，生成签名的时间戳
    nonceStr: appInfo.nonce, // 必填，生成签名的随机串
    signature: appInfo.signature, // 必填，签名，见附录1
    jsApiList: [
      'updateAppMessageShareData',
      'updateTimelineShareData',
      'onMenuShareAppMessage',
      'onMenuShareTimeline',
      'onMenuShareQQ',
    ], // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
  })
  wx.ready(() => {
    wx.showOptionMenu()
    const { title, desc, link, imgUrl } = shareInfo
    // 分享给朋友及分享到QQ
    wx.updateAppMessageShareData({
      title, // 分享标题
      desc, // 分享描述
      link, // 分享链接
      imgUrl, // 分享图标
      type: '', // 分享类型,music、video或link，不填默认为link
      dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
      complete: onComplete,
      success: onSuccess,
    })
    // 分享到朋友圈及分享到QQ空间
    wx.updateTimelineShareData({
      title, // 分享标题  self.actTitle
      link, // 分享链接
      imgUrl, // 分享图标  self.pictureUrl
      success: onSuccess,
    })
  })
  wx.error(onError)
}
