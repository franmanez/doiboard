<template>

  <div>

    <LoadingComponent :is-loading="isLoading"></LoadingComponent>

    <PrefixHeader title="Most referenced DOIs" v-model:prefix="prefix" :search="search"></PrefixHeader>

    <div class="container" v-if="Object.keys(content) != 0">

      <div class="row mb-2">

        <div class="col-md-12">

          <table class="table table-responsive table-striped">
            <thead>
            <tr>
              <th class="text-secondary" style="width: 5%">#</th>
              <th class="text-secondary" style="width: 25%">DOI</th>
              <th class="text-secondary d-none d-lg-table-cell" style="width: 45%">{{ $t("Title") }}</th>
              <th class="text-secondary text-center d-none d-sm-table-cell" style="width: 15%">{{ $t("Type") }}</th>
              <th class="text-secondary text-end" style="width: 10%">{{ $t("Count") }}</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, index) in content" :key="item.id" >
              <td><span class="h4 text-secondary">{{ index + 1 }}</span></td>
              <td><a :href="item.DOI" target="_blank">{{ item.DOI }} <i class="bi bi-box-arrow-up-right"></i></a></td>
              <td class="text-secondary d-none d-lg-table-cell">{{ item.title[0] }}</td>
              <td class="text-center d-none d-sm-table-cell"><span class="mt-1 text-dark badge bg-warning">{{ item.type }}</span></td>
              <td class="text-end"><span class="h2 text-warning">{{ item['is-referenced-by-count'].toLocaleString() }}</span></td>

            </tr>
            </tbody>
          </table>

        </div>
      </div>
    </div>

    <div class="container col-12 alert alert-danger mt-4 rounded-0" v-if="error != null">{{error}}</div>

  </div>
</template>

<script>

import CrossrefService from '@/service/CrossrefService';
import { onMounted, ref} from "vue";
import LoadingComponent from "@/components/Loading.vue";
import PrefixHeader from "@/views/PrefixHeader.vue";
import {useStore} from "vuex";

export default {
    name: "PrefixReferencedDois",

    components: {
      PrefixHeader,
      LoadingComponent

    },

    setup(){
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
          content.value = await CrossrefService.mostReferencedDois(store.getters.prefix, 30)
        } catch (e) {
          clear()
          error.value = "ERROR: Prefix does not exists";
        }

        isLoading.value = false
      }

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

</style>
