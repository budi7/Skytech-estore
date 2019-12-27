
export default {
  mode: 'universal',
  layoutTransition: 'layout',
  pageTransition: 'page',
  /*
  ** Headers of the page
  */
  head: {
    title: 'SKYTECH',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
      { name: 'Content-Security-Policy', content: 'upgrade-insecure-requests' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '@/assets/scss/app.scss'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/carousel', ssr: false },
    { src: '~/plugins/barcode', ssr: false },
    { src: '~/plugins/numberFormat', ssr: true },
    { src: '~/plugins/dateFormat', ssr: true },
    { src: '~/plugins/stringFormat', ssr: true },
    { src: '~/plugins/indonesia', ssr: false },
    { src: '~/plugins/imageLoader', ssr: false }
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://bootstrap-vue.js.org/docs/
    'bootstrap-vue/nuxt',
    '@nuxtjs/eslint-module',
    // ['@nuxtjs/proxy', { pathRewrite: { '^/graphql' : '/graphql/v1' } }],
    '@nuxtjs/apollo',
    '@nuxtjs/toast'
  ],
  /*
  ** Apollo
  */
  apollo: {
    // required
    includeNodeModules: true,
    clientConfigs: {
      default: {
        httpEndpoint: 'https://enginev1.skytech.id/graphql'
        // httpEndpoint: 'http://128.199.145.173:7888/graphql'
        // httpLinkOptions: {
        //   headers: {
        //     // 'authorization': process.browser ? JSON.parse(window.localStorage.user).token : null
        //     'authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOm51bGwsImF1ZCI6bnVsbCwiaWF0IjoxNTYyOTEyMjE4LCJleHAiOjE1NjU1MDQyMTgsIm5hbWUiOiJCdWRpIFB1cm5vbW8iLCJ1c2VybmFtZSI6IjA4MTIzNDU2Nzg5MCJ9.cF88BUwNzY8eqzcnuQ-Ej-pGmFYCPp6Q6AkZFkjy60Q'
        //   }
        // }
      },
      // me: {
      //   httpEndpoint: 'http://localhost:8000/graphql/me'
      // },
      indonesia: {
        httpEndpoint: 'https://indonesia.thunderlab.id/graphql'
      }
    }
  },
  /*
  ** Toast
  */
  // toast: {
  //   position: 'top-center',
  //   register: [ // Register custom toasts
  //     {
  //       name: 'my-error',
  //       message: 'Oops...Something went wrong',
  //       options: {
  //         type: 'error'
  //       }
  //     }
  //   ]
  // },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}
