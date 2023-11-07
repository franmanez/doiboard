<template>

  <header>
    <nav class="navbar gradient-custom navbar-expand-md navbar-dark bg-dark">
      <div class="container">

        <!-- Logo left -->
        <div class="mt-1 mb-1">
          <router-link to="/" class="navbar-brand">
            <img src="@/assets/doi-logo.png" width="60" class="rounded-circle mx-0" alt="Logo">
          </router-link>
          <a href="https://www.upc.edu" target="_blank" class="navbar-brand" style="color: white; text-decoration: none;">
            <img src="@/assets/logo-upc-letras-blanco.png" width="260" class="mx-0" alt="Logo">
          </a>
        </div>

        <!-- Toggler button for small screens -->
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Collapsible menu links right -->
        <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item me-3">
              <router-link to="/doi" active-class="text-warning" class="nav-link">
                <i class="bi bi-search me-1"></i>
                DOI Search
              </router-link>
            </li>
            <li class="nav-item me-3">
              <router-link to="/prefix/info" active-class="text-warning" class="nav-link">
                <i class="bi bi-clipboard-data me-1"></i>
                Prefix Information
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/members" active-class="text-warning" class="nav-link">
                <i class="bi bi-list-check me-1"></i>
                Members
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>

  <div style="margin-top: 84px; margin-bottom: 100px;">
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
