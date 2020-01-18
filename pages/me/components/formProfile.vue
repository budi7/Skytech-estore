<template>
  <form class="pt-3" @submit.prevent="saveProfile()">
    <b-alert :show="errors.msg" variant="danger" fade>
      {{ errors.msg }}
    </b-alert>
    <div class="form-group pb-3">
      <div class="row">
        <div class="col-12">
          <label for="input-nama">Nama Lengkap</label>
          <b-input
            v-model="nama"
            :disabled="is_loading === true"
            placeholder="Nama Lengkap"
            class="form-control"
            type="text"
            name="input-nama"
          />
          <formError :msg="errors.data.nama" />
        </div>
      </div>
    </div>
    <div class="form-group">
      <div class="row">
        <div class="col-12">
          <p class="mb-0">
            <strong>
              Kontak
            </strong>
          </p>
        </div>
      </div>
    </div>
    <div class="form-group">
      <div class="row">
        <div class="col-6">
          <label for="input-whatsapp">Whatsapp</label>
          <b-input
            v-model="whatsapp"
            :disabled="is_loading === true"
            placeholder="081xxxxxxxxxx"
            class="form-control"
            type="tel"
            name="input-whatsapp"
          />
          <formError :msg="errors.data.whatsapp" />
        </div>
        <div class="col-6">
          <label for="input-email">Email</label>
          <b-input
            v-model="email"
            :disabled="is_loading === true"
            placeholder="Email Anda"
            class="form-control"
            type="email"
            name="input-email"
          />
          <formError :msg="errors.data.email" />
        </div>
      </div>
    </div>
    <div class="form-group">
      <div class="row">
        <div class="col-12 pt-3">
          <p class="mb-0">
            <strong>
              Alamat
            </strong>
          </p>
        </div>
      </div>
    </div>
    <div class="form-group">
      <div class="row">
        <div class="col-6">
          <label for="input-province">Provinsi</label>
          <b-form-select
            v-model.lazy="province"
            :options="option_province"
            :disabled="is_loading === true"
            placholder="pilih"
            class="form-control"
          />
          <formError :msg="errors.data.province" />
        </div>
        <div class="col-6">
          <label for="input-city">Kota</label>
          <b-form-select
            v-model="city"
            :options="option_cities"
            :disabled="option_cities.length <= 1 || is_loading === true"
            class="form-control"
          />
          <formError :msg="errors.data.city" />
        </div>
      </div>
    </div>
    <div class="form-group">
      <div class="row">
        <div class="col-5">
          <label for="input-postcode">Kode Pos</label>
          <b-input
            v-model="postcode"
            :disabled="is_loading === true"
            placeholder="xxxxx"
            class="form-control"
            type="tel"
            name="input-postcode"
          />
          <formError :msg="errors.data.postcode" />
        </div>
      </div>
    </div>
    <div class="form-group">
      <label for="input-address">Alamat Lengkap</label>
      <b-form-textarea
        v-model="address"
        :disabled="is_loading === true"
        placeholder="Detail alamat pengiriman"
        rows="3"
        max-rows="3"
        no-resize
      />
      <formError :msg="errors.data.address" />
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
import alertHandler from '~/modules/alertHandler'
import errorHandler from '~/modules/errorHandler'

export default {
  components: {
    formError
  },
  props: {
    profile: {
      default: function () { return {} },
      type: Object
    }
  },
  data() {
    return {
      nama: '',
      email: '',
      whatsapp: '',
      address: '',
      city: null,
      province: null,
      postcode: '',
      country: 'INDONESIA',
      phone: '',
      is_loading: false,
      option_province: [],
      option_cities: [],
      errors: {
        data: {},
        msg: null
      }
    }
  },
  watch: {
    province: function (nv) {
      this.APIPropinsi(nv)
        .then((res) => {
          this.initCity()
          if (Array.isArray(res) && res[0] && res[0].kota) {
            for (let i = 0; i < res[0].kota.length; i++) {
              this.option_cities.push({ value: res[0].kota[i].nama, text: res[0].kota[i].nama })
            }
          }
        })
    }
  },
  mounted() {
    // load data
    this.nama = this.profile.name
    this.email = this.profile.email
    this.whatsapp = this.profile.whatsapp

    this.address = this.profile.address
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
    this.city = addr.city ? addr.city : null
    this.province = addr.province ? addr.province : null
    this.address = addr.address
    this.postcode = addr.zip_code
    this.country = addr.country

    if (!this.province) this.initProvince()
    if (!this.city) this.initCity()
  },
  methods: {
    initProvince() {
      this.option_province = [
        {
          value: null,
          text: 'Pilih provinsi',
          disabled: 'disabled',
          selected: 'selected'
        }
      ]
    },
    initCity() {
      this.option_cities = [
        {
          value: null,
          text: 'Pilih Kota',
          disabled: 'disabled',
          selected: 'selected'
        }
      ]
    },
    init() {
      const vm = this
      this.APIPropinsi()
        .then((res) => {
          if (!vm.province) vm.initProvince()
          for (let i = 0; i < res.length; i++) {
            vm.option_province.push({ value: res[i].nama, text: res[i].nama })
          }
        })
    },
    saveProfile() {
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
      this.$store.dispatch('modules/uac/updateProfile', {
        apolloClient: this.$apollo,
        data: {
          id: this.$store.state.modules.uac.customer_id,
          nama: this.nama,
          email: this.email,
          whatsapp: this.whatsapp,
          address: JSON.stringify({
            address: this.address,
            city: this.city,
            province: this.province,
            zip_code: this.postcode,
            country: this.country
          })
        }
      }).then((res) => {
        // init
        vm.is_loading = false

        // show msg
        alertHandler(vm, {
          msg: 'Profile telah berhasil diperbarui',
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
