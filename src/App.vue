<template>



  <header>



    <nav class="navbar navbar-expand-md navbar-dark bg-dark">
      <div class="container ">
        <a class="navbar-brand" href="#">
          <router-link  to="/" class="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none" style="color: white; text-decoration: none;">
            <img src="@/assets/doi-logo.png" width="70" class="rounded-circle mx-3" alt="Logo">
          </router-link>
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item mt-2 mx-3">
              <router-link  to="/doi" active-class="text-warning" style="color: white; text-decoration: none;">
                DOI
              </router-link>
            </li>
            <li class="nav-item mt-2 mx-3">
              <router-link to="/prefix/info" active-class="text-warning" style="color: white; text-decoration: none;">
                PREFIX
              </router-link>
            </li>
            <!--li class="nav-item mt-2 mx-3">
              <router-link to="/prefix" active-class="text-warning" style="color: white; text-decoration: none;">
                Prefix search
              </router-link>
            </li>
            <li class="nav-item mt-2 mx-3">
              <router-link to="/list" active-class="text-warning" style="color: white; text-decoration: none;">
                List DOIs
              </router-link>
            </li>
            <li class="nav-item mt-2 mx-3">
              <router-link to="/referenced" active-class="text-warning" style="color: white; text-decoration: none;">
                Most referenced DOIs
              </router-link>
            </li>
            <li class="nav-item mt-2 mx-3">
              <router-link to="/referencedOrcid" active-class="text-warning" style="color: white; text-decoration: none;">
                Most referenced ORCIDs
              </router-link>
            </li-->
          </ul>
        </div>
      </div>
    </nav>




  </header>


  <div style="margin-top: 150px; margin-bottom: 100px;">
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
