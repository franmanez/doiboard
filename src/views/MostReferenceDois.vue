<template>

  <div>

    <div class="container mb-5" >
      <div class="row col-12">

        <div class="col-10 mt-3">
          <input class="form-control form-control-lg rounded-0" v-model="prefix" placeholder="10.nnnnnn">

        </div>
        <div class="col-2 mt-3">
          <button type="button" class="btn btn-warning btn-lg rounded-0" @click="getDois">Search Prefix</button>
        </div>
      </div>
    </div>


    <div class="container" v-if="Object.keys(content) != 0">

      <div class="row">

        <h1>Most referenced DOIS for {{prefix}} </h1>
        <hr class="mt-0 mb-4 bg-secondary" style="height:3px; border:none;" />

        <div class="col-12">

          <el-table
              :data="content"
              :default-sort="{ prop: 'is-referenced-by-count', order: 'descending' }"
              stripe
          >
            <!--el-table-column label="Ranking">
              <template v-slot="scope">
                {{ scope.$index + 1 }}
              </template>
            </el-table-column-->
            <el-table-column label="DOI">
              <template v-slot="scope">
                <a :href="scope.row.DOI" target="_blank">{{ scope.row.DOI }} <i class="bi bi-box-arrow-up-right"></i></a>
              </template>
            </el-table-column>
            <el-table-column prop="title" label="Title"></el-table-column>
            <el-table-column label="Type" align="center">
              <template v-slot="scope">
                <span class="mt-1 text-dark badge bg-warning">{{ scope.row.type }}</span>

              </template>
            </el-table-column>
            <el-table-column label="COUNT" sortable>
              <template v-slot="scope">
                <span class="h2 text-warning">{{ scope.row['is-referenced-by-count'].toLocaleString() }}</span>
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

export default {
    name: "MostReferencedDois",

    components: {

    },

    setup(){


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
        content.value = await CrossrefService.mostReferenced(prefix.value, 20)

      }




      return{
        content,
        cont,
        prefix,
        getDois,
        error
      }

    }


  }

</script>

<style scoped>

</style>
