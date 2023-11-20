<template>

  <div>

    <LoadingComponent :is-loading="isLoading"></LoadingComponent>

    <PrefixHeader title="DOI List" v-model:prefix="prefix" :search="search"></PrefixHeader>

    <div class="container"  v-if="content !== ''">

      <div class="row mb-2">
        <div class="col-12">

          <div class="row mb-5">

            <div class="col-md-4">
                <el-date-picker
                    v-model="dates"
                    type="daterange"
                    unlink-panels
                    range-separator="To"
                    start-placeholder="Start deposited date"
                    end-placeholder="End deposited date"
                    :disabled-date="disabledFutureDates"
                    :shortcuts="shortcuts"
                    size="large"
                />
            </div>


            <div class="col-md-2">
              <el-select v-model="type" filterable placeholder="Document type" size="large" @keyup.enter="search">
                <el-option
                    v-for="item in types"
                    :key="item.id"
                    :label="item.label"
                    :value="item.id"
                />
              </el-select>
            </div>


            <div class="col-md-5">
              <div class="input-group">
                <input type="text" class="form-control rounded-1" v-model="query" id="query" aria-describedby="queryHelp" @keyup.enter="search">
              </div>
              <div id="queryHelp" class="form-text text-secondary"><b>Free form search queries</b> Ex: works that include <b>architecture</b> or <b>Fran</b> (or both)</div>
            </div>

            <div class="col-md-1">
              <button class="btn btn-dark rounded-1" type="button" @click="search">Filter</button>
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


    <div class="container col-12 alert alert-danger mt-4 rounded-0" v-if="error != null">{{error}}</div>

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

      const content = ref('')
      const prefix = ref(store.getters.prefix);

      const query = ref('')
      const type = ref('')
      const types = ref('')

      const currentPage = ref(1)
      const pageSize = computed(() => { return store.getters.pageSize})
      const memberName = computed(() => { return store.getters.memberName})
      const prefixStore = computed(() => { return store.getters.prefix})
      const totalElements = ref(0)

      const cont = ref(0)
      const error = ref(null);

      const dates = ref('')
      const shortcuts = [
        {
          text: 'Today',
          value: () => {
            const end = new Date()
            const start = new Date()
            return [start, end]
          },
        },
        {
          text: 'Yesterday',
          value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24)
            end.setTime(end.getTime() - 3600 * 1000 * 24)
            return [start, end]
          },
        },
        {
          text: 'Last week',
          value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            return [start, end]
          },
        },
        {
          text: 'Last month',
          value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            return [start, end]
          },
        },
        {
          text: 'Last 3 months',
          value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            return [start, end]
          },
        },
      ]


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
        await search()
        types.value = await CrossrefService.getTypes()
      });

      const clear = () => {
        content.value = ''
        store.commit('setPrefix', '')
      }

      const search = async () => {
        error.value = null
        isLoading.value = true
        if(prefix.value !== store.getters.prefix){
          try{
            await CrossrefService.memberInfo(prefix.value)
            store.commit('setPrefix', prefix.value)
          } catch (e) {
            clear()
            error.value = "ERROR: Prefix does not exists";
          }
        }


        try{
          let result = await CrossrefService.getDois(prefixStore.value, (currentPage.value-1)*store.getters.pageSize, store.getters.pageSize, query.value, dates.value, type.value)
          content.value = result.items
          totalElements.value = result['total-results']
        } catch (e) {
          clear()
          error.value = "ERROR: Prefix does not exists";
        }


        isLoading.value = false
      }

      const disabledFutureDates = (selected) => {
        // Obtén la fecha actual
        const today = new Date();

        // Convierte la fecha actual a las 00:00:00 para comparar solo las fechas
        const todayWithoutTime = new Date(today.getFullYear(), today.getMonth(), today.getDate());

        // Compara si la fecha seleccionada es posterior al día actual
        return selected.getTime() > todayWithoutTime.getTime();
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
        types,
        type,
        search,
        handleSizeChange,
        handleCurrentChange,
        shortcuts,
        dates,
        disabledFutureDates
      }

    }


  }

</script>

<style scoped>







</style>
