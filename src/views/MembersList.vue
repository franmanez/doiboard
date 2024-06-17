<template>

  <div class="mt-5">

    <LoadingComponent :is-loading="isLoading"></LoadingComponent>

    <div class="container">

      <div class="row mb-2">
        <div class="col-12">

          <div class="row mb-5">

            <div class="col-md-12">
              <h4 class="mb-3">{{ $t("Members list") }}</h4>
              <div class="input-group">
                <input type="text" class="form-control form-control-lg rounded-0" v-model="query" id="query" aria-describedby="queryHelp" @keyup.enter="search">
                <button class="btn btn-lg btn-dark rounded-0" type="button" @click="search">Search</button>
              </div>
              <div id="queryHelp" class="form-text text-secondary">{{ $t("Members list Info") }}</div>
            </div>

          </div>


          <div v-if="content !== ''">
            <PaginationTable
                class="container"
                :show-pagination="true"
                v-model:current-page="currentPage"
                v-model:page-size="pageSize"
                :total="totalElements"
                :handle-size-change="handleSizeChange"
                :handle-current-change="handleCurrentChange">
            </PaginationTable>

            <!--TableList :content="content"></TableList-->

            <div class="list-group list-group-flush mt-3">
              <div v-for="(item, index) in content" :key="index" class="list-group-item list-group-item-action flex-column align-items-start">

                <div class="mt-2 mb-2 row">
                  <div class="col-md-8">

                    <div>
                      <div class="mb-1 text-secondary" >
                        <span class="h5">{{ (item['primary-name']) }} </span>
                      </div>

                      <div class="text-secondary mb-1" v-if="item.location">
                        <span class="h6 text-dark">{{ $t("Location") }}: </span> {{ item.location  }}
                      </div>

                      <div class="row pt-1">
                        <div class="col-12 mb-3">
                          <h6>{{ $t("DOI Prefixes") }}</h6>
                          <div class="text-secondary mb-1 me-5"  v-for="(prefix, index) in item.prefix" :key="index">
                            <img src="@/assets/doi-logo.png" width="20" class="me-1" alt="doi">
                            <span class="text-secondary">
                              {{prefix.value}} <!--({{prefix.name}})-->
                            </span>
                          </div>
                        </div>
                      </div>



                      <div class="mt-1 text-dark badge bg-warning" v-if="item.type">
                        {{(item.type)}}
                      </div>

                    </div>

                  </div>

                  <div class="col-md-4">




                    <div class="row mb-2">
                      <div class="col-md-6">
                        <div class="text-dark badge bg-warning">
                          TOTAL DOIs
                        </div>
                      </div>
                      <div class="col-md-6">
                          {{(Object.values(item['counts-type'].all).reduce((count, value) => count + value, 0)).toLocaleString()}}
                      </div>
                    </div>



                    <div class="text-secondary small mb-1"  v-for="(count, documentType) in item['counts-type'].all" :key="documentType">
                      <div class="row">
                        <div class="col-md-6">
                          {{documentType}}
                        </div>
                        <div class="col-md-6">
                          {{count.toLocaleString()}}
                        </div>
                      </div>
                    </div>
                  </div>

                  <!--div class="col-md-1 col-xs-12 d-none d-lg-block" >
                    <div class="mt-1 text-dark badge bg-warning" v-if="item.type">
                      {{(item.type)}}
                    </div>
                  </div-->

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>



    </div>


    <div class="container col-12 alert alert-danger mt-4 rounded-0" v-if="error != null">{{error}}</div>

  </div>
</template>

<script>

import CrossrefService from '@/service/CrossrefService';
import PaginationTable from "@/components/PaginationTable.vue"
import {computed, onMounted, ref} from "vue";
import { useStore } from 'vuex'
import LoadingComponent from "@/components/Loading.vue";

export default {
    name: "PrefixDois",

    components: {
      LoadingComponent,
      PaginationTable,
    },

    setup(){
      const store = useStore()
      const isLoading = ref(false)
      const total = ref(0)

      const content = ref('')
      const prefix = ref(store.getters.prefix);

      const query = ref('')

      const currentPage = ref(1)
      const pageSize = computed(() => { return store.getters.pageSize})
      const memberName = computed(() => { return store.getters.memberName})
      const prefixStore = computed(() => { return store.getters.prefix})
      const totalElements = ref(0)

      const cont = ref(0)
      const error = ref(null);

      // Método para calcular el valor total
      const getTotalCount = (counts) => {
        total.value = counts.reduce((total, count) => total + count, 0);
        return total.value;
      };

      const handleSizeChange = (size) => {
        store.commit('setPageSize', size)
        currentPage.value = 1
        search()
        //clear()

      }

      const handleCurrentChange = () => {
        search()
      }


      onMounted(async () => {
        //await search()
      });

      const clear = () => {
        content.value = ''
        store.commit('setPrefix', '')
      }

      const search = async () => {
        error.value = null
        isLoading.value = true

        try{
          let result = await CrossrefService.getMembers((currentPage.value-1)*store.getters.pageSize, store.getters.pageSize, query.value)
          content.value = result.items
          totalElements.value = result['total-results']
        } catch (e) {
          clear()
          error.value = "ERROR: Prefix does not exists";
        }

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
        getTotalCount
      }

    }


  }

</script>

<style scoped>

.list-group .list-group-item:nth-child(odd) {
  background-color: #f5f5f5;
}

.list-group .list-group-item:nth-child(even) {
  background-color: #ffffff;
}

</style>
