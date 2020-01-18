<template>
  <div>
    <nav class="navbar fixed-top navbar-light main">
      <div class="container top-nav">
        <a href="javascript:void(0);" class="" @click="$router.push({ path: '/download' })">Download Aplikasi Skytech</a>
        <div class="right-menu">
          <a href="javascript:void(0);" class="" @click="$router.push({ path: '/locations' })">Lokasi Toko</a>
          <!-- <a href="#" class="">Bantuan</a> -->
        </div>
      </div>
      <div class="container pt-1">
        <a class="navbar-brand menu-left head" href="javascript:void(0);" @click="$router.push({ path: '/' })">
          <img src="https://skytech.id/assets/images/logo-only.png" height="30" class="d-inline-block align-center" alt="">
          <span>
            SKYTECH
          </span>
        </a>

        <div class="right-menu d-md-none d-lg-none d-xl-none">
          <ul class="navbar-nav">
            <li v-show="!this.$store.getters['modules/uac/isAuthed']" class="nav-item hidden-xxs">
              <a href="javascript:void(0);" class="nav-link" @click="$router.push({ path: '/uac/register' })">Daftar</a>
            </li>
            <li v-show="!this.$store.getters['modules/uac/isAuthed']" class="nav-item">
              <a href="javascript:void(0);" class="nav-link" @click="$router.push({ path: '/uac/login' })">Login</a>
            </li>
            <li v-show="this.$store.getters['modules/uac/isAuthed']" class="nav-item">
              <a href="javascript:void(0);" class="nav-link" @click="$router.push({ path: '/me' })">
                {{ user | firstWord }} <i class="fa fa-user fa-adjustment" />
              </a>
            </li>
            <li class="nav-item">
              <a href="#" class="py-1 nav-link separator disabled">&nbsp;</a>
            </li>
            <li class="nav-item">
              <a href="javascript:void(0);" class="nav-link" @click="$router.push({ path: '/cart' })">
                <i class="fa fa-shopping-cart fa-adjustment" /> <small>{{ $store.state.modules.cart.cart_total_item }}</small>
              </a>
            </li>
          </ul>
        </div>

        <form class="searchbar" @submit.prevent="setSearch">
          <!-- <input class="form-control form-control-sm"> -->
          <div class="input-group">
            <input
              v-model="search"
              type="text"
              class="form-control form-control-sm"
              placeholder="Cari apa?"
              aria-label="Recipient's username"
              aria-describedby="button-addon2"
            >
            <div class="input-group-append">
              <button class="btn btn-secondary btn-sm" type="submit">
                <i class="fa fa-search" />
              </button>
            </div>
          </div>
        </form>

        <div class="right-menu d-none d-md-block">
          <ul class="navbar-nav">
            <li v-show="!this.$store.getters['modules/uac/isAuthed']" class="nav-item">
              <a href="javascript:void(0);" class="nav-link" @click="$router.push({ path: '/uac/register' })">Daftar</a>
            </li>
            <li v-show="!this.$store.getters['modules/uac/isAuthed']" class="nav-item">
              <a href="javascript:void(0);" class="nav-link" @click="$router.push({ path: '/uac/login' })">Login</a>
            </li>
            <li v-show="this.$store.getters['modules/uac/isAuthed']" class="nav-item">
              <a href="javascript:void(0);" class="nav-link" @click="$router.push({ path: '/me' })">
                {{ user | firstWord }} <i class="fa fa-user fa-adjustment" />
              </a>
            </li>
            <li class="nav-item">
              <a href="#" class="py-1 nav-link separator disabled">&nbsp;</a>
            </li>
            <li class="nav-item">
              <a href="javascript:void(0);" class="nav-link" @click="$router.push({ path: '/cart' })">
                <i class="fa fa-shopping-cart" /> {{ $store.state.modules.cart.cart_total_item }}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <slot />
  </div>
</template>

<script>
import { logout } from '~/modules/logout'

export default {
  data() {
    return {
      user: null,
      isAuthed: this.$store.getters['modules/uac/isAuthed'],
      search: null
    }
  },
  created() {
    if (!this.isAuthed) {
      // logout
      logout(this)
    } else {
      this.user = this.$store.state.modules.uac.name
      this.$store.dispatch('modules/cart/cartFetch', {
        apolloClient: this.$apollo,
        data: null
      })
    }

    // console.log(this.$store.state.modules.uac.)
  },
  mounted() {
    const vm = this
    this.$nextTick(() => {
      if (!vm.isAuthed) return
      this.$store.dispatch('modules/wishlist/fetch', {
        apolloClient: this.$apollo,
        data: null
      })
    })
  },
  methods: {
    setSearch() {
      if (!this.search) return
      if (this.search.replace(/\s/g, '') === '') return

      const q = {}
      q.search = this.search

      if (this.$route.query.kategori && this.$route.query.kategori_id) {
        q.kategori = this.$route.query.kategori
        q.kategori_id = this.$route.query.kategori_id
      }

      console.log(q)

      this.$router.push({
        path: '/product',
        // send this qs
        query: q
      })
      this.search = ''
    }
  }
}
</script>

<style>

</style>
