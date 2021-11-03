import { pwa } from './config/pwa'
import { proxy } from './config/local'
import { appDescription } from './constants/index'

export default defineNuxtConfig({
  modules: [
    '@unocss/nuxt',
    // https://github.com/vant-ui/vant-nuxt#importstyle
    // https://github.com/lincenying/vite-vue3-h5/blob/main/src/App.vue
    '@vant/nuxt',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    '@vite-pwa/nuxt',
  ],
  pinia: {
    // is Autoimport ./stores/**
    // storeDirs: [],
  },
  vant: {
    lazyload: true,
    importStyle: true,
  },
  plugins: [
    // mode: client客户端 server服务端 不加就是默认两端都有
  ],
  experimental: {
    // when using generate, payload js assets included in sw precache manifest
    // but missing on offline, disabling extraction it until fixed
    payloadExtraction: false,
    inlineSSRStyles: false,
    renderJsonPayloads: true,
    typedPages: true,
  },
  alias: {
  },
  css: [
    '@/assets/iconfont/iconfont.css',
    // https://unocss.dev/guide/style-reset
    // https://tailwindcss.com/docs/customizing-colors
    '@unocss/reset/tailwind.css',
  ],

  colorMode: {
    classSuffix: '',
  },
  devServer: {
    port: Number(import.meta.env.NUXT_PORT),
  },
  // https://github.com/unjs/nitro
  nitro: {
    devProxy: proxy,
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
    prerender: {
      crawlLinks: false,
      routes: ['/'],
      ignore: ['/hi'],
    },
  },

  app: {
    baseURL: '/share/',
    head: {
      viewport: 'width=device-width,initial-scale=1',
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
        { rel: 'icon', type: 'image/svg+xml', href: '/nuxt.svg' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
        { rel: 'stylesheet', href: './assets/iconfont/iconfont.css' },
      ],
      script: [
        {
          src: './assets/iconfont/iconfont.js',
          type: 'text/javascript',
        },
      ],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: appDescription },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
      ],
    },
  },

  pwa,

  devtools: {
    enabled: true,
  },
})
