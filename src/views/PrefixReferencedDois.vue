<template>

  <div>

    <LoadingComponent :is-loading="isLoading"></LoadingComponent>

    <PrefixHeader :title="$t('Prefix: Most referenced DOIs')" v-model:prefix="prefix" :search="search"></PrefixHeader>

    <div class="container pb-5" v-if="Object.keys(content) != 0">
      <div class="row">
        <div class="col-12 px-4 px-md-3">
          <div class="card border border-secondary-subtle shadow-sm rounded-4 overflow-hidden">
            <div class="table-responsive">
              <table class="table table-hover mb-0 align-middle">
                <thead class="bg-light">
                  <tr>
                    <th class="ps-4 text-muted small fw-bold text-uppercase border-0 py-3" style="width: 5%">#</th>
                    <th class="text-muted small fw-bold text-uppercase border-0 py-3" style="width: 25%">DOI</th>
                    <th class="text-muted small fw-bold text-uppercase border-0 py-3 d-none d-lg-table-cell" style="width: 42%">{{ $t("Title") }}</th>
                    <th class="text-muted small fw-bold text-uppercase border-0 py-3 text-center d-none d-sm-table-cell" style="width: 12%">{{ $t("Type") }}</th>
                    <th class="text-muted small fw-bold text-uppercase border-0 py-3 text-center d-none d-md-table-cell" style="width: 10%">Index</th>
                    <th class="pe-4 text-muted small fw-bold text-uppercase border-0 py-3 text-end" style="width: 6%">{{ $t("Count") }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in content" :key="item.id" class="modern-table-row transition-all">
                    <td class="ps-4">
                      <span class="fw-bold text-secondary opacity-50" style="font-size: 0.9rem;">{{ index + 1 }}</span>
                    </td>
                    <td style="max-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                      <a :href="'https://doi.org/'+item.DOI" target="_blank" class="text-primary text-decoration-none fw-medium d-inline-flex align-items-center text-truncate w-100" style="font-size: 0.9rem;">
                        <img src="@/assets/doi-logo.png" width="14" class="me-1 opacity-75" alt="DOI"> {{ item.DOI }}
                      </a>
                    </td>
                    <td class="d-none d-lg-table-cell">
                      <div class="text-dark fw-normal leading-tight" style="font-size: 0.9rem;">{{ item.title[0] }}</div>
                    </td>
                    <td class="text-center d-none d-sm-table-cell">
                      <span class="badge rounded-pill bg-warning text-dark border-0 py-1.5 px-3 fw-bold" style="font-size: 0.75rem;">
                        {{ item.type }}
                      </span>
                    </td>
                    <td class="text-center d-none d-md-table-cell">
                      <div class="d-flex justify-content-center gap-1">
                        <a :href="'https://opencitations.net/index/search?text='+item.DOI+'&rule=citeddoi'" target="_blank" title="OpenCitations" class="index-logo">
                          <img src="@/assets/cites-opencitations.png" height="18" alt="OpenCitations">
                        </a>
                        <a :href="'https://explore.openaire.eu/search/publication?pid='+item.DOI" target="_blank" title="OpenAIRE" class="index-logo">
                          <img src="@/assets/cites-openaire.png" height="18" alt="OpenAIRE">
                        </a>
                        <a :href="'https://scholar.google.com/scholar?hl=ca&as_sdt=0%2C5&q='+item.DOI+'&btnG='" title="Google Scholar" target="_blank" class="index-logo">
                          <img src="@/assets/cites-googlescholar.png" height="18" alt="Google Scholar">
                        </a>
                      </div>
                    </td>
                    <td class="pe-4 text-end">
                      <span class="h5 fw-bold text-dark mb-0">{{ item['is-referenced-by-count'].toLocaleString() }}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
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
import { onMounted, ref, watch} from "vue";
import LoadingComponent from "@/components/Loading.vue";
import PrefixHeader from "@/views/PrefixHeader.vue";
import {useStore} from "vuex";
import {useRoute} from "vue-router";

export default {
    name: "PrefixReferencedDois",

    components: {
      PrefixHeader,
      LoadingComponent

    },

    setup(){
      const route = useRoute();
      const store = useStore()
      const isLoading = ref(false)
      const content = ref('')
      const prefix = ref(store.getters.prefix);
      const error = ref(null);

      onMounted(async () => {
        await search()
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
          if(store.getters.prefix !== '') {
            content.value = await CrossrefService.mostReferencedDois(store.getters.prefix, 30)
          }
        } catch (e) {
          clear()
          error.value = "ERROR: Prefix does not exists";
        }

        isLoading.value = false
      }

      watch(
        () => route.query.id,
        (newId) => {
          if (newId) {
            prefix.value = newId.trim();
            search();
          }
        }
      );

      return{
        content,
        prefix,
        isLoading,
        error,
        search
      }
    }
  }

</script>

<style scoped>
.modern-table-row {
  background-color: white;
}

.modern-table-row:nth-child(even) {
  background-color: #f9f9f9;
}

.modern-table-row:hover {
  background-color: #fff8eb !important;
}

.text-truncate-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.leading-tight {
  line-height: 1.25;
}

.index-logo {
  opacity: 0.7;
  transition: opacity 0.2s ease;
}

.index-logo:hover {
  opacity: 1;
}

.transition-all {
  transition: all 0.2s ease;
}
</style>
