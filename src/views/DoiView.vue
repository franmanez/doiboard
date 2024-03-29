<template>

  <div class="mt-5">

    <LoadingComponent :is-loading="isLoading"></LoadingComponent>

    <div class="container mb-5">
      <div class="row mb-2 mt-3">
        <h4 class="mb-3">{{ $t("DOI Search") }}</h4>
        <div class="input-group">
          <input type="text" class="form-control form-control-lg rounded-0" v-model="doi" @keyup.enter="getDOI" placeholder="10.nnnnnn/example">
          <button class="btn btn-lg btn-warning rounded-0" type="button" @click="getDOI">{{ $t("Search") }}</button>
        </div>
      </div>
    </div>


    <div class="container" v-if="Object.keys(contentDOI) != 0">

      <div class="row d-flex justify-content-center align-items-center">
        <div class="col col-lg-12 mb-4">
          <div class="card mb-3 rounded-0">
            <div class="row g-0">
              <div class="col-md-1 bg-doi-green text-center text-white">
                <div class="d-flex justify-content-center align-items-center text-nowrap h2" style="height: 100%; width: 100%;">
                  <span class="m-0 d-none d-lg-table-cell" style="writing-mode: vertical-rl; transform: rotate(180deg);">
                    {{ $t("DOI Information") }}
                  </span>
                </div>

              </div>
              <div class="col-md-11">
                <div class="card-body p-4">

                  <div class="d-flex justify-content-between">
                    <div class="me-5"><h3 class="text-secondary">{{contentDOI.publisher}}</h3></div>
                    <div><h4><p class="badge bg-doi-green">{{contentDOI.type}}</p></h4></div>
                  </div>


                  <hr class="mt-0 mb-4">

                  <div class="row pt-1">
                    <div class="col-12 mb-3">
                      <h5>{{ $t("Title") }}</h5>
                      <p class="text-secondary">{{contentDOI.title}}</p>
                    </div>
                  </div>



                  <div class="row pt-1">
                    <div class="col-6 mb-3">
                      <h5>{{ $t("Authors") }}</h5>
                      <div class="text-secondary mb-1"  v-for="(author, index) in contentDOI.author" :key="index">

                        <div v-if="author.family" class="mx-0">
                          <i class="bi bi-person-fill text-secondary me-1"></i>
                          <span class="text-secondary">
                              {{author.family}}, {{author.given}}
                              <a v-if="author.ORCID" :href="author.ORCID"><img src="@/assets/logo-orcid-mini.png" height="18" alt="ORCID"></a>
                            </span>
                        </div>
                      </div>
                    </div>
                    <div class="col-6 mb-3 text-end" v-if="contentDOI.referenced">
                      <h5>{{ $t("Referenced") }}</h5>
                      <p class="text-muted">{{contentDOI.referenced}}</p>
                      <div class="blockquote-footer text-success" style="font-size: 0.8em;">{{ $t("Referenced Info") }}</div>

                      <div class="text-end">
                        <a :href="'https://opencitations.net/index/search?text='+doi+'&rule=citeddoi'" target="_blank" title="OpenCitations" class="navbar-brand" >
                          <img src="@/assets/cites-opencitations.png" height="25" class="mx-1 mt-2" alt="Logo">
                        </a>

                        <a :href="'https://explore.openaire.eu/search/publication?pid='+doi" target="_blank" title="OpenAIRE" class="navbar-brand">
                          <img src="@/assets/cites-openaire.png" height="25" class="mx-2 mt-2" alt="Logo">
                        </a>

                        <a :href="'https://scholar.google.com/scholar?hl=ca&as_sdt=0%2C5&q='+doi+'&btnG='" title="Google Scholar" target="_blank" class="navbar-brand">
                          <img src="@/assets/cites-googlescholar.png" height="25" class="mx-0 mt-2" alt="Logo">
                        </a>
                      </div>
                    </div>
                  </div>

                  <hr class="mt-0 mb-4">

                  <div class="row pt-1">
                    <div class="col-4 mb-3">
                      <h5>{{ $t("Publication date") }}</h5>
                      <p class="text-muted">{{contentDOI.published}}</p>
                    </div>
                    <div class="col-4 mb-3 text-end">
                      <h5>{{ $t("First deposited date") }}</h5>
                      <p class="text-muted">{{contentDOI.created.substring(0, 10)}}</p>
                    </div>
                    <div class="col-4 mb-3 text-end">
                      <h5>{{ $t("Last deposited date") }}</h5>
                      <p class="text-muted">{{contentDOI['last-deposited'].substring(0, 10)}}</p>
                    </div>
                  </div>

                  <hr class="mt-0 mb-4">

                  <div class="d-flex justify-content-between mb-3">
                    <span style="font-size: 1.3rem;">
                      <i class="bi bi-link-45deg" ></i>
                      URL:
                      <a :href="contentDOI.resource" target="_blank" > {{contentDOI.resource}}</a>
                    </span>
                  </div>
                  <div class="d-flex justify-content-start">
                    <span style="font-size: 1.3rem;">
                      <i class="bi bi-box-arrow-in-up-right" ></i>
                      API:
                      <a :href="'https://api.crossref.org/works/'+doi" target="_blank"> https://api.crossref.org/works/{{doi}} </a>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container" v-if="Object.keys(contentPrefix) != 0">
      <hr class="mt-0 mb-4">
      <div>
      <h2>Data prefix {{doi.split("/")[0]}} </h2>
      <h3><p class="badge bg-danger">TOTAL {{contentPrefix.total}}</p></h3>
      </div>

      <div class="card-group" >

        <div v-for="(value, index, cont) in contentPrefix.facets" :key="value.id">
          <div class="card me-3 mb-3 text-center" :class="color(cont)" style="width: 17rem;">
            <div class="card-header" :class="color(cont)">
              <h4 class="font-weight-normal">{{ index }}</h4>
            </div>
            <div class="card-body">
              <h1 class="card-title">{{value}}</h1>
            </div>
          </div>
        </div>
      </div>

    </div>

    <div class="container col-12 alert alert-danger mt-4 rounded-0" v-if="error != null">{{error}}</div>

  </div>
