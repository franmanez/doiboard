<template>
  <div class="mt-5">

    <div class="container">
      <div class="row mb-2 mt-4">
        <h4 class="mb-3">{{ title }}</h4>
        <div class="input-group">
          <input type="text" class="form-control form-control-lg rounded-0" v-model="prefixChild" @keyup.enter="doSearch" placeholder="10.nnnnnn">
          <button class="btn btn-lg btn-warning rounded-0" type="button" @click="doSearch">Search</button>
        </div>

        <div class="col-12 mt-4" v-if="prefixStore !== ''">

          <ul class="nav nav-pills nav-fill mb-5">
            <li class="nav-item me-1 mb-1">
              <router-link :to="{ name: 'prefixInfo' }" class="nav-link rounded-0" :class="{ 'active': $route.path === '/prefix/info' }">Member Information</router-link>
            </li>
            <li class="nav-item rounded-0 me-1">
              <router-link :to="{ name: 'prefixDois' }" class="nav-link rounded-0" :class="{ 'active': $route.path === '/prefix/dois' }">DOI List</router-link>
            </li>
            <li class="nav-item rounded-0 me-1">
              <router-link :to="{ name: 'prefixReferencedDois' }" class="nav-link rounded-0" :class="{ 'active': $route.path === '/prefix/referenced/dois' }">Most referenced DOIs</router-link>
            </li>
            <li class="nav-item rounded-0 me-1">
              <router-link :to="{ name: 'prefixReferencedOrcids' }" class="nav-link rounded-0" :class="{ 'active': $route.path === '/prefix/referenced/orcids' }">Most referenced ORCIDs</router-link>
            </li>
          </ul>


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

          <h1> {{memberName}}: {{title}}</h1>
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
    const prefixChild = ref(store.getters.prefix === '' ? 10.5821 : store.getters.prefix)


    const prefixStore = computed(() => { return store.getters.prefix})
    const memberName = computed(() => { return store.getters.memberName})

    const doSearch = () => {
      ctx.emit('update:prefix', prefixChild.value);
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

.nav-pills .nav-link.active, .nav-tabs .nav-item.show .nav-link {
  background-color: #ffd145;
  color:black;
}

.nav-pills .nav-link, .nav-tabs .nav-item.show .nav-link {
  background-color: #434950;
  margin-left: 1px;
  color:white;
}
</style>
