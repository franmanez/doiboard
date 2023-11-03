<template>
  <div>


    <div class="container">
      <div class="row mb-2 mt-4">
        <h4 class="mb-3">{{ title }}</h4>
        <div class="input-group">
          <input type="text" class="form-control form-control-lg rounded-0" v-model="prefixChild" @keyup.enter="doSearch" placeholder="10.nnnnnn">
          <button class="btn btn-lg btn-warning rounded-0" type="button" @click="doSearch">Search</button>
        </div>

        <div class="col-12 mt-4" v-if="prefixStore !== ''">
          <nav class="nav nav-pills flex-column flex-sm-row mb-5">

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

          </nav>

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
    const prefixChild = ref(store.getters.prefix)


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
</style>
