<template>
  <div>
    <headerBar />

    <div class="container after-nav">
      <div class="row">
        <div class="col-12 pt-4">
          <h1 class="title pb-5">
            Lokasi Toko
          </h1>
          <div v-for="(data, i) in stores" :key="i" class="row mt-4 pb-4">
            <div class="col-12 col-sm-4 pt-4 pb-4">
              <h5 class="mb-1">
                {{ data.name }}
              </h5>
              <p class="mb-2">
                {{ data.contact }}
              </p>
              <p class="mb-0 text-gray">
                {{ data.address }}, {{ data.city }}<br>
                {{ data.province }}, {{ data.country ? data.country : 'INDONESIA' }}, {{ data.zip_code }}
              </p>
            </div>
            <div class="col-12 col-sm-8">
              <iframe
                :src="parseAdr(data)"
                frameborder="0"
                style="border:0;Width:100% !important; background-color: #f4f4f4!important;"
                height="320"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <footerBar />
  </div>
</template>

<script>
import HeaderBar from '~/components/HeaderBar'
import FooterBar from '~/components/FooterBar'

import apolloQueryOrgs from '~/gql/shipping/storeList'

export default {
  components: {
    HeaderBar,
    FooterBar
  },
  data() {
    return {
      stores: {},
      addr: null
    }
  },
  asyncData({ app }) {
    return app.apolloProvider.defaultClient
      .query({
        query: apolloQueryOrgs
      }).then((res) => {
        const rslt = res.data.Organizations.data.map((dt) => {
          let tmp
          try {
            if (dt.address) {
              tmp = JSON.parse(dt.address)
              console.log(11)
            } else {
              tmp = {
                city: dt.city,
                country: dt.country,
                postcode: dt.postcode,
                province: dt.province,
                address: dt.address
              }
            }
          } catch (error) {
            tmp = {
              city: dt.city,
              country: dt.country,
              postcode: dt.postcode,
              province: dt.province,
              address: dt.address
            }
          }
          const tdt = {
            name: dt.name,
            contact: dt.contact
          }
          return { ...tmp, ...tdt }
        })
        return { stores: rslt }
      }).catch((err) => {
        console.log(err)
      })
  },
  methods: {
    parseAdr(dt) {
      const tmp = 'https://www.google.com/maps/embed/v1/place?key=AIzaSyCDRTbouYUaBoJ0IBSXwxK30MSyHkzVv2E&q='
      const addr = dt.name + ' ' + dt.address + ' ' + dt.city + ' ' + dt.province + ' ' + dt.country + ' ' + dt.zip_code
      return tmp + addr.replace(/\s/g, '+')
    }
  }
}
</script>

<style scoped>

</style>
