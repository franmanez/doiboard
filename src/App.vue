<template>

  <header>
    <nav class="navbar gradient-custom navbar-expand-md navbar-dark bg-dark">
      <div class="container">

        <!-- Logo left -->
        <div class="mt-1 mb-1">
          <a href="https://www.doi.org/" target="_blank" class="navbar-brand" style="color: white; text-decoration: none;">
            <img src="@/assets/doi-logo.png" width="60" class="rounded-circle mx-0" alt="Logo">
          </a>
          <a href="https://www.crossref.org/" target="_blank" class="navbar-brand" style="color: white; text-decoration: none;">
            <img src="@/assets/logo-crossref.png" width="40" class="mx-0" alt="Logo">
          </a>
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
              <router-link to="/" active-class="text-warning" class="nav-link">
                <i class="bi bi-house me-1"></i>
                {{ $t("Home") }}
              </router-link>
            </li>
            <li class="nav-item me-3">
              <router-link to="/doi" active-class="text-warning" class="nav-link">
                <i class="bi bi-search me-1"></i>
                {{ $t("DOI Search") }}
              </router-link>
            </li>
            <li class="nav-item me-3">
              <router-link to="/prefix/info" active-class="text-warning" class="nav-link">
                <i class="bi bi-clipboard-data me-1"></i>
                {{ $t("Prefix Information") }}
              </router-link>
            </li>
            <li class="nav-item me-5">
              <router-link to="/members" active-class="text-warning" class="nav-link">
                <i class="bi bi-list-check me-1"></i>
                {{ $t("Members") }}
              </router-link>
            </li>
            <li class="nav-item dropdown mt-1" id="idioma">
              <el-dropdown trigger="click" class="nav-link dropdown-toggle">
                <a class="el-dropdown-link">
                  <span class="text-warning"><i class="bi bi-globe"></i> </span>
                </a>
                <template #dropdown>
                  <el-dropdown-menu class="language-selector">
                    <el-dropdown-item v-for="id in $i18n.availableLocales" :key="id" @click="changeLanguage(id)">
                      <a role="menuitem" :class="{selected: $i18n.locale===id}" href="#">{{ id === 'es' ? 'Español' : id === 'ca' ? 'Català' : 'English' }}</a>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>

  <div style="flex-grow: 1; min-height: 54vh;">
    <router-view></router-view>
  </div>






    <!-- FOR DEMO PURPOSE -->



    <!-- FOOTER -->
    <footer class="mt-5">
      <section class="hero text-white py-0 flex-grow-1" style="background-color: #434950">
        <div class="container py-2">
          <div class="row">

            <div class="col-lg-12 text-center">
              <a href="https://idp.upc.edu/" target="_blank" rel="noreferrer noopener" title="Iniciativa Digital Politècnica" class="me-5">
                <img src="@/assets/logo-idp-blanco.png" alt="Iniciativa Digital Politècnica" title="Iniciativa Digital Politècnica" class="grayscale" height="60">
              </a>
              <a href="https://bibliotecnica.upc.edu/" target="_blank" rel="noreferrer noopener" title="Servei de Biblioteques, Publicacions i Arxius" class="me-5">
                <img src="@/assets/logo-sbpa.png" alt="Servei de Biblioteques, Publicacions i Arxius" title="Servei de Biblioteques, Publicacions i Arxius" class="grayscale" height="80">
              </a>
              <!--a href="https://www.upc.edu/" target="_blank" rel="noreferrer noopener" title="Universitat Politècnica de Catalunya" class="me-5">
                <img src="@/assets/logo-upc-color.png" alt="Universitat Politècnica de Catalunya" title="Universitat Politècnica de Catalunya" class="grayscale" height="80">
              </a-->
              <a href="https://www.crossref.org/" target="_blank" rel="noreferrer noopener" title="Crossref" class="me-5">
                <img src="@/assets/logo-crossref.svg" alt="Crossref" title="Crossref" class="grayscale" height="55">
              </a>
              <a href="https://www.doi.org/" target="_blank" rel="noreferrer noopener" title="DOI" class="me-5">
                <img src="@/assets/logo-doi.svg" alt="DOI" title="DOI" class="grayscale" height="55">
              </a>

            </div>
          </div>
        </div>
      </section>
      <div class="container py-4">
        <div class="row gy-4 gx-5">
          <div class="col-lg-4 col-md-6">
            <h5 class="h3 text-white">DOIBoard <span style="color: #4f5858; font-weight: bold;">Crossref</span></h5>
            <p class="small text-secondary">{{ $t("Information about DOIs and CrossRef prefixes") }}</p>
            <p class="small text-secondary mb-0">© UPC - Universitat Politècnica de Catalunya · BarcelonaTech</p>
          </div>
          <div class="col-lg-2 col-md-6">
            <h5 class="text-white mb-3">Info</h5>
            <ul class="list-unstyled text-secondary">
              <li class="mb-2"><a href="#" class="text-secondary">{{ $t("Contact") }}</a></li>
              <li class="mb-2"><a href="#" class="text-secondary">{{ $t("About") }}</a></li>
              <li class="mb-2"><a href="#" class="text-secondary">{{ $t("Legal warning") }}</a></li>
            </ul>
          </div>
          <div class="col-lg-2 col-md-6">
            <h5 class="text-white mb-3">Quick links</h5>
            <ul class="list-unstyled text-secondary">
              <li class="mb-2">
                <router-link to="/doi" class="text-secondary">
                  {{ $t("DOI Search") }}
                </router-link>
              </li>
              <li class="mb-2">
                <router-link to="/prefix/info" class="text-secondary">
                  {{ $t("Prefix information") }}
                </router-link>
              </li>
              <li class="mb-2">
                <router-link to="/members" class="text-secondary">
                  {{ $t("Members") }}
                </router-link>
              </li>
            </ul>
          </div>
          <div class="col-lg-4 col-md-6">
            <h5 class="text-white mb-3">Developed by</h5>
            <p class="small text-secondary"> Iniciativa Digital Politècnica.
              <br>Servei de Biblioteques Publicacions i Arxius.
              <br>Edifici K2M, Planta S1, Despatx S103-S104, Campus Nord
              <br>C/ Jordi Girona 1-3, Barcelona
              <br> <a href="mailto:info.idp@upc.edu">info.idp@upc.edu</a>

            </p>
          </div>
        </div>
      </div>
    </footer>


</template>

<script>

export default {
  name: 'App',
  components: {
  },
  methods:{
    changeLanguage(language) {
      this.$i18n.locale = language;
      //localStorage.setItem("userLanguage", language)
      //location.reload()
    },
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
/* ==========================================
    FOR DEMO PURPOSE
  ========================================== */

footer {
  background: #212529;

}
/*img.grayscale {
  transition: all .5s ease-out;
  filter: grayscale(100%);
}

img.grayscale:hover {
  transition: all .5s ease-out;
  filter: grayscale(0);
}*/
</style>
