<template>
  <div>
    <componentLogo />

    <form @submit.prevent="request">
      <h3 class="mb-3">
        Lupa Password
      </h3>
      <p class="small">
        Masukkan nomor ponsel Anda untuk mengirimkan kode penggantian password.
      </p>

      <b-alert variant="danger" fade :show="errors.msg">
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
        <formError :msg="errors.data.username" />
      </div>

      <div class="form-group pb-1 pt-3">
        <b-button :disabled="is_loading" variant="primary" block type="submit">
          <span v-show="!is_loading">Kirim Kode</span><i v-show="is_loading" class="fa fa-circle-o-notch fa-lg fa-spin" />
        </b-button>
      </div>

      <div class="form-group py-4 text-center">
        <a @click="$router.push({ path: '/uac/login' })" href="javascript:void(0);" class="text-primary">Kembali<i class="fa fa-angle-right" /></a>
      </div>
    </form>
  </div>
</template>

<script>
import errorHandler from '../../modules/errorHandler'
import formError from '../../components/FormError'
import componentLogo from './fragments/logo'

export default {
  layout: 'blankCentered',
  components: {
    componentLogo, formError
  },
  data() {
    return {
      username: '',
      is_loading: false,
      errors: {
        msg: null,
        data: {}
      }
    }
  },
  methods: {
    request() {
      // can i?
      if (this.is_loading) return
      this.is_loading = true

      this.$store.dispatch('modules/uac/forgotPassword', {
        apolloClient: this.$apollo,
        data: {
          username: this.username
        }
      }).then((res) => {
        this.is_loading = false

        this.$router.push({ path: '/uac/resetPassword' })
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
