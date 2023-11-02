<template>

  <div>

    <LoadingComponent :is-loading="isLoading"></LoadingComponent>

    <div class="container mb-5">
      <div class="row mb-2 mt-3">
        <h4 class="mb-3">Most referenced DOIs</h4>
        <div class="input-group">
          <input type="text" class="form-control form-control-lg rounded-0" v-model="prefix" placeholder="10.nnnnnn">
          <button class="btn btn-lg btn-warning rounded-0" type="button" @click="getDois">Search</button>
        </div>
      </div>
    </div>


    <div class="container" v-if="Object.keys(content) != 0">

      <div class="row mb-2">

        <div class="col-md-12">
          <h1>20 Most referenced DOIS for {{prefix}} </h1>
          <hr class="mt-0 mb-4 bg-secondary" style="height:3px; border:none;" />

          <div class="col-12">

            <el-table
                :data="content"
                :default-sort="{ prop: 'is-referenced-by-count', order: 'descending' }"
                style="width: 100%"
                stripe
            >
              <el-table-column label="Ranking" :min-width="10">
                <template v-slot="scope">
                  <span class="h4 text-secondary">{{ scope.$index + 1 }}</span>
                </template>
              </el-table-column>
              <el-table-column label="DOI" :min-width="25">
                <template v-slot="scope">
                  <a :href="scope.row.DOI" target="_blank">{{ scope.row.DOI }} <i class="bi bi-box-arrow-up-right"></i></a>
                </template>
              </el-table-column>
              <el-table-column prop="title" label="Title" :min-width="35"></el-table-column>
              <el-table-column label="Type" align="center" :min-width="15">
                <template v-slot="scope">
                  <span class="mt-1 text-dark badge bg-warning">{{ scope.row.type }}</span>
                </template>
              </el-table-column>
              <el-table-column label="COUNT" sortable align="right" :min-width="15">
                <template v-slot="scope">
                  <span class="h2 text-warning">{{ scope.row['is-referenced-by-count'].toLocaleString() }}</span>
                </template>
              </el-table-column>


            </el-table>

          </div>
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

export default {
    name: "MostReferencedDois",

    components: {
      LoadingComponent

    },

    setup(){
      const isLoading = ref(false)
      const content = ref([])
      const prefix = ref('10.5821');

      const cont = ref(0)
      const error = ref(null);

      onMounted(async () => {


      });

      const clear = () => {
        content.value = ''
        error.value = null
      }


      const getDois = async () => {
        clear()
        isLoading.value = true
        content.value = await CrossrefService.mostReferenced(prefix.value, 20)
        isLoading.value = false

      }




      return{
        content,
        cont,
        prefix,
        getDois,
        isLoading,
        error
      }

    }


  }

</script>

<style scoped>

</style>
