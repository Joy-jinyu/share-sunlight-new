import type { CookieRef } from 'nuxt/app'
import { useCookie } from 'nuxt/app'

export function useNbCookie(keys: string | string[]) {
  const cookies = Array.isArray(keys) ? keys : [keys]
  const cookie = cookies.reduce((obj: Record<string, CookieRef<string | undefined>>, key) => {
    obj[key] = useCookie(key, {
      maxAge: 1000 * 60,
    })
    return obj
  }, {})

  const clearCookie = () => {
    cookies.forEach((key) => {
      cookie[key].value = undefined
    })
  }

  const cookieRaws = cookies.reduce((obj: Record<string, string | undefined>, key) => {
    obj[key] = unref(cookie[key])
    return obj
  }, {})

  return {
    cookie,
    rawCookie: cookieRaws,
    clearCookie,
  }
}
