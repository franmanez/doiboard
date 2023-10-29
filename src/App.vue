<template>


  <header>
    <div class="px-3 py-2 text-bg-dark border-bottom">
      <div class="container">
        <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <a href="/" class="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none">

            <img src="@/assets/doi-logo.png" width="70" class="rounded-circle mx-3">
          </a>

          <ul class="nav col-12 col-lg-auto my-2 justify-content-center my-md-0">
            <li class="mt-3 mx-2 text-white">
              <router-link  to="/doi" active-class="text-warning" style="color: white; text-decoration: none;">
                DOI search
              </router-link>
            </li>
            <li class="mt-3 mx-2 text-white">
              <router-link to="/prefix" active-class="text-warning" style="color: white; text-decoration: none;">
                Prefix search
              </router-link>
            </li>
            <li class="mt-3 mx-2 text-white">
              <router-link to="/list" active-class="text-warning" style="color: white; text-decoration: none;">
                List DOIs
              </router-link>
            </li>
            <li class="mt-3 mx-2 text-white">
              <router-link to="/table" active-class="text-warning" style="color: white; text-decoration: none;">
                TEST
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>

  </header>


  <br><br>

  <!--header class="mb-5">
    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">

      <a class="navbar-brand " href="#">
        <img src="@/assets/doi-logo.png" width="70" class="rounded-circle mx-3">
      </a>

      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarCollapse">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active mx-2">
            <router-link class="nav-link" to="/doi">DOI search</router-link>
          </li>
          <li class="nav-item mx-2">
            <router-link class="nav-link" to="/prefix">Prefix search</router-link>
          </li>
          <li class="nav-item mx-2">
            <router-link class="nav-link" to="/table">TEST</router-link>
          </li>
        </ul>

      </div>
    </nav>
  </header-->
  <router-view></router-view>
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

.active-link {
  background-color: red; /* Cambia el color a tu elección */
  /* Puedes aplicar otros estilos, como fondo o efectos de texto, según tus necesidades */
}
</style>
