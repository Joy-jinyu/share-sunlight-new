import qs from 'qs'
import type { NitroFetchRequest } from 'nitropack'

// https://github.com/unjs/ofetch
import type { FetchContext, FetchRequest, FetchResponse } from 'ofetch'
import type { UseFetchOptions } from 'nuxt/dist/app/composables/fetch'
import type { NuxtApp } from 'nuxt/app'

type FetchOptions = UseFetchOptions<any> & {
  // 请求是否校验token
  isCheckToken?: boolean
  isForm?: boolean
  headers?: any
}

type NbFetchContext<T = Record<string, any>> = FetchContext & {
  response: FetchResponse<T>
  options: FetchOptions
  app?: NuxtApp
}

type NbFetchReqContext = FetchContext & {
  request: FetchRequest
  options: FetchOptions & any
  app?: NuxtApp
}

type transFormRequestContext = Required<Pick<NbFetchContext, 'request' | 'app' | 'options'>>
type transFormResponseContext = Required<Pick<NbFetchContext, 'response' | 'app' | 'options'>>

function transFormResponse({ response, app, options }: transFormResponseContext) {
  const { $logger, runWithContext } = app
  const { url, _data } = response
  const code = _data?.code || response.status
  const msg = _data?.msg || _data?.error || response.statusText
  const { isCheckToken = true } = options
  $logger.info(`${url} - ${msg} - ${code} - axios onResponse`)

  if (code === 401 && isCheckToken)
    runWithContext(() => navigateTo('/'))
}

function transFormResponseError({ response, app, options }: transFormResponseContext) {
  const { $logger, runWithContext } = app
  const { url, _data } = response
  const code = _data?.code || response.status

  const { isCheckToken = true } = options

  const msg = _data?.msg || _data?.error || response.statusText
  $logger.info(`${url} - ${msg} - ${code} -  axios onResponseError`)

  if (code === 401) {
    if (isCheckToken)
      runWithContext(() => navigateTo('/'))
  }

  // 处理后端携带了错误码响应的数据
  return Promise.reject(new Error(code))
}

function transFormRequest({ options, app }: transFormRequestContext) {
  const { runWithContext } = app
  const { isForm } = options
  options.headers = options.headers || { }
  runWithContext(() => {
    const { cookie } = useNbCookie('token')
    options.headers.token = cookie.token.value

    if (isForm) {
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
      options.body = qs.stringify(options.body)
    }
  })
}

function transFormRequestError({ request, app }: transFormRequestContext) {
  const { $logger } = app
  $logger.info('axios onRequestError', request)
  // return navigateTo()
  return Promise.reject(new Error('服务器错误，请稍后再试 - request'))
}

/**
 * 抽离useFetch的通用配置
 * @param request
 * @param opts
 * @returns
 */
export function useNbFetch(request: NitroFetchRequest, opts?: FetchOptions) {
  const app = useNuxtApp()

  return useFetch(request, {
    onRequest: (context: NbFetchReqContext) => transFormRequest({
      ...context,
      app,
    }),
    onRequestError: (context: NbFetchReqContext) => transFormRequestError({
      ...context,
      app,
    }),
    onResponse: (context: NbFetchContext) => transFormResponse({
      ...context,
      app,
    }),
    onResponseError: (context: NbFetchContext) => transFormResponseError({
      ...context,
      app,
    }),
    ...opts,
  }).catch((err) => {
    const msg = err.message
    if (Number(msg) === 401)
      return Promise.resolve({ code: 401 } as any)

    return Promise.reject(new Error(msg))
  })
}

useNbFetch.get = (request: NitroFetchRequest, opts?: FetchOptions) => {
  const url = useRequestURL()
  const timeStemp = new Date().getTime()

  return useNbFetch(request, {
    baseURL: url.origin,
    method: 'get',
    ...opts,
    query: {
      ...opts?.query,
      timeStemp,
    },
  })
}

useNbFetch.post = (request: NitroFetchRequest, opts?: FetchOptions) => {
  const url = useRequestURL()
  return useNbFetch(request, {
    baseURL: url.origin,
    method: 'post',
    ...opts,
  })
}

/**
 * 封装$fetch用于客户端请求
 */
export function use$Fetch(
  request: NitroFetchRequest,
  opts?: any,
) {
  const app = useNuxtApp()

  return $fetch<{
    code: number
    data: Record<string, any>
    param: Record<string, any>
    msg: string
  }>(request,
    {
      onRequest: (context: NbFetchReqContext) => transFormRequest({
        ...context,
        app,
      }),
      onRequestError: (context: NbFetchReqContext) => transFormRequestError({
        ...context,
        app,
      }),
      onResponse: (context: NbFetchContext) => transFormResponse({
        ...context,
        app,
      }),
      onResponseError: (context: NbFetchContext) => transFormResponseError({
        ...context,
        app,
      }),
      ...opts,
    },
  )
    .catch((err) => {
      const msg = err.message
      if (Number(msg) === 401)
        return Promise.resolve({ code: 401 } as any)

      return Promise.reject(new Error(msg))
    })
}

use$Fetch.get = (request: NitroFetchRequest, opts?: FetchOptions) => {
  const url = useRequestURL()
  const timeStemp = new Date().getTime()

  return use$Fetch(request, {
    baseURL: url.origin,
    method: 'get',
    ...opts,
    query: {
      ...opts?.query,
      timeStemp,
    },
  })
}

use$Fetch.post = (request: NitroFetchRequest, opts?: FetchOptions) => {
  const url = useRequestURL()
  return use$Fetch(request, {
    baseURL: url.origin,
    method: 'post',
    ...opts,
  })
}
