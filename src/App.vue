<template>

  <header>
    <nav class="navbar gradient-custom navbar-expand-lg navbar-dark bg-dark">
      <div class="container">

        <!-- Logo left -->
        <div class="mt-1 mb-1 d-flex align-items-center">
          <!-- DOI Logo: visible siempre, tamaño pequeño en móviles, normal en escritorio -->
          <a href="https://www.doi.org/" target="_blank" class="navbar-brand" style="color: white; text-decoration: none;">
            <img src="@/assets/doi-logo.png" width="60" class="d-none d-lg-inline-block rounded-circle mx-0" alt="Logo">
            <img src="@/assets/doi-logo.png" width="50" class="d-inline-block d-lg-none rounded-circle mx-0" alt="Logo">
          </a>
          <!-- Crossref Logo: visible siempre, tamaño pequeño en móviles, normal en escritorio -->
          <a href="https://www.crossref.org/" target="_blank" class="navbar-brand" style="color: white; text-decoration: none;">
            <img src="@/assets/logo-crossref.png" width="40" class="d-none d-lg-inline-block mx-0" alt="Logo">
            <img src="@/assets/logo-crossref.png" width="35" class="d-inline-block d-lg-none mx-0" alt="Logo">
          </a>
          <!-- UPC Logo: letras en escritorio (lg+), logo circular en móviles (sm y menores) -->
          <a href="https://www.upc.edu" target="_blank" class="navbar-brand" style="color: white; text-decoration: none;">
            <!-- Escritorio (lg+): logo con letras -->
            <img src="@/assets/logo-upc-letras-blanco.png" width="260" class="d-none d-lg-inline-block mx-0" alt="Logo">
            <!-- Móviles (sm y menores): logo circular -->
            <img src="@/assets/upc-logo.png" width="50" class="d-inline-block d-lg-none mx-0" alt="Logo">
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
              <router-link to="/" active-class="text-warning" class="nav-link" @click="closeNavbar">
                <i class="bi bi-house-door me-1"></i>
                {{ $t("Home") }}
              </router-link>
            </li>

            <li class="nav-item me-3">
              <router-link to="/doi" active-class="text-warning" class="nav-link" @click="closeNavbar">
                <i class="bi bi-search me-1"></i>
                {{ $t("DOI Search") }}
              </router-link>
            </li>
            <li class="nav-item me-3">
              <router-link to="/prefix/info" active-class="text-warning" class="nav-link" @click="closeNavbar">
                <i class="bi bi-clipboard-data me-1"></i>
                {{ $t("Prefix Information") }}
              </router-link>
            </li>

            <!-- GLOBAL ANALYTICS DROPDOWN -->
            <li class="nav-item me-3 dropdown">
              <a class="nav-link dropdown-toggle text-warning-hover" href="#" id="globalAnalyticsDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="bi bi-globe me-1"></i>
                {{ $t("Explore") }}
              </a>
              <ul class="dropdown-menu dropdown-menu-dark shadow-lg border-0" aria-labelledby="globalAnalyticsDropdown">
                <li>
                  <router-link to="/members" class="dropdown-item py-2" @click="closeNavbar">
                    <i class="bi bi-building me-2 text-success"></i>{{ $t("Members") }}
                  </router-link>
                </li>
                <li>
                  <router-link to="/crossref-analytics" class="dropdown-item py-2" @click="closeNavbar">
                    <i class="bi bi-graph-up-arrow me-2 text-warning"></i>{{ $t("Most Cited Works") }}
                  </router-link>
                </li>
              </ul>
            </li>

            <!-- AI LAB DROPDOWN -->
            <li class="nav-item me-md-5 me-2 dropdown">
              <a class="nav-link dropdown-toggle text-warning-hover" href="#" id="aiLabDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="bi bi-robot me-1"></i>
                AI Lab
              </a>
              <ul class="dropdown-menu dropdown-menu-dark shadow-lg border-0" aria-labelledby="aiLabDropdown">
                <li>
                  <router-link to="/radar" class="dropdown-item py-2" @click="closeNavbar">
                    <i class="bi bi-bullseye me-2 text-primary"></i>{{ $t("Innovation Radar") }}
                  </router-link>
                </li>
                <li>
                  <router-link to="/monthly-synthesis" class="dropdown-item py-2" @click="closeNavbar">
                    <i class="bi bi-calendar-check me-2 text-success"></i>{{ $t("Monthly Synthesis") }}
                  </router-link>
                </li>
                <li>
                  <router-link to="/quarterly-horizon" class="dropdown-item py-2" @click="closeNavbar">
                    <i class="bi bi-rocket-takeoff me-2 text-warning"></i>{{ $t("Horizon Scanning") }}
                  </router-link>
                </li>
              </ul>
            </li>


            <li class="nav-item dropdown mt-1" id="idioma">
              <el-dropdown trigger="click" class="nav-link dropdown-toggle">
                <a class="el-dropdown-link">
                  <span class="text-warning">
                    <i class="bi bi-globe me-1"></i>
                    {{ $i18n.locale === 'es' ? 'Español' : $i18n.locale === 'ca' ? 'Català' : 'English' }}
                  </span>
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

    <!-- FOOTER -->
    <footer class="mt-5">
      <section class="hero text-white py-0 flex-grow-1" style="background-color: #434950">
        <div class="container py-1">
          <div class="row">

            <div class="col-lg-12 d-flex flex-wrap justify-content-center justify-content-lg-between align-items-center gap-4 py-2">
              <a href="https://www.upc.edu/idp" target="_blank" rel="noreferrer noopener" title="Iniciativa Digital Politècnica" class="d-inline-block">
                <img src="@/assets/logo-idp-blanco.png" alt="Iniciativa Digital Politècnica" title="Iniciativa Digital Politècnica" class="grayscale d-none d-md-inline" height="60" style="max-width: 100%;">
                <img src="@/assets/logo-idp-blanco.png" alt="Iniciativa Digital Politècnica" title="Iniciativa Digital Politècnica" class="grayscale d-inline d-md-none" height="50" style="max-width: 100%;">
              </a>
              <a href="https://bibliotecnica.upc.edu/" target="_blank" rel="noreferrer noopener" title="Servei de Biblioteques, Publicacions i Arxius" class="d-inline-block">
                <img src="@/assets/logo-sbpa-blanc.png" alt="Servei de Biblioteques, Publicacions i Arxius" title="Servei de Biblioteques, Publicacions i Arxius" class="grayscale d-none d-md-inline" height="80" style="max-width: 100%;">
                <img src="@/assets/logo-sbpa-blanc.png" alt="Servei de Biblioteques, Publicacions i Arxius" title="Servei de Biblioteques, Publicacions i Arxius" class="grayscale d-inline d-md-none" height="50" style="max-width: 100%;">
              </a>
              <a href="https://www.crossref.org/" target="_blank" rel="noreferrer noopener" title="Crossref" class="d-inline-block">
                <img src="@/assets/logo-crossref.svg" alt="Crossref" title="Crossref" class="grayscale d-none d-sm-inline" height="55" style="max-width: 100%;">
                <img src="@/assets/logo-crossref.svg" alt="Crossref" title="Crossref" class="grayscale d-inline d-sm-none" height="35" style="max-width: 100%;">
              </a>
              <a href="https://www.doi.org/" target="_blank" rel="noreferrer noopener" title="DOI" class="d-inline-block">
                <img src="@/assets/logo-doi.svg" alt="DOI" title="DOI" class="grayscale d-none d-sm-inline" height="55" style="max-width: 100%;">
                <img src="@/assets/logo-doi.svg" alt="DOI" title="DOI" class="grayscale d-inline d-sm-none" height="35" style="max-width: 100%;">
              </a>
            </div>
          </div>
        </div>
      </section>
      <div class="container py-4">
        <div class="row gy-4 gx-5">
          <div class="col-lg-4 col-md-6 mb-4 mb-lg-0">
            <h5 class="h3 text-white">DOIBoard <span style="color: #4f5858; font-weight: bold;">Crossref</span></h5>
            <p class="small text-secondary">{{ $t("Information about DOIs and Crossref prefixes") }}</p>
          </div>
          <div class="col-lg-4 col-md-6 mb-4 mb-lg-0">
            <h5 class="text-white mb-3">Info</h5>
            <ul class="list-unstyled text-secondary">
              <li class="mb-2"><a href="https://www.upc.edu/idp/ca/contact" target="_blank" class="text-secondary">{{ $t("Contact") }}</a></li>
              <li class="mb-2">
                <router-link to="/about" class="text-secondary">
                  {{ $t("About") }}
                </router-link>
              </li>
              <li class="mb-2"><a href="https://www.upc.edu/ca/avis-legal" target="_blank" class="text-secondary">{{ $t("Legal warning") }}</a></li>
            </ul>
          </div>
          <div class="col-lg-4 col-md-6">
            <h5 class="text-white mb-3">{{ $t("Developed by") }}</h5>
            <p class="small text-secondary"> Fran Máñez · <a href="mailto:francisco.manez@upc.edu">francisco.manez@upc.edu</a>
              <br>Servei de Biblioteques Publicacions i Arxius.
              <br>© UPC - Universitat Politècnica de Catalunya · BarcelonaTech
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
    },
    closeNavbar() {
      const navbarCollapse = document.getElementById('navbarNav');
      if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        try {
          if (window.bootstrap) {
            const bsCollapse = window.bootstrap.Collapse.getInstance(navbarCollapse) || 
                              new window.bootstrap.Collapse(navbarCollapse, { toggle: false });
            bsCollapse.hide();
          } else {
            navbarCollapse.classList.remove('show');
          }
        } catch (e) {
          navbarCollapse.classList.remove('show');
        }
      }
    }
  }
}
</script>

<style>

header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #333;
  z-index: 1000;
}

footer {
  background: #212529;
}

.nav-link {
  transition: all 0.3s ease;
  border-radius: 0.5rem;
  margin: 0 0.1rem;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.1) !important;
  text-decoration: none !important;
  color: white !important;
}

.text-warning-hover:hover {
  color: #ffc107 !important;
}

.dropdown-item:hover {
  background-color: #343a40 !important;
  color: #ffc107 !important;
}

.dropdown-menu-dark {
  border-radius: 0.75rem;
  padding: 0.5rem;
}

.dropdown-item {
  border-radius: 0.5rem;
  transition: all 0.2s ease;
}
</style>
