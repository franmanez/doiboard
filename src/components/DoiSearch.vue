<template>
  <div class="align-content-center">

    <input v-model="prefix" placeholder="10.5821">
    <button @click="getPrefix">Get Prefix</button>
    <div class="alert alert-warning mt-2" v-if="Object.keys(contentPrefix) != 0">
      <div v-for="(value, index) in contentPrefix.facets" :key="value.id">
        <p>{{index}}: {{value}}</p>
      </div>
      <p><b>TOTAL: {{contentPrefix.total}}</b></p>
    </div>

    <hr>

    <input v-model="doi" placeholder="10.nnnnnn/example">
    <button @click="getDOI">Search DOI</button>
    <span class="badge bg-secondary">{{ doi }}</span>
    <div class="alert alert-success mt-2" v-if="Object.keys(contentDOI) != 0">
      <p>Title: {{contentDOI.title}}</p>
      <p>Publisher: {{contentDOI.publisher}}</p>
      <p>Register date: {{contentDOI.registerDate}}</p>
      <p>Creation date: {{contentDOI.creationDate}}</p>
      <p>Resource: {{contentDOI.resource}}</p>
      <p>Type: {{contentDOI.type}}</p>
    </div>

    <hr>

    <button type="button" class="btn btn-primary mx-2" @click="increment">Inc</button>
    <span class="badge bg-danger">{{ cont }}</span>



    <div class="alert alert-danger" v-if="error != null">{{error}}</div>

  </div>
</template>

<script>

  import http from '@/http-common'
  import {ref} from "vue";
  export default {
    name: "DoiSearch",

    setup(){

      const prefix = ref('10.5821');
      const contentPrefix = ref({})

      const doi = ref('10.5821/ace.18.52.11871');
      const contentDOI = ref({});

      const cont = ref(0)
      const error = ref(null);


      const clear = () => {
        contentPrefix.value = ''
        contentDOI.value = ''
        error.value = null
        increment()
      }
      const increment = () => {
        cont.value = cont.value + 1
      }

      const getPrefix = async () => {
        clear()
        try {
          const response = await http.get('/prefixes/'+prefix.value+'/works?facet=type-name:*&rows=0')
          //const responseJson = await response.data

          contentPrefix.value = {
            'status': response.data.status,
            'total': response.data.message['total-results'],
            'facets': response.data.message.facets['type-name'].values
          }

          /*for(let key in contentPrefix.value.facets) {
            console.log("name: " + key + ", value: "+ contentPrefix.value.facets[key]);
          }*/

        } catch (e) {
          error.value = 'Request ERROR: ' + e.message;
        }
      }

      const getDOI = async () => {
        clear()
        try {
          const response = await http.get('/works/'+doi.value)
          if (response.status === 200) {

            contentDOI.value = {
              'title': response.data.message.title[0],
              'publisher': response.data.message.publisher,
              'registerDate': response.data.message.deposited['date-time'],
              'creationDate': response.data.message.created['date-time'],
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

      //getWorks()

      return{
        contentPrefix,
        contentDOI,
        cont,
        increment,
        prefix,
        getPrefix,
        getDOI,
        doi,
        error,
      }

    }


  }

</script>

<style scoped>


</style>
