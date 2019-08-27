<template>
  <div>
    <headerBar />

    <div class="container after-nav">
      <div class="row">
        <div class="col-12 pt-4 pt-5">
          <h1 class="title">
            Download Aplikasi Skytech
          </h1>
          <div class="row">
            <div class="d-none d-sm-block col-sm-6 col-md-5 col-lg-4 mt-5 py-5">
              <p class="text-muted mt-5">
                Lebih mudah belanja pakai aplikasi Skytech. Download dan install aplikasi Skytech sekarang juga!
              </p>
              <div class="row pt-5">
                <div class="col-4 pr-1">
                  <a href="#" target="_blank" class="mr-1" title="Playstore">
                    <img src="~assets/images/google_play.png" class="d-inline-block download img-fluid img-disabled" alt="PlayStore">
                  </a>
                </div>
                <div class="col-4 pl-1">
                  <a href="javascript:void(0);" target="_blank" class="mr-1" title="Appstore">
                    <img src="~assets/images/app_store.png" class="d-inline-block download img-fluid img-disabled" alt="AppStore">
                  </a>
                </div>
              </div>
            </div>
            <div class="d-none d-sm-block col-sm-6 col-md-7 col-lg-8 text-right">
              <img src="~assets/images/apps.png" class="img img-fluid">
            </div>
            <div class="d-sm-none col-sm-6 col-md-7 col-lg-8 pt-5 mt-3 text-center">
              <img src="~assets/images/apps.png" class="img img-fluid w-50">
            </div>
            <div class="d-sm-none col-sm-6 col-md-5 col-lg-4 pt-3 mb-5">
              <p class="text-muted">
                Lebih mudah belanja pakai aplikasi Skytech. Download dan install aplikasi Skytech sekarang juga!
              </p>
              <div class="row">
                <div class="col-5 pr-1">
                  <a href="#" target="_blank" class="mr-1" title="Playstore">
                    <img src="~assets/images/google_play.png" class="d-inline-block download img-fluid img-disabled" alt="PlayStore">
                  </a>
                </div>
                <div class="col-5 pl-1">
                  <a href="javascript:void(0);" target="_blank" class="mr-1" title="Appstore">
                    <img src="~assets/images/app_store.png" class="d-inline-block download img-fluid img-disabled" alt="AppStore">
                  </a>
                </div>
              </div>
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

export default {
  components: {
    HeaderBar,
    FooterBar
  }
}
</script>

<style scoped>

</style>
