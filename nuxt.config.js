
export default {
  mode: 'universal',
  layoutTransition: 'layout',
  pageTransition: 'page',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
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
    { src: '~/plugins/numberFormat', ssr: true }
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
    clientConfigs: {
      default: {
        httpEndpoint: 'http://enginev1.skytech.id/graphql'
        tokenName: 'apollo-token', // optional
        loadingKey: 'loading',
        persisting: false, // Optional
        websocketsOnly: false // Optional
        // httpLinkOptions: {
        //   headers: {
        //     'authorization': process.browser ? JSON.parse(window.localStorage.user).token : null
        //   }
        // }
      }
      // me: {
      //   httpEndpoint: 'http://localhost:8000/graphql/me'
      // },
      // indonesia: {
      //   httpEndpoint: 'https://indonesia.thunderlab.id/graphql'
      // }
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
