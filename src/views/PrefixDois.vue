<template>

  <div>

    <LoadingComponent :is-loading="isLoading"></LoadingComponent>

    <PrefixHeader :title="$t('Prefix: DOI List')" v-model:prefix="prefix" :search="search"></PrefixHeader>

    <div class="container pb-4" v-if="content !== ''">
      <div class="row">
        <div class="col-12 px-4 px-md-3">
          <div class="filter-card p-4 rounded-4 shadow-sm border bg-white mb-5">
            <div class="row g-3 align-items-end">
              <!-- Dates Picker -->
              <div class="col-lg-4 col-md-6">
                <label class="text-muted ms-1 mb-2 fw-normal opacity-75" style="font-size: 0.75rem;">{{ $t("First deposited date") }}</label>
                <el-date-picker
                    v-model="dates"
                    type="daterange"
                    unlink-panels
                    range-separator="To"
                    :start-placeholder="$t('Start deposited date')"
                    :end-placeholder="$t('End deposited date')"
                    :disabled-date="disabledFutureDates"
                    :shortcuts="shortcuts"
                    size="large"
                    class="modern-picker w-100 shadow-sm border border-light-subtle"
                />
              </div>

              <!-- Document Type -->
              <div class="col-lg-2 col-md-4">
                <label class="text-muted ms-1 mb-2 fw-normal opacity-75" style="font-size: 0.75rem;">{{ $t("Document Type") }}</label>
                <el-select v-model="type" filterable placeholder="Select type" size="large" @keyup.enter="search" class="modern-select w-100 shadow-sm">
                  <el-option :label="$t('Document Type All')" value=""></el-option>
                  <el-option
                      v-for="item in types"
                      :key="item.id"
                      :label="item.label"
                      :value="item.id"
                  />
                </el-select>
              </div>

              <!-- Free text search -->
              <div class="col-lg-5 col-md-8">
                <label class="text-muted ms-1 mb-2 fw-normal opacity-75" style="font-size: 0.75rem;">
                   {{ $t("Free form search") }} 
                </label>
                <div class="input-group input-group-lg shadow-sm rounded-3">
                  <input type="text" class="form-control border-light-subtle" v-model="query" id="query" @keyup.enter="search" style="font-size: 1rem;" placeholder="Search term...">
                </div>
              </div>

              <!-- Filter Button -->
              <div class="col-lg-1 col-md-3 text-end">
                <button class="btn btn-warning btn-lg w-100 rounded-3 shadow-sm border-0 fw-bold" type="button" @click="search">
                  <i class="bi bi-filter"></i>
                </button>
              </div>
            </div>
          </div>

          <div class="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">
            <div class="pagination-wrapper mb-3 mb-md-0">
              <PaginationTable
                  :show-pagination="true"
                  v-model:current-page="currentPage"
                  v-model:page-size="pageSize"
                  :total="totalElements"
                  :handle-size-change="handleSizeChange"
                  :handle-current-change="handleCurrentChange">
              </PaginationTable>
            </div>
          </div>

          <TableList :content="content"></TableList>

        </div>
      </div>
    </div>

    <div class="container col-12 alert alert-danger mt-4 rounded-3 shadow-sm border-0" v-if="error != null">
      <i class="bi bi-exclamation-triangle me-2"></i>{{error}}
    </div>

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
//import CsvDownload from "@/components/CsvDownload.vue";

export default {
    name: "PrefixDois",

    components: {
      //CsvDownload,
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
        
        // Eliminar espacios en blanco al principio y al final
        prefix.value = prefix.value.trim()
        query.value = query.value.trim()

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
          if(prefixStore.value !== ''){
            let result = await CrossrefService.getDois(prefixStore.value, (currentPage.value-1)*store.getters.pageSize, store.getters.pageSize, query.value, dates.value, type.value)
            content.value = result.items
            totalElements.value = result['total-results']
          }
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
:deep(.el-range-editor.el-input__wrapper) {
  border: 1px solid #dee2e6 !important;
  box-shadow: none !important;
}

:deep(.el-select .el-input__wrapper) {
  border: 1px solid #dee2e6 !important;
  box-shadow: none !important;
}

:deep(.el-range-editor.is-active), :deep(.el-select .el-input__wrapper.is-focus) {
  border-color: #ffd145 !important;
}
</style>
