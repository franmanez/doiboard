<template>


  <header>
    <div class="px-3 py-2 text-bg-dark border-bottom">
      <div class="container">
        <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <a href="/" class="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none">

            <img src="@/assets/doi-logo.png" width="70" class="rounded-circle mx-3">
          </a>

          <ul class="nav col-12 col-lg-auto my-2 justify-content-center my-md-0">
            <li class="mt-3 mx-3 text-white">
              <router-link  to="/doi" active-class="text-warning" style="color: white; text-decoration: none;">
                DOI search
              </router-link>
            </li>
            <li class="mt-3 mx-3 text-white">
              <router-link to="/prefix" active-class="text-warning" style="color: white; text-decoration: none;">
                Prefix search
              </router-link>
            </li>
            <li class="mt-3 mx-3 text-white">
              <router-link to="/list" active-class="text-warning" style="color: white; text-decoration: none;">
                List DOIs
              </router-link>
            </li>
            <li class="mt-3 mx-3 text-white">
              <router-link to="/referenced" active-class="text-warning" style="color: white; text-decoration: none;">
                Most referenced DOIs
              </router-link>
            </li>
            <li class="mt-3 mx-3 text-white">
              <router-link to="/referencedOrcid" active-class="text-warning" style="color: white; text-decoration: none;">
                Most referenced ORCIDs
              </router-link>
            </li>

          </ul>
        </div>
      </div>
    </div>

  </header>


  <div style="margin-top: 100px; margin-bottom: 100px;">
    <router-view></router-view>
  </div>


</template>

<script>

export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #333; /* Cambia el color de fondo a tu elección */
  z-index: 1000; /* Puedes ajustar el valor de z-index según tus necesidades */
}


</style>
