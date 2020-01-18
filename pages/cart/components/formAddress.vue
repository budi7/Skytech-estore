<template>
  <div class="row">
    <div class="col-12">
      <form class="pt-3" @submit.prevent="saveAddress()">
        <div class="form-group">
          <div class="row">
            <div class="col-6">
              <label for="input-nama">Nama Penerima</label>
              <b-input
                v-model="nama"
                :disabled="is_loading === true"
                placeholder="Nama Sesuai KTP"
                class="form-control"
                type="text"
                name="input-nama"
              />
              <formError :msg="errors.data.nama" />
            </div>
            <div class="col-6">
              <label for="input-n-hp">Nomor HP</label>
              <b-input
                v-model="no_hp"
                :disabled="is_loading === true"
                placeholder="081xxxxxxxxxx"
                class="form-control"
                type="tel"
                name="input-no_hp"
              />
              <formError :msg="errors.data.no_hp" />
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
              />
              <formError :msg="errors.data.province" />
            </div>
            <div class="col-6">
              <label for="input-city">Kota</label>
              <b-form-select
                v-model="city"
                :options="option_cities"
                :disabled="option_cities.length <= 1 || is_loading === true"
              />
              <formError :msg="errors.data.city" />
            </div>
          </div>
        </div>
        <div class="form-group">
          <div class="row">
            <div class="col-5">
              <label for="input-zip_code">Kode Pos</label>
              <b-input
                v-model="zip_code"
                :disabled="is_loading === true"
                placeholder="xxxxx"
                class="form-control"
                type="tel"
                name="input-zip_code"
              />
              <formError :msg="errors.data.zip_code" />
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
            <span v-show="!is_loading">Tambah</span><i v-show="is_loading" class="fa fa-circle-o-notch fa-lg fa-spin" />
          </b-button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import formError from '~/components/FormError'
import errorHandler from '~/modules/errorHandler'

export default {
  components: {
    formError
  },
  data() {
    return {
      nama: '',
      no_hp: '',
      zip_code: '',
      country: 'INDONESIA',
      province: null,
      city: null,
      address: '',
      option_province: [],
      option_cities: [],
      is_loading: false,
      errors: {
        msg: null,
        data: []
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
    this.initProvince()
    this.initCity()
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
      this.APIPropinsi()
        .then((res) => {
          this.initProvince()
          for (let i = 0; i < res.length; i++) {
            this.option_province.push({ value: res[i].nama, text: res[i].nama })
          }
        })
    },
    saveAddress() {
      // no need since using sync commit
      // if (this.is_loading) return
      // this.is_loading = true

      // validations
      const err = {}
      if (!this.nama || this.nama.replace(/\s/g, '') === '') {
        err.nama = ['required']
      } else if (this.nama.length <= 1) {
        err.nama = ['invalid']
      }
      if (!this.no_hp || this.no_hp.replace(/\s/g, '') === '') {
        err.no_hp = ['required']
      } else if (this.no_hp.length < 9 || this.no_hp.length > 16) {
        err.no_hp = ['invalid']
      }
      if (!this.address || this.address.replace(/\s/g, '') === '') {
        err.address = ['required']
      } else if (this.address.length <= 7) {
        err.address = ['invalid']
      }
      if (!this.city || this.city.replace(/\s/g, '') === '') err.city = ['required']
      if (!this.province || this.province.replace(/\s/g, '') === '') err.province = ['required']
      if (!this.zip_code || this.zip_code.replace(/\s/g, '') === '') {
        err.zip_code = ['required']
      } else if (this.zip_code.length < 4 || this.zip_code.length > 6) {
        err.zip_code = ['invalid']
      }

      console.log(err)
      if (err.length > 0) {
        this.errors = errorHandler(this, {
          response: [
            {
              message: 'validation',
              validation: err
            }
          ],
          global: false,
          debug: 'save local address'
        })
        return
      }

      // saving things
      this.$store.commit('modules/address/add', {
        receiver_name: this.nama,
        receiver_phone: this.no_hp,
        receiver_address: {
          address: this.address,
          city: this.city,
          province: this.province,
          zip_code: this.zip_code,
          country: this.country
        }
      })

      // trigger saved
      this.$emit('saved')
    }
  }
}
</script>

<style>

</style>
