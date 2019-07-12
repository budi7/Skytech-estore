<template>
  <div class="pt-3">
    <footer class="page-footer font-small pt-3">
      <div class="container text-md-left">
        <div class="row">
          <div class="col-6 logo pr-0">
            <a class="navbar-brand menu-left head pt-2" href="#" @click="$router.push({ path: '/' })">
              <img src="~assets/images/logo-only.png" height="30" class="d-inline-block align-center" alt="">
              <span>
                SKYTECH
              </span>
            </a>
          </div>
          <div class="col-6 pl-0 text-right align-items-center socmed">
            <a href="https://www.youtube.com/channel/UCQlZ4k1aix09Ze-du_S94Kw/" target="_blank" class="mr-1" title="Youtube">
              <img src="~assets/images/youtube.png" width="24px" height="24px" class="d-inline-block align-top" alt="Youtube">
            </a>
            <a href="https://www.instagram.com/skytech.id/" target="_blank" class="mr-3" title="Instagram">
              <img src="~assets/images/instagram.png" width="24px" height="24px" class="d-inline-block align-top" alt="Instagram">
            </a>
            <p class="mr-3 hidden-xxs hidden-xxxs">
              Temukan kami di
            </p>
            <!-- <a href="#" class="fa fa-2x fa-instagram" /> -->
            <!-- <a href="#" class="fa fa-2x fa-youtube" /> -->
          </div>
          <hr class="clearfix w-100 pb-3">
        </div>
        <div class="row">
          <!-- <div class="col-4 pb-3">
            <h5>
              Skytech.id
            </h5>
            <p>
              Lenmarc Mall Surabaya, Lt. UG No. 33-35 <br>
              Jl. Mayjen Yono Suwoyo No.9, Surabaya <br>
              Jawa Timur
            </p>
          </div> -->
          <!-- <div class="col-3 pb-3">
            <h5 class="mb-3">
              Skytech
            </h5>
            <ul class="sitemap">
              <li>
                <a href="#">
                  Layanan Bantuan
                </a>
              </li>
              <li>
                <a href="#">
                  Tentang Skytech
                </a>
              </li>
              <li>
                <a href="#">
                  Aturan Penggunaan
                </a>
              </li>
              <li>
                <a href="#">
                  Kebijakan Privasi
                </a>
              </li>
            </ul>
          </div> -->
          <div class="col-12 col-sm-12 col-md-8 col-lg-8 pb-3">
            <h5 class="mb-3">
              Kategori
            </h5>
            <div class="row">
              <div v-for="(dt,i) in $store.state.modules.product.categories" :key="i" class="col-4 col-sm-3 col-md-3 sitemap">
                <a href="javascript:void(0)">{{ dt.category }}</a>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-1">
            <div class="clearfix py-3" />
          </div>
          <div class="col-12 col-md-3 pb-3">
            <h5 class="mb-3">
              Download
            </h5>
            <p>
              Lebih mudah belanja pakai aplikasi Skytech. Download dan install aplikasi Skytech sekarang juga!
            </p>
            <div class="row pt-1">
              <div class="col-6 col-sm-3 col-md-6 pr-1">
                <a href="#" target="_blank" class="mr-1" title="Playstore">
                  <img src="~assets/images/google_play.png" class="d-inline-block download img-fluid" alt="PlayStore">
                </a>
              </div>
              <div class="col-6 col-sm-3 col-md-6 pl-1">
                <a href="javascript:void(0);" target="_blank" class="mr-1" title="Appstore">
                  <img src="~assets/images/app_store.png" class="d-inline-block download img-fluid img-disabled" alt="AppStore">
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
    <footer class="bg-primary mt-4">
      <div class="footer-copyright text-center py-2">
        <a href="javascript:void(0);" class="text-white" @click="$router.push({ path: '/' })">
          © 2019 COPYRIGHT SKYTECH
        </a>
      </div>
    </footer>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
