<template>

  <div>



    <div class="container mb-5" >
      <div class="row col-12">

        <div class="col-10 mt-3">
          <input class="form-control form-control-lg rounded-0" v-model="prefix" placeholder="10.nnnnnn">

        </div>
        <div class="col-2 mt-3">
          <button type="button" class="btn btn-warning btn-lg rounded-0 form-control" @click="getDois">Search Prefix</button>
        </div>
      </div>
    </div>

    <div class="container"  v-if="content !== null">

      <div class="row col-12">

        <h1>{{memberName}} </h1>
        <hr class="mt-0 mb-4 bg-secondary" style="height:3px; border:none;" />

        <div class="row mb-5">

          <div class="col-md-10">
            <label for="query" class="form-label">Free form search</label>
            <input type="text" class="form-control rounded-0" v-model="query" id="query" aria-describedby="queryHelp" >
            <div id="queryHelp" class="form-text text-secondary"><b>Free form search queries</b> can be made, for example, works that include <b>architecture</b> or <b>Fran</b> (or both)</div>

          </div>
          <div class="col-md-2">
            <label for="title" class="form-label">&nbsp;</label>
            <button @click="getDois" class="form-control btn btn-dark rounded-0">Filter DOIs</button>
          </div>
        </div>


        <PaginationTable
            class="container"
            :show-pagination="true"
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :total="totalElements"
            :handle-size-change="handleSizeChange"
            :handle-current-change="handleCurrentChange">
        </PaginationTable>

        <TableList :content="content"></TableList>



      </div>


    </div>


    <div class="alert alert-danger mt-4" v-if="error != null">{{error}}</div>

  </div>
</template>

<script>

import CrossrefService from '@/service/CrossrefService';
import PaginationTable from "@/components/PaginationTable.vue"
import TableList from "@/components/TableList.vue"
import {computed, onMounted, ref} from "vue";
import { useStore } from 'vuex'

export default {
    name: "DoiSearch",

    components: {
      PaginationTable,
      TableList
    },

    setup(){
      const store = useStore()

      const content = ref(null)
      const prefix = ref('10.5821');

      const query = ref('')

      const currentPage = ref(1)
      const pageSize = computed(() => { return store.getters.pageSize})
      const memberName = computed(() => { return store.getters.memberName})
      const totalElements = ref(0)

      const cont = ref(0)
      const error = ref(null);


      const handleSizeChange = (size) => {
        store.commit('setPageSize', size)
        currentPage.value = 1
        getDois()
        clear()

      }

      const handleCurrentChange = () => {
        getDois()
      }


      onMounted(async () => {

      });

      const clear = () => {
        content.value = ''
        error.value = null
      }


      const getDois = async () => {
        //clear()

        let result = await CrossrefService.getDois(prefix.value, (currentPage.value-1)*store.getters.pageSize, store.getters.pageSize, query.value)
        content.value = result.items
        totalElements.value = result['total-results']
      }


      return{
        content,
        cont,
        query,
        prefix,
        getDois,
        error,
        currentPage,
        pageSize,
        totalElements,
        handleSizeChange,
        handleCurrentChange,
        memberName
      }

    }


  }

</script>

<style scoped>







</style>
