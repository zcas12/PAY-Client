import bodyParser from "body-parser"
export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'KCP-Pay-Client',
    htmlAttrs: {
      lang: 'ko'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon_kcp.ico' }
    ],
    script: [
      /*{ type: 'text/javascript', src: 'http://10.0.0.106:8080/brpay.js' }*/
      { type: 'text/javascript', src: 'https://testspay.kcp.co.kr/plugin/kcp_spay_hub.js' }
    ]
  },
  loading:false,
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'element-ui/lib/theme-chalk/index.css',
    '~/assets/default.scss'
  ],

  serverMiddleware:[
    bodyParser.urlencoded({extended:true}),

  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/element-ui',
    { src: "@/plugins/lodash" },
    { src: "@/plugins/dayjs" }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: {
    dirs: ["~/components", "~/components/pages"],
  },


  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    "@nuxtjs/axios"
  ],
  axios: {
    proxy: true,
    credentials: true
  },
  proxy: {
    "/gw": {
      target: "https://stg-spl.kcp.co.kr",
      changeOrigin: true // cross origin 허용
    }
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/]
  }
}
