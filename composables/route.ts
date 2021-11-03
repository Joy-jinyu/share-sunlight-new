/**
 * 路由相关功能逻辑
 */
export function useNbRouter() {
  const router = useRouter()
  const { currentRoute } = router
  const { query, params } = unref(currentRoute)

  return {
    router,
    query,
    params,
    currentRoute,
  }
}