</template>

<script>

  import http from '@/http-common';
  import {ref} from "vue";
  import LoadingComponent from "@/components/Loading.vue";
  export default {
    name: "DoiSearch",
    components: {LoadingComponent},

    setup(){
      const isLoading = ref(false)
      const contentPrefix = ref({})
      const doi = ref('10.5821/ace.v4i12.2483');
      const contentDOI = ref({});
      const error = ref(null);


      const clear = () => {
        contentDOI.value = ''
        error.value = null
      }

      const getDOI = async () => {
        isLoading.value = true
        clear()

        try {
          const response = await http.get('/works/'+doi.value.trim())
          if (response.status === 200) {

            let published = response.data.message.published['date-parts'][0]
            if(published.length === 1) published = published[0]
            else if(published.length === 2) published = published[0] + "-" + published[1]
            else if(published.length === 3) published = published[0] + "-" + published[1] + "-" + published[2]

            contentDOI.value = {
              'title': response.data.message.title[0],
              'author': response.data.message.author,
              'publisher': response.data.message.publisher,
              'published': published,
              'created': response.data.message.created['date-time'],
              'last-deposited': response.data.message.deposited['date-time'],
              'resource': response.data.message.resource.primary.URL,
              'type': response.data.message.type,
              'referenced': response.data.message['is-referenced-by-count']
            }

          } else {
            error.value = '404 Not Found';
          }
        } catch (e) {
          error.value = 'ERROR: DOI does not exists';
        }
        isLoading.value = false
      }

      return{
        contentPrefix,
        contentDOI,
        getDOI,
        doi,
        isLoading,
        error,
      }

    }


  }

</script>

<style scoped>

p {
  font-size: 1.2rem;
}


</style>
