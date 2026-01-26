<template>

  <div class="mt-5">

    <LoadingComponent :is-loading="isLoading"></LoadingComponent>

    <div class="container mb-5 pt-3">
      <div class="row">
        <div class="col-12 px-4 px-md-3">
          <h4 class="mb-4 fw-bold"><i class="bi bi-people-fill me-2 text-warning"></i>{{ $t("Members list") }}</h4>
          
          <div class="input-group input-group-lg shadow-sm search-container overflow-hidden rounded-3">
            <input 
              type="text" 
              class="form-control border-light-subtle ps-4 px-3 py-3" 
              v-model="query" 
              id="query" 
              @keyup.enter="search"
              style="font-size: 1.1rem;"
              placeholder="Institutional name..."
            >
            <button class="btn btn-warning px-4 fw-bold" type="button" @click="search">
              <i class="bi bi-search me-2"></i>
              <span class="d-none d-sm-inline">{{ $t("Search") }}</span>
            </button>
          </div>
          <div class="form-text text-muted ms-1 mb-5" style="font-size: 0.75rem;">{{ $t("Members list Info") }}</div>

          <div v-if="content !== ''" class="mt-4">
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

            <div class="card border border-secondary-subtle shadow-sm rounded-4 overflow-hidden mb-5 mt-3">
              <div v-for="(item, index) in content" :key="index" class="modern-row p-4 border-bottom transition-all">
                <div class="row align-items-start">
                  <!-- Main Content -->
                  <div class="col-12 col-lg-9 mb-3 mb-lg-0">
                    <div class="pe-lg-4">
                      <!-- Institution -->
                      <div class="mb-3">
                        <router-link :to="{ name: 'prefixInfo', query: { id: item.prefix[0]?.value }}" class="text-decoration-none h5 text-dark mb-1 fw-bold d-block hover-primary transition-all">
                          {{ (item['primary-name']) }}
                        </router-link>
                        <div v-if="item.location" class="text-muted small mt-1 d-flex align-items-center">
                          <i class="bi bi-geo-alt me-1"></i> {{ item.location }}
                        </div>
                      </div>

                      <!-- Prefixes -->
                      <div class="mt-3">
                        <div class="text-muted small mb-2 opacity-75" style="font-size: 0.7rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">{{ $t("DOI Prefixes") }}</div>
                        <div class="d-flex flex-wrap gap-2">
                          <router-link v-for="(prefix, idx) in item.prefix" :key="idx" 
                            :to="{ name: 'prefixInfo', query: { id: prefix.value }}"
                            class="badge bg-white text-dark border rounded-pill px-3 py-2 fw-medium text-decoration-none hover-warning shadow-xs transition-all">
                            <img src="@/assets/doi-logo.png" width="14" class="me-1 opacity-75" alt="doi">
                            {{prefix.value}}
                          </router-link>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Metrics Side -->
                  <div class="col-12 col-lg-3 border-start-lg ps-lg-4">
                    <div class="metrics-container">
                      <div class="total-badge d-flex justify-content-between align-items-center p-3 rounded-3 bg-warning shadow-sm mb-3">
                        <span class="text-dark small fw-bold text-uppercase" style="font-size: 0.65rem;">Total DOIs</span>
                        <span class="h4 fw-bold text-dark mb-0">
                          {{(Object.values(item['counts-type'].all).reduce((count, value) => count + value, 0)).toLocaleString()}}
                        </span>
                      </div>

                      <div class="metrics-list">
                        <div class="type-metric d-flex justify-content-between py-1 small border-bottom border-light-subtle opacity-75" v-for="(count, documentType) in item['counts-type'].all" :key="documentType">
                          <span class="text-truncate me-2 text-dark">{{documentType}}</span>
                          <span class="fw-bold text-dark">{{count.toLocaleString()}}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container col-12 alert alert-danger mt-4 rounded-3 shadow-sm border border-danger-subtle" v-if="error != null">
      <i class="bi bi-exclamation-triangle-fill me-2"></i>{{error}}
    </div>

  </div>
</template>

<script>

import CrossrefService from '@/service/CrossrefService';
import PaginationTable from "@/components/PaginationTable.vue"
import {computed, onMounted, ref, nextTick} from "vue";
import { useStore } from 'vuex'
import LoadingComponent from "@/components/Loading.vue";

export default {
    name: "MembersList",

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
        
        // Eliminar espacios en blanco al principio y al final
        query.value = query.value.trim()

        try{
          let result = await CrossrefService.getMembers((currentPage.value-1)*store.getters.pageSize, store.getters.pageSize, query.value)
          content.value = result.items
          totalElements.value = result['total-results']
        } catch (e) {
          clear()
          error.value = "ERROR: Prefix does not exists";
        }

        isLoading.value = false
        
        // Restaurar el foco al input después de la búsqueda
        await nextTick();
        setTimeout(() => {
          const queryInput = document.getElementById('query');
          if (queryInput) {
            queryInput.focus();
            // Mover el cursor al final del texto
            queryInput.setSelectionRange(queryInput.value.length, queryInput.value.length);
          }
        }, 100);
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
.modern-row {
  background-color: white;
}

.modern-row:nth-child(even) {
  background-color: #f9f9f9;
}

.modern-row:hover {
  background-color: #fff8eb;
}

.hover-primary:hover {
  color: #0d6efd !important;
}

.hover-warning:hover {
  background-color: #ffd145 !important;
  border-color: #ffd145 !important;
}

.bg-warning-soft {
  background-color: #fff8eb;
  color: #856404;
}

.shadow-xs {
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
}

.transition-all {
  transition: all 0.2s ease;
}

@media (min-width: 992px) {
  .border-start-lg {
    border-left: 1px solid #dee2e6 !important;
  }
}
</style>
