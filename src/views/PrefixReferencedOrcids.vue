<template>

  <div>

    <LoadingComponent :is-loading="isLoading"></LoadingComponent>

    <PrefixHeader :title="$t('Prefix: Most referenced ORCIDs')" v-model:prefix="prefix" :search="search"></PrefixHeader>

    <div class="container" v-if="Object.keys(content) != 0">

      <div class="row mb-2">

        <div class="table-responsive">
          <table class="table table-striped">
            <thead>
            <tr>
              <th class="text-secondary" style="width: 5%">#</th>
              <th class="text-secondary" style="width: 60%">ORCID</th>
              <th class="text-secondary text-end" style="width: 35%">{{ $t("Count") }}</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, index) in content" :key="item.id">
              <td><span class="h4 text-secondary h6 h-md-4">{{ index + 1 }}</span></td>
              <td><a :href="item.orcid" target="_blank" class="small">{{ item.orcid }} <i class="bi bi-box-arrow-up-right"></i></a></td>
              <td class="text-end"><span class="h2 text-warning h4 h-md-2">{{ item.count.toLocaleString() }}</span></td>

            </tr>
            </tbody>
          </table>
        </div>



        <div class="col-md-12">

          <!--el-table
              :data="content"
              style="width: 100%"
              stripe
          >
            <el-table-column label="#" :min-width="10">
              <template v-slot="scope">
                <span class="h4 text-secondary">{{ scope.$index + 1 }}</span>
              </template>
            </el-table-column>
            <el-table-column label="ORCID" :min-width="65">
              <template v-slot="scope">
                <a :href="scope.row.orcid" target="_blank">{{ scope.row.orcid }} <i class="bi bi-box-arrow-up-right"></i></a>
              </template>
            </el-table-column>
            <el-table-column label="COUNT" align="right" :min-width="25">
              <template v-slot="scope">
                <span class="h2 text-warning">{{ scope.row.count.toLocaleString() }}</span>
              </template>
            </el-table-column>
          </el-table-->

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
    name: "PrefixReferencedOrcids",

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
