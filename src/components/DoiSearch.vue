<template>
  <div>
    {{ content }}
  </div>
</template>

<script>

  import http from '@/http-common'
  import {ref} from "vue";
  export default {
    name: "DoiSearch",

    setup(){

      const content = ref({})

      const getWorks = async () => {
        const response = await http.get('/10.5821/works')
        //const response = await http.get('/solrClient/execute?query=q=*:*'+filter.value+'??rows='+store.getters.pageSize+'??start='+currentPage)
        const responseJson = await response.data


        content.value = responseJson

        content.value = {
          'status': responseJson.status,
          'total ': responseJson.message['total-results'],
        }




      }

      getWorks()

      return{
        content
      }

    }


  }

</script>

<style scoped>

</style>