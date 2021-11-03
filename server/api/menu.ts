export default defineEventHandler(() => (
  [
    {
      name: '微信渠道端',
      id: 'advisor',
      items: [
        {
          name: '管理页',
          id: 'clearToken',
          routeInfo: {
            path: 'clearToken',
            query: {
              dev: 123456,
            },
          },
        },
      ],
    },
  ]
))
