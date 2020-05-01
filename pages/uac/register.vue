<template>
  <div>
    <logo />

    <form @submit.prevent="register()">
      <h3 class="mb-3">
        Daftar
      </h3>

      <b-alert :show="errors.msg" variant="danger" fade>
        {{ errors.msg }}
      </b-alert>

      <b-form-group label="Nama Lengkap">
        <b-input
          v-model="name"
          :disabled="is_loading"
          placeholder="Nama sesuai ktp"
          class="form-control"
          type="text"
          name="input-name"
        />
        <formError :msg="errors.data.name" />
      </b-form-group>

      <b-form-group label="Nomor Ponsel">
        <b-input
          v-model="username"
          :disabled="is_loading"
          placeholder="6281xxxxxxxx"
          class="form-control"
          type="text"
          name="input-username"
        />
        <formError :msg="errors.data.username" />
      </b-form-group>

      <b-form-group label="Password">
        <b-input
          v-model="password"
          :disabled="is_loading"
          placeholder="Password anda"
          class="form-control"
          type="password"
          name="input-password"
        />
        <formError :msg="errors.data.password" />
      </b-form-group>

      <div class="form-group pb-1 pt-3">
        <b-button :disabled="is_loading" variant="primary" block type="submit">
          <span v-show="!is_loading">Mendaftar</span><i v-show="is_loading" class="fa fa-circle-o-notch fa-lg fa-spin" />
        </b-button>
      </div>

      <div class="form-group">
        <button @click="$router.push({ path: './login' })" class="btn btn-outline-primary btn-block" type="button">
          Login
        </button>
      </div>

      <div class="form-group py-4 text-center">
        <a @click="$router.push({ path: '/' })" href="javascript:void(0);" class="text-primary">Kembali ke Halaman Awal <i class="fa fa-angle-right" /></a>
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
      name: '',
      username: '',
      password: '',
      is_loading: false,
      errors: {
        msg: null,
        data: []
      }
    }
  },
  methods: {
    register() {
      // can i?
      if (this.is_loading) return
      this.is_loading = true

      this.$store.dispatch('modules/uac/register', {
        apolloClient: this.$apollo,
        data: {
          name: this.name,
          username: this.username,
          password: this.password
        }
      }).then((res) => {
        alertHandler(this, {
          msg: 'Akun Anda telah berhasil didaftarkan',
          type: 'success'
        })
        this.is_loading = false

        this.$router.push({ path: './login' })
      }).catch((err) => {
        this.errors = errorHandler(this, {
          response: err,
          global: false,
          debug: 'GQL Register'
        })
        console.log(this.errors)
        this.is_loading = false
      })
    }
  }
}
</script>

<style>

</style>
