<template>

  <div>

    <LoadingComponent :is-loading="isLoading"></LoadingComponent>

    <PrefixHeader :title="$t('Prefix: Most referenced ORCIDs')" v-model:prefix="prefix" :search="search"></PrefixHeader>

    <div class="container pb-5" v-if="Object.keys(content) != 0">
      <div class="row">
        <div class="col-12 px-4 px-md-3">
          <div class="card border border-secondary-subtle shadow-sm rounded-4 overflow-hidden">
            <div class="table-responsive">
              <table class="table table-hover mb-0 align-middle">
                <thead class="bg-light">
                  <tr>
                    <th class="ps-4 text-muted small fw-bold text-uppercase border-0 py-3" style="width: 10%">#</th>
                    <th class="text-muted small fw-bold text-uppercase border-0 py-3" style="width: 70%">ORCID</th>
                    <th class="pe-4 text-muted small fw-bold text-uppercase border-0 py-3 text-end" style="width: 20%">{{ $t("Count") }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in content" :key="item.id" class="modern-table-row transition-all">
                    <td class="ps-4">
                      <span class="fw-bold text-secondary opacity-50" style="font-size: 0.9rem;">{{ index + 1 }}</span>
                    </td>
                    <td>
                      <a :href="item.orcid" target="_blank" class="text-primary text-decoration-none fw-medium d-inline-flex align-items-center" style="font-size: 0.9rem;">
                        <img src="@/assets/logo-orcid-mini.png" height="16" alt="ORCID" class="me-2 opacity-75">
                        {{ item.orcid }} <i class="bi bi-box-arrow-up-right ms-2 opacity-50 small" style="font-size: 0.75rem;"></i>
                      </a>
                    </td>
                    <td class="pe-4 text-end">
                      <span class="h5 fw-bold text-dark mb-0">{{ item.count.toLocaleString() }}</span>
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
    name: "PrefixReferencedOrcids",

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
            content.value = await CrossrefService.mostReferencedOrcids(store.getters.prefix, 30)
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

.transition-all {
  transition: all 0.2s ease;
}
</style>
