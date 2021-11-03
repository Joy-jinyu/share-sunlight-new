import { MARKETING_NEWS_DETAIL, MARKETING_NEWS_DETAIL_UN_AUTH } from '../api'
import { getIframeContent } from './common'

/**
 * 获取资讯内容
 */
export async function getNewsDetail() {
  const { runWithContext } = useNuxtApp()
  const { query } = useRoute()
  const { value: articleId } = query

  try {
    let status: number, unAuthDetail: any, richText
    const { code, param: detail } = await use$Fetch.get(MARKETING_NEWS_DETAIL, {
      query: {
        articleId,
      },
      isCheckToken: false,
    })
    status = code

    if (code === 401) {
      await runWithContext(async () => {
        const { code: authDetailCode, param } = await use$Fetch.get(MARKETING_NEWS_DETAIL_UN_AUTH, {
          query: {
            articleId,
          },
          isCheckToken: false,
        })
        if (authDetailCode === 0)
          unAuthDetail = param

        else
          status = 500
      })
    }

    await runWithContext(async () => {
      if ([0, 401].includes(status))
        richText = await getIframeContent(detail?.url || unAuthDetail?.url)

      else
        throw new Error('服务器异常--')
    })

    return {
      code,
      detail,
      unAuthDetail,
      richText,
    }
  }
  catch (e) {
    runWithContext(() => {
      if (e instanceof Error) {
        throw showError({
          statusCode: 500,
          message: e.message,
          data: {
            myCustomField: true,
          },
        })
      }
    })
  }
}
