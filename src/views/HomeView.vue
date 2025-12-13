<template>
  <div>
    <div>

      <div id="myCarousel" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-indicators">
          <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
        </div>
        <div class="carousel-inner">
          <div class="carousel-item active">

            <img src="@/assets/background1.png" alt="UPC" class="w-100 img-repeat d-none d-md-block" style="height: 400px;">
            <img src="@/assets/background1.png" alt="UPC" class="w-100 img-repeat d-block d-md-none" style="height: 250px;">

            <div class="container">
              <div class="carousel-caption">
                <h1 class="display-4 display-md-3">
                  DOIBoard <span style="color: #4f5858; font-weight: bold;">Crossref</span>
                  <img src="@/assets/logo-crossref.png" class="mx-3 mb-2 d-none d-sm-inline" width="30" alt="Logo">
                  <img src="@/assets/logo-crossref.png" class="mx-2 mb-1 d-inline d-sm-none" width="20" alt="Logo">
                </h1>
                <p class="d-none d-sm-block">{{ $t("Information about DOIs and Crossref prefixes") }}</p>
                <p class="d-block d-sm-none small">{{ $t("Information about DOIs and Crossref prefixes") }}</p>
                <p>
                  <router-link to="/doi" class="btn btn-lg btn-dark d-none d-sm-inline-block" >
                    {{ $t("DOI Search") }}
                  </router-link>
                  <router-link to="/doi" class="btn btn-sm btn-dark d-inline-block d-sm-none" >
                    {{ $t("DOI Search") }}
                  </router-link>
                </p>
              </div>
            </div>
          </div>
          <div class="carousel-item">

            <img src="@/assets/background3.jpg" alt="UPC" class="w-100 img-repeat d-none d-md-block" style="height: 400px;">
            <img src="@/assets/background3.jpg" alt="UPC" class="w-100 img-repeat d-block d-md-none" style="height: 250px;">


            <div class="container">
              <div class="carousel-caption">
                <h1 class="display-4 display-md-3">
                  DOIBoard <span style="color: #4f5858; font-weight: bold;">Crossref</span>
                  <img src="@/assets/logo-crossref.png" class="mx-3 mb-2 d-none d-sm-inline" width="30" alt="Logo">
                  <img src="@/assets/logo-crossref.png" class="mx-2 mb-1 d-inline d-sm-none" width="20" alt="Logo">
                </h1>
                <p class="text-dark d-none d-sm-block">{{ $t("Information about DOIs and Crossref prefixes") }}</p>
                <p class="text-dark d-block d-sm-none small">{{ $t("Information about DOIs and Crossref prefixes") }}</p>
                <p>
                  <router-link to="/prefix/info" class="btn btn-lg btn-dark d-none d-sm-inline-block" >
                    {{ $t("Prefix Information") }}
                  </router-link>
                  <router-link to="/prefix/info" class="btn btn-sm btn-dark d-inline-block d-sm-none" >
                    {{ $t("Prefix Information") }}
                  </router-link>
                </p>
              </div>
            </div>
          </div>

        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>

    <div class="container text-center">

      <!-- Four Column Section Start -->

      <div class="row mt-5">
        <div class="col-lg-4 col-md-6 col-sm-12 mb-5">
          <router-link to="/prefix/info">
            <div class="d-flex justify-content-center align-items-center mb-4">
              <div class="circle-yellow">
                <span><i class="bi bi-clipboard-data text-light d-none d-md-inline" style="font-size: 3rem;"></i></span>
                <span><i class="bi bi-clipboard-data text-light d-inline d-md-none" style="font-size: 2rem;"></i></span>
              </div>
            </div>
          </router-link>
          <h4 class="text-center text-md-start">{{ $t("Prefix: Member Information") }}</h4>
          <p class="text-secondary" style="text-align: justify;">{{$t("Prefix: Member Information Description")}}</p>
        </div>
        <div class="col-lg-4 col-md-6 col-sm-12 mb-5">
          <router-link to="/prefix/dois">
          <div class="d-flex justify-content-center align-items-center mb-4">
            <div class="circle-dark">
              <span><i class="bi bi-list-check text-light d-none d-md-inline" style="font-size: 3rem;"></i></span>
              <span><i class="bi bi-list-check text-light d-inline d-md-none" style="font-size: 2rem;"></i></span>
            </div>
          </div>
          </router-link>
          <h4 class="text-center text-md-start">{{ $t("Prefix: DOI List") }}</h4>
          <p class="text-secondary" style="text-align: justify;">{{ $t("Prefix: DOI List Description") }}</p>
        </div>
        <div class="col-lg-4 col-md-6 col-sm-12 mb-5">
          <router-link to="/prefix/dois">
          <div class="d-flex justify-content-center align-items-center mb-4">
            <div class="circle-yellow">
              <span><i class="bi bi-filetype-csv text-light d-none d-md-inline" style="font-size: 3rem;"></i></span>
              <span><i class="bi bi-filetype-csv text-light d-inline d-md-none" style="font-size: 2rem;"></i></span>
            </div>
          </div>
          </router-link>
          <h4 class="text-center text-md-start">{{ $t("Prefix: DOI List (CSV file)") }}</h4>
          <p class="text-secondary" style="text-align: justify; white-space: pre-wrap;">{{ $t("Prefix: DOI List (CSV file) Description") }}</p>
        </div>
        <div class="col-lg-4 col-md-6 col-sm-12 mb-5">
          <router-link to="/prefix/referenced/dois">
            <div class="d-flex justify-content-center align-items-center mb-4">
              <div class="circle-dark">
                <span><i class="bi bi-graph-up-arrow text-light d-none d-md-inline" style="font-size: 3rem;"></i></span>
                <span><i class="bi bi-graph-up-arrow text-light d-inline d-md-none" style="font-size: 2rem;"></i></span>
              </div>
            </div>
          </router-link>
          <h4 class="text-center text-md-start">{{ $t("Prefix: DOIs and ORCIDs") }}</h4>
          <p class="text-secondary" style="text-align: justify; white-space: pre-wrap;">{{ $t("Prefix: DOIs and ORCIDs Description") }}</p>
        </div>
        <div class="col-lg-4 col-md-6 col-sm-12 mb-5">
          <router-link to="/members">
          <div class="d-flex justify-content-center align-items-center mb-4">
            <div class="circle-yellow">
              <span><i class="bi bi-person-bounding-box text-light d-none d-md-inline" style="font-size: 3rem;"></i></span>
              <span><i class="bi bi-person-bounding-box text-light d-inline d-md-none" style="font-size: 2rem;"></i></span>
            </div>
          </div>
          </router-link>
          <h4 class="text-center text-md-start">{{ $t("Member Search") }}</h4>
          <p class="text-secondary" style="text-align: justify;">{{ $t("Member Search Description") }}</p>
        </div>
        <div class="col-lg-4 col-md-6 col-sm-12 mb-5">
          <router-link to="/doi">
            <div class="d-flex justify-content-center align-items-center mb-4">
              <div class="circle-dark">
                <span><i class="bi bi-search text-light d-none d-md-inline" style="font-size: 3rem;"></i></span>
                <span><i class="bi bi-search text-light d-inline d-md-none" style="font-size: 2rem;"></i></span>
              </div>
            </div>
          </router-link>
          <h4 class="text-center text-md-start">{{ $t("DOI Search") }}</h4>
          <p class="text-secondary" style="text-align: justify;">{{ $t("DOI Search Description") }}</p>
        </div>

      </div>

      <!-- Fixed Background Start -->
      <div id="fixed"></div>


    </div>

  </div>
</template>

<script>

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<style scoped>
.circle-yellow {
  width: 100px; /* Elige el tamaño que desees */
  height: 100px; /* Elige el tamaño que desees */
  background-color: #fcb520;
  border-radius: 50%; /* Esto hace que la forma sea redonda */
  display: flex;
  justify-content: center;
  align-items: center;
}

@media (max-width: 767.98px) {
  .circle-yellow {
    width: 70px;
    height: 70px;
  }
}

.circle-dark {
  width: 100px; /* Elige el tamaño que desees */
  height: 100px; /* Elige el tamaño que desees */
  background-color: #000000;
  border-radius: 50%; /* Esto hace que la forma sea redonda */
  display: flex;
  justify-content: center;
  align-items: center;
}

@media (max-width: 767.98px) {
  .circle-dark {
    width: 70px;
    height: 70px;
  }
}

.img-repeat {
  object-fit: cover;
  object-position: center center;
}

</style>
