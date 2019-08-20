<template>
  <div>
    <logo />

    <form @submit.prevent="reset()">
      <h3 class="mb-3">
        Reset Password
      </h3>
      <p class="small">
        Masukkan 4 digit kode yang telah dikirimkan, beserta password baru Anda
      </p>

      <b-alert variant="danger" fade :show="errors.msg">
        {{ errors.msg }}
      </b-alert>

      <div class="form-group pb-0">
        <label for="input-kode">Kode</label>
        <a href="javascript:void(0);" class="text-primary float-right" @click="resendCode()">
          Kirim Ulang Kode
        </a>
        <b-input
          v-model="kode"
          placeholder="4 digit kode"
          class="form-control"
          type="text"
          name="input-kode"
          :disabled="is_loading"
        />
        <formError :msg="errors.data.username" />
      </div>

      <div class="form-group">
        <label for="input-password">Password Baru</label>
        <b-input
          v-model="password"
          placeholder="Password baru anda"
          class="form-control"
          type="password"
          name="input-password"
          :disabled="is_loading"
        />
      </div>

      <div class="form-group pb-1 pt-3">
        <b-button variant="primary" block type="submit" :disabled="is_loading">
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

      this.$store.dispatch('modules/uac/resetPassword', {
        apolloClient: this.$apollo,
        data: {
          token: this.kode,
          password: this.password
        }
      }).then((res) => {
        console.log(res)
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
        console.log(this.errors)
        this.is_loading = false
      })
    },
    resendCode() {
    }
  }
}
</script>

<style>

</style>
