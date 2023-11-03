<template>

  <div>

    <LoadingComponent :is-loading="isLoading"></LoadingComponent>

    <PrefixHeader title="DOI List" v-model:prefix="prefix" :search="search"></PrefixHeader>

    <div class="container"  v-if="content !== null">

      <div class="row mb-2">
        <div class="col-12">

          <div class="row mb-5">

            <div class="col-md-12">
              <div class="input-group">
                <input type="text" class="form-control form-control-lg rounded-0" v-model="query" id="query" aria-describedby="queryHelp">
                <button class="btn btn-lg btn-dark rounded-0" type="button" @click="search">Filter</button>
              </div>
              <div id="queryHelp" class="form-text text-secondary"><b>Free form search queries</b> can be made, for example, works that include <b>architecture</b> or <b>Fran</b> (or both)</div>
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
import LoadingComponent from "@/components/Loading.vue";
import PrefixHeader from "@/views/PrefixHeader.vue";

export default {
    name: "PrefixDois",

    components: {
      PrefixHeader,
      LoadingComponent,
      PaginationTable,
      TableList
    },

    setup(){
      const store = useStore()
      const isLoading = ref(false)

      const content = ref(null)
      const prefix = ref(store.getters.prefix);

      const query = ref('')

      const currentPage = ref(1)
      const pageSize = computed(() => { return store.getters.pageSize})
      const memberName = computed(() => { return store.getters.memberName})
      const prefixStore = computed(() => { return store.getters.prefix})
      const totalElements = ref(0)

      const cont = ref(0)
      const error = ref(null);


      const handleSizeChange = (size) => {
        store.commit('setPageSize', size)
        currentPage.value = 1
        search()
        clear()

      }

      const handleCurrentChange = () => {
        search()
      }


      onMounted(async () => {
        await search()
      });

      const clear = () => {
        content.value = ''
        error.value = null
      }


      const search = async () => {
        isLoading.value = true
        if(prefix.value !== store.getters.prefix){
          await CrossrefService.memberInfo(prefix.value)
        }
        store.commit('setPrefix', prefix.value)
        //let result = await CrossrefService.getDois(prefix.value, (currentPage.value-1)*store.getters.pageSize, store.getters.pageSize, query.value)
        let result = await CrossrefService.getDois(prefixStore.value, (currentPage.value-1)*store.getters.pageSize, store.getters.pageSize, query.value)
        content.value = result.items
        totalElements.value = result['total-results']
        isLoading.value = false
      }


      return{
        content,
        cont,
        query,
        prefix,
        error,
        currentPage,
        pageSize,
        totalElements,
        memberName,
        prefixStore,
        isLoading,
        search,
        handleSizeChange,
        handleCurrentChange,
      }

    }


  }

</script>

<style scoped>







</style>
