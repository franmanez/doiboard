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

            <img src="@/assets/background1.png" alt="UPC" class="w-100 img-repeat" style="height: 400px;">

            <div class="container">
              <div class="carousel-caption">
                <h1>
                  DOIBoard <span style="color: #4f5858; font-weight: bold;">Crossref</span>
                  <img src="@/assets/logo-crossref.png" class="mx-3 mb-2" width="30" alt="Logo">
                </h1>
                <p>Information about DOIs and CrossRef prefixes.</p>
                <p>
                  <router-link to="/doi" class="btn btn-lg btn-dark" >
                    DOI Search
                  </router-link>
                </p>
              </div>
            </div>
          </div>
          <div class="carousel-item">

            <img src="@/assets/background3.jpg" alt="UPC" class="w-100 img-repeat" style="height: 400px;">


            <div class="container">
              <div class="carousel-caption">
                <h1>
                  DOIBoard <span style="color: #4f5858; font-weight: bold;">Crossref</span>
                  <img src="@/assets/logo-crossref.png" class="mx-3 mb-2" width="30" alt="Logo">
                </h1>
                <p class="text-dark">Information about DOIs and CrossRef prefixes.</p>
                <p>
                  <router-link to="/prefix/info" class="btn btn-lg btn-dark" >
                    Prefix Information
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
        <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12 mb-5">
          <div class="d-flex justify-content-center align-items-center mb-4">
            <div class="circle-yellow">
              <span><i class="bi bi-clipboard-data text-light" style="font-size: 3rem;"></i></span>
            </div>
          </div>
          <h4>Prefix: Member Information</h4>
          <p class="text-secondary" style="text-align: justify;">From a DOI prefix (e.g., 10.5821), it retrieves the total number of registered DOIs by that institution, as well as the number of DOIs by document type. Additionally, for each document type, you can view the metadata coverage and graphs based on publication date and first deposit date</p>
        </div>
        <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12 mx-0">
          <div class="d-flex justify-content-center align-items-center mb-4">
            <div class="circle-dark">
              <span><i class="bi bi-list-check text-light" style="font-size: 3rem;"></i></span>
            </div>
          </div>
          <h4>Prefix: DOI List</h4>
          <p class="text-secondary" style="text-align: justify;">It retrieves a paginated list with the information (title, DOI, deposit date, and document type) of all DOIs for a given prefix. It allows for filtering through a free-form search query, date and document type.</p>
        </div>
        <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12 ">
          <div class="d-flex justify-content-center align-items-center mb-4">
            <div class="circle-yellow">
              <span><i class="bi bi-filetype-csv text-light" style="font-size: 3rem;"></i></span>
            </div>
          </div>
          <h4>Prefix: DOI List (CSV file)</h4>
          <p class="text-secondary" style="text-align: justify;">Download CSV file with the results of the query. <br>CSV file: DOI, URL, document type, first deposited date, last deposited date and title.</p>
        </div>
        <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
          <div class="d-flex justify-content-center align-items-center mb-4">
            <div class="circle-dark">
              <span><i class="bi bi-search text-light" style="font-size: 3rem;"></i></span>
            </div>
          </div>
          <h4>DOI Search</h4>
          <p class="text-secondary" style="text-align: justify;">It allows you to search for a DOI and retrieve the most important metadata: publisher, document type, title, authors, publication date, first deposit date, and the URL.</p>
        </div>
        <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
          <div class="d-flex justify-content-center align-items-center mb-4">
            <div class="circle-yellow">
              <span><i class="bi bi-person-bounding-box text-light" style="font-size: 3rem;"></i></span>
            </div>
          </div>
          <h4>Member Search</h4>
          <p class="text-secondary" style="text-align: justify;">Enables searching by institution name. Retrieves the institution's prefix, location, and the total number of DOIs. Displays the results in a paginated list.</p>
        </div>
        <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12 ">
          <div class="d-flex justify-content-center align-items-center mb-4">
            <div class="circle-dark">
              <span><i class="bi bi-graph-up-arrow text-light" style="font-size: 3rem;"></i></span>
            </div>
          </div>
          <h4>Prefix: DOIs and ORCIDs</h4>
          <p class="text-secondary" style="text-align: justify;">It retrieves a list of the most referenced DOIs or ORCIDs from an institution (based on the prefix). <br>- DOI: Number of times that a DOI is referenced by other Crossref DOIs. <br>- ORCID: Number of times that an ORCID is referenced by other Crossref DOIs</p>
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

.circle-dark {
  width: 100px; /* Elige el tamaño que desees */
  height: 100px; /* Elige el tamaño que desees */
  background-color: #000000;
  border-radius: 50%; /* Esto hace que la forma sea redonda */
  display: flex;
  justify-content: center;
  align-items: center;
}

.img-repeat {
  object-fit: cover;
  object-position: center center;
}

</style>
