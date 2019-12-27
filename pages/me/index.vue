<template>
  <div>
    <headerBar />

    <Layout active-index="saya">
      <h4 class="mt-3 mb-3">
        {{ name ? name : null }}
      </h4>

      <div v-show="$store.getters['modules/uac/isProfileDataCompleted'] === false" class="alert alert-warning" role="alert">
        <p class="mb-0 small">
          Segera lengkapi data pribadi Anda untuk meningkatkan pengalaman berbelanja Anda di Skytech!
        </p>
      </div>

      <p class="small mb-0 text-muted">
        Nomor Ponsel
      </p>
      <p>{{ username ? username : null }}</p>

      <p class="small mb-0 text-muted">
        Whatsapp
      </p>
      <p :class="!profile.whatsapp ? 'text-gray' : ''">
        {{ profile.whatsapp ? profile.whatsapp : 'Belum diisi' }}
      </p>

      <p class="small mb-0 text-muted">
        Email
      </p>
      <p :class="!profile.email ? 'text-gray' : ''">
        {{ profile.email ? profile.email : 'Belum diisi' }}
      </p>

      <p class="small mb-0 text-muted">
        Alamat
      </p>
      <p :class="!profile.address ? 'text-gray mb-4' : 'mb-4'">
        {{ address ? address : 'Belum diisi' }}
      </p>

      <button class="btn btn-outline-primary mr-2" type="button" @click="editProfile">
        {{ $store.getters['modules/uac/isProfileDataCompleted'] === false ? 'Lengkapi Data Pribadi' : 'Perbarui Profile' }}
      </button>
      <button class="btn btn-outline-primary mr-2" type="button" @click="editPassword">
        Perbarui Password
      </button>

      <div class="mb-5 row" />
    </Layout>

    <footerBar />

    <b-modal
      ref="modal-update-profile"
      title="Perbarui Profile"
      centered
      hide-footer
      no-close-on-esc
      no-close-on-backdrop
      :hide-header-close="isLoading"
    >
      <formProfile
        ref="form-profile"
        :profile="profile"
        @saved="savedProfile()"
        @loading="onLoading"
      />
    </b-modal>

    <b-modal
      ref="modal-update-password"
      title="Perbarui Password"
      centered
      hide-footer
      no-close-on-esc
      no-close-on-backdrop
      :hide-header-close="isLoading"
    >
      <formPassword
        ref="form-password"
        @saved="savedPassword()"
        @loading="onLoading"
      />
    </b-modal>
  </div>
</template>

<script>
import Layout from './components/layout'
import formProfile from './components/formProfile'
import formPassword from './components/formPassword'
import HeaderBar from '~/components/HeaderBar'
import FooterBar from '~/components/FooterBar'
import errorHandler from '~/modules/errorHandler'

export default {
  components: {
    Layout,
    formProfile,
    formPassword,
    HeaderBar,
    FooterBar
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (!vm.$store.getters['modules/uac/isAuthed']) {
        vm.errors = errorHandler(vm, {
          global: true,
          msg: 'Anda harus login terlebih dahulu',
          debug: 'me'
        })

        // redirect to login
        vm.$router.push({ path: '/uac/login' })
      }
    })
  },
  data() {
    return {
      name: null,
      username: null,
      profile: {},
      address: null,
      isLoading: false
    }
  },
  mounted() {
    this.loadProfile()
  },
  methods: {
    editProfile() {
      this.$refs['modal-update-profile'].show()
      setTimeout(() => {
        this.$refs['form-profile'].init()
      }, 100)
    },
    saveProfile() {
      this.$refs['modal-update-profile'].hide()
    },
    savedProfile() {
      this.$refs['modal-update-profile'].hide()
      this.loadProfile()
    },
    editPassword() {
      this.$refs['modal-update-password'].show()
    },
    savePassword() {
      this.$refs['modal-update-password'].hide()
    },
    savedPassword() {
      this.$refs['modal-update-password'].hide()
    },
    onLoading(dt) {
      this.isLoading = dt
    },
    loadProfile() {
      this.name = this.$store.state.modules.uac.name
      this.username = this.$store.state.modules.uac.username
      this.profile = this.$store.state.modules.uac.profile
      // console.log(this.profile)

      // parse address
      let addr = {}
      if (this.profile.address) {
        try {
          addr = JSON.parse(this.profile.address)
          addr.country = addr.country ? addr.country : 'INDONESIA'
        } catch (e) {
          console.log(e)
          addr = {
            country: this.profile.country ? this.profile.country : 'INDONESIA',
            address: this.profile.address,
            city: this.profile.city,
            province: this.profile.province,
            zip_code: this.profile.zip_code
          }
        }
      }

      if (addr.address) {
        this.address = addr.address + ', ' + addr.city + ', ' + addr.province + ', ' + addr.country + ', ' + addr.zip_code
      }
    }
  }
}
</script>

<style>

</style>
