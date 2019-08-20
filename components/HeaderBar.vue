<template>
  <div>
    <nav class="navbar fixed-top navbar-light main">
      <div class="container top-nav">
        <a href="#" class="">Download Aplikasi Skytech</a>
        <div class="right-menu">
          <a href="#" class="mr-3">Lokasi Toko</a>
          <a href="#" class="">Bantuan</a>
        </div>
      </div>
      <div class="container pt-1">
        <a class="navbar-brand menu-left head" href="#" @click="$router.push({ path: '/' })">
          <img src="~assets/images/logo-only.png" height="30" class="d-inline-block align-center" alt="">
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

        <form action="" class="searchbar">
          <!-- <input class="form-control form-control-sm"> -->
          <div class="input-group">
            <input type="text" class="form-control form-control-sm" placeholder="Cari apa?" aria-label="Recipient's username" aria-describedby="button-addon2">
            <div class="input-group-append">
              <button class="btn btn-secondary btn-sm" type="button">
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
      user: null
    }
  },
  created() {
    if (!this.$store.getters['modules/uac/isAuthed']) {
      // logout
      logout(this)
      return
    }

    this.user = this.$store.state.modules.uac.name
    this.$store.dispatch('modules/cart/cartFetch', {
      apolloClient: this.$apollo,
      data: null
    })

    // console.log(this.$store.state.modules.uac.)
  },
  methods: {

  }
}
</script>

<style>

</style>
