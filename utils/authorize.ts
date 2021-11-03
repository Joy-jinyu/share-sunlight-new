import { getWechatAuthUrl } from '~/constants'
import { cookieKeys } from '~/constants/common'

/**
 * 用于页面进行权限静默刷新的处理
 */

export async function useNbClientAuthorize() {
  const { query, router } = useNbRouter()
  const { cookie, rawCookie, clearCookie } = useNbCookie(['openid', 'openToken', 'unionid', 'wechatInfoId', 'token'])
  const { code } = query

  const { openid, openToken, unionid, wechatInfoId } = rawCookie

  const getAuthorize = async () => {
    clearCookie()

    const authUrl = await getWechatAuthUrl({
      scope: 'snsapi_userinfo',
      url: window.location.href.split('#')[0],
    })
    navigateTo(authUrl, {
      external: true,
    })
  }

  const handleRefreshToken = async () => {
    cookie.token.value = undefined
    const { code, data, msg } = await use$Fetch.post('/uc-system/mobile/api/v1/org/staff/checkLogin', {
      body: {
        openid,
        openToken,
        unionid,
        wechatInfoId,
      },
    })

    if (code === 0) {
      const { token, expire } = data || {}
      const day = Math.floor(expire / 24 / 60 / 60) - 1

      if (!token || day < 0) {
        return {
          code: 500,
          msg: 'token或时间数据错误',
        }
      }

      cookie.token.value = token

      return {
        code: 0,
        msg: 'success!but need refresh user data',
      }
    }
    else if (code === 30003) { // 待审核
      router.push({
        path: '/advRegister',
        query: {
          result: 30003,
        },
      })
    }
    else if (code === 30000) { // 未绑定账号
      router.push({
        path: '/advLogin',
      })
    }
    else if (code === 30049) { // openToken不符或过期
      getAuthorize()
    }
    else { // 报错
      return {
        code: 500,
        msg: msg || '服务器异常',
      }
    }
    return {
      code: 302,
      msg: 'redirect',
    }
  }

  if (openid && openToken) {
    return await handleRefreshToken()
  }
  else if (code) {
    const getUserRights = async () => {
      const { code: rightCode, param } = await use$Fetch.get('/marketing-api/api/v1/h5/wechat/default', {
        query: {
          code,
        },
      })

      if (rightCode === 0) {
        const { openid, openToken, unionid, id } = param || {}

        cookie.openid.value = openid
        cookie.openToken.value = openToken
        cookie.unionid.value = unionid
        cookie.id.value = id

        if (!openid || !openToken || !unionid || !id) {
          /**
           * 静默授权拿不到用户信息，此处触发useinfo授权
           */
          await getAuthorize()

          return {
            code: 0,
          }
        }
      }
      return await handleRefreshToken()
    }
    return await getUserRights()
  }
  else {
    getAuthorize()
  }
}

export async function useNbServerAuthorize() {
  const { runWithContext } = useNuxtApp()
  const { cookie, rawCookie } = useNbCookie(cookieKeys)
  const url = useRequestURL()
  const { currentRoute, query } = useNbRouter()
  const { code } = query
  const { openid, openToken } = rawCookie

  if (import.meta.env.SSR) {
    const hostname = url.hostname || url.host
    const redirectUrl = `https://${hostname}/share/${currentRoute.value.name}?${objectToQueryString(query)}`
    /**
     * openid 服务端自动登录，获取新token
     * openToken
     * code 获取用户的token
     */
    if ((!openid || !openToken) && !code) {
      cookie.token.value = undefined
      const authUrl = await getWechatAuthUrl({
        scope: 'snsapi_base',
        url: redirectUrl,
      })

      runWithContext(() => {
        navigateTo(authUrl, {
          external: true,
        })
      })
    }
  }
}
