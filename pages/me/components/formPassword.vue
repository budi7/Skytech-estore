<template>
  <form @submit.prevent="savePassword()" class="pt-3">
    <b-alert :show="errors.msg" variant="danger" fade>
      {{ errors.msg }}
    </b-alert>

    <div class="form-group">
      <div class="row">
        <div class="col-12">
          <label for="input-old_password">Password Lama</label>
          <b-input
            v-model="old_password"
            :disabled="is_loading === true"
            placeholder="6-15 karakter password"
            class="form-control"
            type="password"
            name="input-old_password"
          />
          <formError :msg="errors.data.old_password" />
        </div>
      </div>
    </div>

    <div class="form-group">
      <div class="row">
        <div class="col-12">
          <label for="input-new_password">Password Baru</label>
          <b-input
            v-model="new_password"
            :disabled="is_loading === true"
            placeholder="6-15 karakter password"
            class="form-control"
            type="password"
            name="input-new_password"
          />
          <formError :msg="errors.data.new_password" />
        </div>
      </div>
    </div>

    <div class="form-group pt-3">
      <b-button :disabled="is_loading" variant="primary" block type="submit">
        <span v-show="!is_loading">Simpan</span><i v-show="is_loading" class="fa fa-circle-o-notch fa-lg fa-spin" />
      </b-button>
    </div>
  </form>
</template>

<script>
import formError from '~/components/FormError'
// eslint-disable-next-line no-unused-vars
import apolloUpdatePassword from '~/gql/profile/updatePassword'
import alertHandler from '~/modules/alertHandler'
import errorHandler from '~/modules/errorHandler'

export default {
  components: {
    formError
  },
  data() {
    return {
      old_password: '',
      new_password: '',
      password_password: '',
      is_loading: false,
      errors: {
        data: {},
        msg: null
      }
    }
  },
  mounted() {
  },
  methods: {
    savePassword() {
      if (this.is_loading) return

      // init state
      this.is_loading = true
      this.errors = {
        data: {},
        msg: null
      }

      // post
      this.$emit('loading', true)
      const vm = this
      this.$store.dispatch('modules/uac/updatePassword', {
        apolloClient: this.$apollo,
        data: {
          old_password: vm.old_password,
          new_password: vm.new_password
        }
      }).then((res) => {
        // init
        vm.is_loading = false

        // show msg
        alertHandler(vm, {
          msg: 'Password telah berhasil diperbarui',
          type: 'success'
        })

        // done
        vm.$emit('saved')
        this.$emit('loading', false)
      }).catch((err) => {
        vm.is_loading = false
        vm.errors = errorHandler(vm, {
          response: err,
          global: false,
          debug: 'save update password'
        })
        this.$emit('loading', false)
      })
    }
  }
}
</script>

<style>

</style>
