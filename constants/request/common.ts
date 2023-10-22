import { MARKETING_GET_SIGNATURE, UC_CONFIG_FIND_BY_TYPE, UC_USER_CARD } from '../api'

/**
 * 获取项目基础配置
 */
export async function getConfig() {
  const { data } = await use$Fetch.get(UC_CONFIG_FIND_BY_TYPE)

  let { staff: channelInfo, enterprise: entInfo, user_grade: userGrade } = data || {}

  const parse = (input: string) => JSON.parse(input || '{}')
  channelInfo = parse(channelInfo)
  entInfo = parse(entInfo)
  userGrade = parse(userGrade)

  const wholeSituationParams = parse(
    entInfo.wholeSituationParams,
  )

  return {
    channelInfo,
    entInfo,
    wholeSituationParams,
    userGrade,
  }
}

/**
 * 通过url获取url的内容
 */
export async function getIframeContent(url: string) {
  const { description } = await use$Fetch.get(url)
  return {
    description,
    match: matchHtml(description),
  }
}

/**
 * 获取微信授权url
 */
export async function getWechatAuthUrl({
  scope,
  url,
}: {
  scope: string
  url: string
}) {
  const { param } = await use$Fetch.post(MARKETING_GET_SIGNATURE, {
    body: {
      url: encodeURIComponent(url),
    },
    isForm: true,
  })
  return `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${param.appId}&redirect_uri=${encodeURIComponent(url)}&response_type=code&scope=${scope}&state=STATE#wechat_redirect`
}

export async function getAdvisorInfo() {
  return await use$Fetch.get(UC_USER_CARD, {
    isCheckToken: false,
  })
}
