<template>
  <div class="mt-5">

    <div class="container mb-0 pt-3">
      <div class="row">
        <div class="col-12">
          <h4 class="mb-4 fw-bold"><i class="bi bi-person-badge me-2 text-warning"></i>{{ title }}</h4>
          <div class="input-group input-group-lg shadow-sm search-container overflow-hidden rounded-3">
            <input 
              type="text" 
              class="form-control border-light-subtle ps-4 px-3 py-3" 
              v-model="prefixChild" 
              @keyup.enter="doSearch" 
              placeholder="10.nnnnnn"
              style="font-size: 1.1rem;"
            >
            <button class="btn btn-warning px-4" type="button" @click="doSearch">
              <span class="d-none d-sm-inline">{{ $t("Search") }}</span>
              <i class="bi bi-search d-inline d-sm-none"></i>
            </button>
          </div>
        </div>

        <div class="col-12 mt-4" v-if="prefixStore !== ''">

          <div class="nav-segmented d-flex flex-column flex-md-row mb-5 shadow-sm rounded-3 overflow-hidden border">
            <router-link 
              :to="{ name: 'prefixInfo' }" 
              class="nav-segment flex-fill py-3 px-2 text-center text-decoration-none fw-bold transition-all" 
              :class="{ 'active': $route.path === '/prefix/info' }"
            >
              <i class="bi bi-info-circle me-1"></i> {{ $t("Member Information") }}
            </router-link>
            <router-link 
              :to="{ name: 'prefixDois' }" 
              class="nav-segment flex-fill py-3 px-2 text-center text-decoration-none fw-bold transition-all border-start-md" 
              :class="{ 'active': $route.path === '/prefix/dois' }"
            >
              <i class="bi bi-list-ul me-1"></i> {{ $t("DOI List") }}
            </router-link>
            <router-link 
              :to="{ name: 'prefixReferencedDois' }" 
              class="nav-segment flex-fill py-3 px-2 text-center text-decoration-none fw-bold transition-all border-start-md" 
              :class="{ 'active': $route.path === '/prefix/referenced/dois' }"
            >
              <i class="bi bi-star me-1"></i> {{ $t("Most referenced DOIs") }}
            </router-link>
            <router-link 
              :to="{ name: 'prefixReferencedOrcids' }" 
              class="nav-segment flex-fill py-3 px-2 text-center text-decoration-none fw-bold transition-all border-start-md" 
              :class="{ 'active': $route.path === '/prefix/referenced/orcids' }"
            >
              <i class="bi bi-person-badge me-1"></i> {{ $t("Most referenced ORCIDs") }}
            </router-link>
          </div>


          <!--nav class="nav nav-pills flex-column flex-sm-row mb-5">

            <div class="flex-sm-fill text-sm-center nav-link active rounded-0 bg-dark me-1 mb-1" aria-current="page">
              <router-link to="/prefix/info" active-class="text-warning" style="color: white; text-decoration: none;">
                Member Information
              </router-link>
            </div>

            <div class="flex-sm-fill text-sm-center nav-link active rounded-0 bg-dark me-1 mb-1" aria-current="page">
              <router-link to="/prefix/dois" active-class="text-warning" style="color: white; text-decoration: none;">
                DOI List
              </router-link>
            </div>

            <div class="flex-sm-fill text-sm-center nav-link active rounded-0 bg-dark me-1 mb-1" aria-current="page">
              <router-link to="/prefix/referenced/dois" active-class="text-warning" style="color: white; text-decoration: none;">
                Most referenced DOIs
              </router-link>
            </div>

            <div class="flex-sm-fill text-sm-center nav-link active rounded-0 bg-dark mb-1" aria-current="page">
              <router-link to="/prefix/referenced/orcids" active-class="text-warning" style="color: white; text-decoration: none;">
                Most referenced ORCIDs
              </router-link>
            </div>

          </nav-->

          <h1 class="h3 h-md-1"> <span class="text-muted">{{memberName}}</span></h1>
          <hr class="mt-0 mb-3 bg-secondary" style="height:3px; border:none;" />

        </div>
      </div>
    </div>

  </div>
</template>

<script>

import {useStore} from "vuex";
import {computed, ref, toRefs} from "vue";

export default {
  name: 'PrefixView',
  props: {
    title: String,
    search: Function,
    prefix: String,
  },

  setup(props, ctx){
    const store = useStore()
    const { search } = toRefs(props);
    const prefixFromStore = store.getters.prefix;
    const initialPrefix = prefixFromStore && prefixFromStore !== '' ? String(prefixFromStore) : '10.5821';
    const prefixChild = ref(initialPrefix)


    const prefixStore = computed(() => { return store.getters.prefix})
    const memberName = computed(() => { return store.getters.memberName})

    const doSearch = () => {
      // Eliminar espacios en blanco al principio y al final
      // Asegurarse de que sea una cadena antes de hacer trim
      const prefixValue = prefixChild.value ? String(prefixChild.value).trim() : '';
      prefixChild.value = prefixValue;
      ctx.emit('update:prefix', prefixValue);
      // Llama a la función 'search' del componente padre
      search.value();
    };

    return{
      prefixStore,
      memberName,
      prefixChild,
      doSearch
    }
  }
}
</script>

<style scoped>
.nav-segmented {
  background-color: #434950;
  border-color: #343a40 !important;
}

.nav-segment {
  color: #ffffff;
  font-size: 0.9rem;
}

.nav-segment:hover {
  color: #ffffff;
  background-color: #5a6268;
}

.nav-segment.active {
  background-color: #ffd145 !important;
  color: #000000 !important;
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);
}

.transition-all {
  transition: all 0.2s ease;
}

@media (min-width: 768px) {
  .border-start-md {
    border-left: 1px solid rgba(255, 255, 255, 0.1) !important;
  }
}
</style>
