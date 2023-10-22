export function objectToQueryString(obj: any) {
  return Object.keys(obj).map((key) => {
    return ''.concat(encodeURIComponent(key), '=').concat(encodeURIComponent(obj[key] || ''))
  }).join('&')
}

export function matchHtml(html: string) {
  // script: /<script.*?>([\s\S]*?)<\/script>/gim
  // link: /<link.*?\\?>/gim
  // to match:  /\bsrc=('|")(.+?)\1/g
  const imgs = html.match(/(\/|http)[^(>|=)]+\.(jpg|jpeg|png|gif)/g) || []

  return {
    imgs,
  }
}

/**
 * 获得预取的link
 */
export function getPreHandleSource({
  imgs = [],
  rel = 'preload',
  as = 'image',
}: {
  imgs?: string[]
  rel?: 'preload' | 'prefetch'
  as?: 'image'
}): Array<{
  rel: string
  href: string
  as: 'image'
}> {
  return imgs.map(href => ({
    rel,
    href,
    as,
  }))
}
