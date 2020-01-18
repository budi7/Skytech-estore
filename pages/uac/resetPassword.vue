<template>
  <div>
    <logo />

    <form @submit.prevent="reset()">
      <h3 class="mb-3">
        Reset Password
      </h3>
      <p class="small">
        Masukkan 6 digit kode yang telah dikirimkan, beserta password baru Anda
      </p>

      <b-alert :show="errors.msg" variant="danger" fade>
        {{ errors.msg }}
      </b-alert>

      <div class="form-group pb-0">
        <label for="input-kode">Kode</label>
        <a href="javascript:void(0);" class="text-primary float-right" @click="resendCode()">
          Kirim Ulang Kode
        </a>
        <b-input
          v-model="kode"
          :disabled="is_loading"
          placeholder="6 digit kode"
          class="form-control"
          type="text"
          name="input-kode"
        />
        <formError :msg="errors.data.username" />
      </div>

      <div class="form-group">
        <label for="input-password">Password Baru</label>
        <b-input
          v-model="password"
          :disabled="is_loading"
          placeholder="Password baru anda"
          class="form-control"
          type="password"
          name="input-password"
        />
      </div>

      <div class="form-group pb-1 pt-3">
        <b-button :disabled="is_loading" variant="primary" block type="submit">
          <span v-show="!is_loading">Ubah Password</span><i v-show="is_loading" class="fa fa-circle-o-notch fa-lg fa-spin" />
        </b-button>
      </div>

      <div class="form-group py-4 text-center">
        <a href="javascript:void(0);" class="text-primary" @click="$router.push({ path: '/uac/login' })">Kembali<i class="fa fa-angle-right" /></a>
      </div>
    </form>
  </div>
</template>

<script>
import errorHandler from '../../modules/errorHandler'
import formError from '../../components/FormError'
import alertHandler from '../../modules/alertHandler'
import logo from './fragments/logo'

export default {
  layout: 'blankCentered',
  components: {
    logo, formError
  },
  data() {
    return {
      kode: '',
      password: '',
      is_loading: false,
      errors: {
        msg: null,
        data: {}
      }
    }
  },
  methods: {
    reset() {
      // can i?
      if (this.is_loading) return
      this.is_loading = true
      const user = JSON.parse(window.sessionStorage.getItem('user'))

      this.$store.dispatch('modules/uac/resetPassword', {
        apolloClient: this.$apollo,
        data: {
          token: this.kode,
          username: user.username,
          password: this.password
        }
      }).then((res) => {
        alertHandler(this, {
          msg: 'Password berhasil diperbarui',
          type: 'success'
        })
        this.is_loading = false

        this.$router.push({ path: './login' })
      }).catch((err) => {
        this.errors = errorHandler(this, {
          response: err,
          global: false,
          debug: 'GQL resetPassword'
        })
        this.is_loading = false
      })
    },
    resendCode() {
      if (this.is_loading) return
      this.is_loading = true
      const user = JSON.parse(window.sessionStorage.getItem('user'))

      this.$store.dispatch('modules/uac/forgotPassword', {
        apolloClient: this.$apollo,
        data: {
          username: user.username
        }
      }).then((res) => {
        this.is_loading = false
      }).catch((err) => {
        this.errors = errorHandler(this, {
          response: err,
          global: false,
          msg: 'Tidak dapat mengirimkan kode',
          debug: 'GQL forgotPassword'
        })

        this.is_loading = false
      })
    }
  }
}
</script>

<style>

</style>
