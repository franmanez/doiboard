<template>

  <div>

    <div class="container mb-5" >
      <div class="row col-12">

        <div class="col-10 mt-3">
          <input class="form-control form-control-lg rounded-0" v-model="prefix" placeholder="10.nnnnnn">

        </div>
        <div class="col-2 mt-3">
          <button type="button" class="btn btn-warning btn-lg rounded-0 form-control" @click="getDois">Search Prefix</button>
        </div>
      </div>
    </div>


    <div class="container" v-if="Object.keys(content) != 0">

      <div class="row">

        <h1>Most referenced ORCIDs for {{prefix}} </h1>
        <hr class="mt-0 mb-4 bg-secondary" style="height:3px; border:none;" />

        <div class="col-12">

          {{content}}


            <el-table
                :data="content"
                :default-sort="{ prop: 'count', order: 'descending' }"
                stripe
            >
              <!--el-table-column label="Ranking">
                <template v-slot="scope">
                  {{ scope.$index + 1 }}
                </template>
              </el-table-column-->
              <el-table-column label="ORCID">
                <template v-slot="scope">
                  <a :href="scope.row.orcid" target="_blank">{{ scope.row.orcid }} <i class="bi bi-box-arrow-up-right"></i></a>
                </template>
              </el-table-column>
              <el-table-column label="COUNT" sortable>
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

export default {
    name: "MostReferencedOrcids",

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
        content.value = await CrossrefService.orcid(prefix.value, 20)

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
