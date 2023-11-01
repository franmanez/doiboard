<template>

  <div>

    <div class="container mb-5">
      <div class="row mb-2 mt-3">
        <h4 class="mb-3">DOI search</h4>
        <div class="input-group">
          <input type="text" class="form-control form-control-lg rounded-0" v-model="doi" placeholder="10.nnnnnn">
          <button class="btn btn-lg btn-warning rounded-0" type="button" @click="getDOI">Search</button>
        </div>
      </div>
    </div>


    <div class="container" v-if="Object.keys(contentDOI) != 0">

      <div class="row d-flex justify-content-center align-items-center">
        <div class="col col-lg-12 mb-4">
          <div class="card mb-3 rounded-0">
            <div class="row g-0">
              <div class="col-md-2 gradient-custom text-center text-white">
                <img src="../assets/doi-logo.png" alt="Avatar" class="img-fluid my-5" style="width: 80px;" />
              </div>
              <div class="col-md-10">
                <div class="card-body p-4">
                  <h5><p class="text-dark badge bg-warning">{{contentDOI.type}}</p></h5>
                  <hr class="mt-0 mb-4">
                  <div class="row pt-1">
                    <div class="col-12 mb-3">
                      <h6>Title</h6>
                      <p class="text-muted">{{contentDOI.title}}</p>
                    </div>

                    <div class="row pt-1">
                      <div class="col-12 mb-3">
                        <h6>Publisher</h6>
                        <p class="text-muted">{{contentDOI.publisher}}</p>
                      </div>

                    </div>
                  </div>
                  <hr class="mt-0 mb-4">
                  <div class="row pt-1">
                    <div class="col-6 mb-3">
                      <h6>Publication date</h6>
                      <p class="text-muted">{{contentDOI.published}}</p>
                    </div>
                    <div class="col-6 mb-3 text-end">
                      <h6>First deposited date</h6>
                      <p class="text-muted">{{contentDOI.created.substring(0, 10)}}</p>
                    </div>
                  </div>
                  <hr class="mt-0 mb-4">
                  <div class="d-flex justify-content-start">
                    <a :href="contentDOI.resource" target="_blank" style="font-size: 1.3rem;"><i class="bi bi-link-45deg" ></i> {{contentDOI.resource}}</a>
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


    <div class="alert alert-danger mt-4" v-if="error != null">{{error}}</div>

  </div>
</template>

<script>

  import http from '@/http-common';
  import {ref} from "vue";
  export default {
    name: "DoiSearch",

    setup(){

      const contentPrefix = ref({})

      const doi = ref('10.5821/ace.18.52.11871');
      const contentDOI = ref({});

      const cont = ref(0)



      const error = ref(null);


      const clear = () => {
        contentDOI.value = ''
        error.value = null
        increment()
      }
      const increment = () => {
        cont.value = cont.value + 1
      }



      const getDOI = async () => {
        clear()
        //let prefix = doi.value.split("/")[0]

        try {
          const response = await http.get('/works/'+doi.value)
          if (response.status === 200) {

            let published = response.data.message.published['date-parts'][0]
            if(published.length === 1) published = published[0]
            else if(published.length === 2) published = published[0] + "-" + published[1]
            else if(published.length === 3) published = published[0] + "-" + published[1] + "-" + published[2]

            contentDOI.value = {
              'title': response.data.message.title[0],
              'publisher': response.data.message.publisher,
              'published': published,
              'created': response.data.message.created['date-time'],
              'resource': response.data.message.resource.primary.URL,
              'type': response.data.message.type
            }

          } else {
            error.value = '404 Not Found';
          }
        } catch (e) {
          error.value = 'Request ERROR: ' + e.message;
        }

      }











      return{
        contentPrefix,
        contentDOI,
        cont,
        increment,
        getDOI,
        doi,
        error,
      }

    }


  }

</script>

<style scoped>

.gradient-custom {
  /* fallback for old browsers */
  background: #ffc72c;

  /* Chrome 10-25, Safari 5.1-6 */
  background: -webkit-linear-gradient(to right bottom, rgb(1, 118, 152), rgb(1, 118, 152));

  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  background: linear-gradient(to right bottom, rgb(1, 118, 152), rgb(1, 118, 152))
}

</style>
