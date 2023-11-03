<template>

  <div>

    <LoadingComponent :is-loading="isLoading"></LoadingComponent>

    <PrefixHeader title="Most referenced ORCIDs" v-model:prefix="prefix" :search="search"></PrefixHeader>

    <div class="container" v-if="Object.keys(content) != 0">

      <div class="row mb-2">
        <div class="col-md-12">

          <el-table
              :data="content"
              style="width: 100%"
              stripe
          >
            <el-table-column label="Ranking" :min-width="10">
              <template v-slot="scope">
                <span class="h4 text-secondary">{{ scope.$index + 1 }}</span>
              </template>
            </el-table-column>
            <el-table-column label="ORCID" :min-width="70">
              <template v-slot="scope">
                <a :href="scope.row.orcid" target="_blank">{{ scope.row.orcid }} <i class="bi bi-box-arrow-up-right"></i></a>
              </template>
            </el-table-column>
            <el-table-column label="COUNT" align="right" :min-width="20">
              <template v-slot="scope">
                <span class="h2 text-warning">{{ scope.row.count.toLocaleString() }}</span>
              </template>
            </el-table-column>
          </el-table>

        </div>
      </div>
    </div>

    <div class="alert alert-danger mt-4" v-if="error != null">{{error}}</div>

  </div>
</template>

<script>

import CrossrefService from '@/service/CrossrefService';
import { onMounted, ref} from "vue";
import LoadingComponent from "@/components/Loading.vue";
import PrefixHeader from "@/views/PrefixHeader.vue";
import {useStore} from "vuex";

export default {
    name: "PrefixReferencedOrcids",

    components: {
      PrefixHeader,
      LoadingComponent
    },

    setup(){
      const store = useStore()
      const isLoading = ref(false)
      const content = ref([])
      const prefix = ref(store.getters.prefix);
      const error = ref(null);

      onMounted(async () => {
        await search()
      });

      const search = async () => {
        isLoading.value = true
        if(prefix.value !== store.getters.prefix){
          await CrossrefService.memberInfo(prefix.value)
        }
        store.commit('setPrefix', prefix.value)
        content.value = await CrossrefService.mostReferencedOrcids(store.getters.prefix, 30)
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
