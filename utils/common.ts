export function objectToQueryString(obj: any) {
  return Object.keys(obj).map((key) => {
    return ''.concat(encodeURIComponent(key), '=').concat(encodeURIComponent(obj[key] || ''))
  }).join('&')
}
