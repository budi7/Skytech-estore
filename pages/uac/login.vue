<template>
  <div>
    <componentLogo />

    <form @submit.prevent="login()">
      <h3 class="mb-3">
        Login
      </h3>

      <b-alert :show="errors.msg" variant="danger" fade>
        {{ errors.msg }}
      </b-alert>

      <div class="form-group">
        <label for="input-username">Nomor Ponsel</label>
        <b-input
          v-model="username"
          :disabled="is_loading"
          placeholder="6281xxxxxxxx"
          class="form-control"
          type="text"
          name="input-username"
        />
      </div>

      <div class="form-group">
        <label for="input-password">Password</label>
        <b-input
          v-model="password"
          :disabled="is_loading"
          placeholder="Password anda"
          class="form-control"
          type="password"
          name="input-password"
        />
      </div>

      <div class="form-group text-right pb-3">
        <a @click="$router.push({ path: './requestResetPassword' })" href="javascript:void(0);" class="text-primary">
          Lupa Password?
        </a>
      </div>

      <div class="form-group pb-1">
        <b-button :disabled="is_loading" variant="primary" block type="submit">
          <span v-show="!is_loading">Login</span><i v-show="is_loading" class="fa fa-circle-o-notch fa-lg fa-spin" />
        </b-button>
      </div>

      <div class="form-group">
        <button @click="$router.push({ path: './register' })" class="btn btn-outline-primary btn-block" type="button">
          Mendaftar
        </button>
      </div>

      <div class="form-group py-4 text-center">
        <a @click="handleBack" href="javascript:void(0);" class="text-primary">
          {{ pageBeforeLogin ? 'Kembali' : 'Kembali ke Halaman Awal' }} <i class="fa fa-angle-right" />
        </a>
      </div>
    </form>
  </div>
</template>

<script>
import errorHandler from '../../modules/errorHandler'
import alertHandler from '../../modules/alertHandler'
import componentLogo from './fragments/logo'

export default {
  layout: 'blankCentered',
  components: {
    componentLogo
  },
  data() {
    return {
      username: '',
      password: '',
      is_loading: false,
      errors: {
        msg: null,
        data: {}
      },
      pageBeforeLogin: null,
      pagePrevious: null,
      prevRoute: null
    }
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.prevRoute = from
    })
  },
  mounted() {
    // console.log(this.$store)
    // console.log(this.$store.getters['modules/uac/getId'])
    this.username = this.$store.state.modules.uac.username

    // check prev stored page src
    this.pageBeforeLogin = window.sessionStorage.getItem('pageBeforeLogin')
    window.sessionStorage.removeItem('pageBeforeLogin')

    this.pagePrevious = window.sessionStorage.getItem('pagePrevious')
    window.sessionStorage.removeItem('pagePrevious')
  },
  methods: {
    initError() {
      this.errors = {
        msg: null,
        data: {}
      }
    },
    login() {
      // can i?
      if (this.is_loading) return
      this.is_loading = true

      this.$store.dispatch('modules/uac/login', {
        apolloClient: this.$apollo,
        data: {
          username: this.username,
          password: this.password
        }
      }).then((res) => {
        alertHandler(this, {
          msg: 'Selamat datang ' + res.user.customer.name + '!',
          type: 'success'
        })
        this.initError()
        this.is_loading = false

        this.$apolloHelpers.onLogin(res.token)

        if (this.pageBeforeLogin) {
          this.$router.push({ path: this.pageBeforeLogin })
        } else {
          // try go to prev page
          // this.$router.go(-1)
          this.$router.push({ path: '/' })
        }
      }).catch((err) => {
        this.errors = errorHandler(this, {
          response: err,
          global: false,
          msg: 'Data nomor ponsel atau password tidak valid',
          debug: 'GQL login'
        })
        this.password = null
        this.is_loading = false
      })
    },
    handleBack() {
      if (this.pageBeforeLogin) {
        this.$router.push({ path: this.pagePrevious ? this.pagePrevious : this.pageBeforeLogin })
      } else {
        this.$router.push({ path: '/' })
      }
    }
  }
}

</script>

<style>

</style>
