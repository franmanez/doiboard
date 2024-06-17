<template>

  <div>

    <LoadingComponent :is-loading="isLoading"></LoadingComponent>

    <PrefixHeader :title="$t('Prefix: Member Information')" v-model:prefix="prefix" :search="search"></PrefixHeader>


    <div class="container" v-if="Object.keys(content) != 0">
      <div class="row mb-2">
        <div class="col-md-12">

          <div class="card bg-warning mb-5 bg-opacity-75">
            <div class="card-body text-dark">
              <div class="d-flex justify-content-between p-md-1">
                <div class="d-flex flex-row">
                  <div class="align-self-center">
                    <i class="bi bi-file-earmark text-dark me-5" style="font-size: 3rem;"></i>
                  </div>
                  <div>
                    <h2>TOTAL</h2>
                    <p class="mb-0">{{ $t("Total number of deposited DOIs") }}</p>
                  </div>
                </div>
                <div class="align-self-center">
                  <h2 class="h1 mb-0">{{content.total.toLocaleString()}}</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>



      <div class="row mb-2">

        <div v-for="(value, index) in content.all" :key="value.id" class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
          <div class="card mb-5">
            <div class="card-body">
              <h4 class="card-title font-weight-bold">{{ map[index] }}</h4>
              <hr class="mt-0 mb-4 bg-secondary" style="height:3px; border:none;" />
              <div class="d-flex justify-content-between">
                <h1 class="">{{value.toLocaleString()}}</h1>
                <i class="bi bi-info-circle-fill me-1" style="font-size: 2.3rem;"></i>
              </div>
            </div>

            <div class="card-footer">
              <a class="btn btn-light btn-sm text-uppercase" @click="getCoverage(index)" role="button"><i class="bi bi-wifi"></i> {{ $t("Coverage") }}</a>
              <a class="btn btn-light btn-sm text-uppercase" @click="getPublicationDate(index)" v-show="index !== 'dissertation' && index !== 'database'" role="button"><i class="bi bi-pie-chart-fill"></i> {{ $t("Publication") }}</a>
              <a class="btn btn-light btn-sm text-uppercase" @click="getDepositedDate(index)" role="button"><i class="bi bi-bar-chart"></i> {{ $t("Deposited") }}</a>
            </div>

          </div>
        </div>
      </div>


      <div class="row mb-2" ref="sectionDetails" v-if="typeSelected !== ''">
        <div class="col-md-12">
          <h2><span class="badge rounded-pill bg-warning text-dark">{{map[typeSelected]}}</span> </h2>

        </div>
      </div>

      <div class="row mb-2" v-if="showCoverage">
        <div class="col-md-12">
          <h4>{{ $t("Coverage") }}</h4>
          <p class="blockquote-footer mt-2">{{ $t("Coverage Info") }}</p>

          <div class="row">
            <div class="col-xl-12">
              <div class="card proj-progress-card">
                <div class="card-block">
                  <div class="row">
                    <div class="col-xl-3 col-md-6">
                      <h5>Abstracts</h5>
                      <h4 class="mb-3 text-success">{{ (content.coverage[typeSelected].abstracts * 100).toFixed(0) }} %</h4>
                      <div class="progress">
                        <div class="progress-bar bg-warning" :style="{width:(content.coverage[typeSelected].abstracts * 100).toFixed(0) + '%'}"></div>
                      </div>
                    </div>
                    <div class="col-xl-3 col-md-6">
                      <h5>ORCIDs</h5>
                      <h4 class="mb-3 text-success">{{ (content.coverage[typeSelected].orcids * 100).toFixed(0) }} %</h4>
                      <div class="progress">
                        <div class="progress-bar bg-warning" :style="{width:(content.coverage[typeSelected].orcids * 100).toFixed(0) + '%'}"></div>
                      </div>
                    </div>
                    <div class="col-xl-3 col-md-6">
                      <h5>Licenses</h5>
                      <h4 class="mb-3 text-success">{{ (content.coverage[typeSelected].licenses * 100).toFixed(0) }} %</h4>
                      <div class="progress">
                        <div class="progress-bar bg-warning" :style="{width:(content.coverage[typeSelected].licenses * 100).toFixed(0) + '%'}"></div>
                      </div>
                    </div>
                    <div class="col-xl-3 col-md-6">
                      <h5>References</h5>
                      <h4 class="mb-3 text-success">{{ (content.coverage[typeSelected].references * 100).toFixed(0) }} %</h4>
                      <div class="progress">
                        <div class="progress-bar bg-warning" :style="{width:(content.coverage[typeSelected].references * 100).toFixed(0) + '%'}"></div>
                      </div>
                    </div>
                  </div>



                  <div class="row">
                    <div class="col-xl-3 col-md-6" style="margin-top: 80px;">
                      <h5>Affiliations</h5>
                      <h4 class="mb-3 text-success">{{ (content.coverage[typeSelected].affiliations * 100).toFixed(0) }} %</h4>
                      <div class="progress">
                        <div class="progress-bar bg-warning" :style="{width:(content.coverage[typeSelected].affiliations * 100).toFixed(0) + '%'}"></div>
                      </div>
                    </div>
                    <div class="col-xl-3 col-md-6" style="margin-top: 80px;">
                      <h5>Funders</h5>
                      <h4 class="mb-3 text-success">{{ (content.coverage[typeSelected].funders * 100).toFixed(0) }} %</h4>
                      <div class="progress">
                        <div class="progress-bar bg-warning" :style="{width:(content.coverage[typeSelected].funders * 100).toFixed(0) + '%'}"></div>
                      </div>
                    </div>
                    <div class="col-xl-3 col-md-6" style="margin-top: 80px;">
                      <h5>Similarity checking</h5>
                      <h4 class="mb-3 text-success">{{ (content.coverage[typeSelected]['similarity-checking'] * 100).toFixed(0) }} %</h4>
                      <div class="progress">
                        <div class="progress-bar bg-warning" :style="{width:(content.coverage[typeSelected]['similarity-checking'] * 100).toFixed(0) + '%'}"></div>
                      </div>
                    </div>
                    <div class="col-xl-3 col-md-6" style="margin-top: 80px;">
                      <h5>Award numbers</h5>
                      <h4 class="mb-3 text-success">{{ (content.coverage[typeSelected]['award-numbers'] * 100).toFixed(0) }} %</h4>
                      <div class="progress">
                        <div class="progress-bar bg-warning" :style="{width:(content.coverage[typeSelected]['award-numbers'] * 100).toFixed(0) + '%'}"></div>
                      </div>
                    </div>
                  </div>





                  <div class="row">
                    <div class="col-xl-3 col-md-6" style="margin-top: 80px;">
                      <h5>Ror ids</h5>
                      <h4 class="mb-3 text-success">{{ (content.coverage[typeSelected]['ror-ids'] * 100).toFixed(0) }} %</h4>
                      <div class="progress">
                        <div class="progress-bar bg-warning" :style="{width:(content.coverage[typeSelected]['ror-ids'] * 100).toFixed(0) + '%'}"></div>
                      </div>
                    </div>
                    <div class="col-xl-3 col-md-6" style="margin-top: 80px;">
                      <h5>Update policies</h5>
                      <h4 class="mb-3 text-success">{{ (content.coverage[typeSelected]['update-policies'] * 100).toFixed(0) }} %</h4>
                      <div class="progress">
                        <div class="progress-bar bg-warning" :style="{width:(content.coverage[typeSelected]['update-policies'] * 100).toFixed(0) + '%'}"></div>
                      </div>
                    </div>
                    <div class="col-xl-3 col-md-6" style="margin-top: 80px;">
                      <h5>Resource links</h5>
                      <h4 class="mb-3 text-success">{{ (content.coverage[typeSelected]['resource-links'] * 100).toFixed(0) }} %</h4>
                      <div class="progress">
                        <div class="progress-bar bg-warning" :style="{width:(content.coverage[typeSelected]['resource-links'] * 100).toFixed(0) + '%'}"></div>
                      </div>
                    </div>
                    <div class="col-xl-3 col-md-6" style="margin-top: 80px;">
                      <h5>Descriptions</h5>
                      <h4 class="mb-3 text-success">{{ (content.coverage[typeSelected].descriptions * 100).toFixed(0) }} %</h4>
                      <div class="progress">
                        <div class="progress-bar bg-warning" :style="{width:(content.coverage[typeSelected].descriptions * 100).toFixed(0) + '%'}"></div>
                      </div>
                    </div>
                  </div>



                </div>
              </div>
            </div>
          </div>
        </div>


      </div>

      <div class="row" v-if="showPublished || showDeposited" ref="customDiv">

        <h4 v-if="showPublished">{{ $t("Chart published date") }}</h4>
        <p v-if="showPublished" class="blockquote-footer mb-2">{{ $t("Chart published date Info") }}</p>



        <h4 v-if="showDeposited">{{ $t("Chart first deposited date") }}</h4>
        <p v-if="showDeposited" class="blockquote-footer">{{ $t("Chart first deposited date Info") }}</p>

        <vue-highcharts
            type="chart"
            :options="chartOptions"
            :redrawOnUpdate="true"
            :oneToOneUpdate="false"
            :animateOnUpdate="true"
            @rendered="onRender"/>

      </div>



    </div>


    <div class="container col-12 alert alert-danger mt-4 rounded-0" v-if="error != null">{{error}}</div>

  </div>
</template>

<script>

import CrossrefService from '@/service/CrossrefService';
import {computed, onMounted, ref} from "vue";
import {useI18n} from 'vue-i18n';
import VueHighcharts from 'vue3-highcharts';
import {useStore} from "vuex";
import LoadingComponent from "@/components/Loading.vue";
import PrefixHeader from "@/views/PrefixHeader.vue";
import {ElMessageBox} from "element-plus";

export default {
    name: "PrefixInfo",

    components: {
      PrefixHeader,
      LoadingComponent,
      VueHighcharts,

    },

    setup(){
      const { t } = useI18n();
      const store = useStore()
      const content = ref({})
      const prefix = ref(store.getters.prefix);
      const typeSelected = ref('')
      const showCoverage = ref(false)
      const showPublished = ref(false)
      const showDeposited = ref(false)

      const chartSeriesName = ref('')
      const chartSeriesData = ref([]);
      const chartCategoriesData = ref([]);
      const chartTitle = ref('');
      const chartColors = ref([])

      const isLoading = ref(false)
      const sectionDetails = ref(null)

      const chartRef = ref(null);
      const chartOptions = computed(() => ({
        chart: {
          type: 'column',
        },
        title: {
          text: chartTitle.value,
        },
        xAxis: {
          categories: chartCategoriesData.value
        },
        yAxis: {
          title: {
            text: 'Number of items',
          },
        },
        colors: chartColors.value,
        //series: seriesData.value
        series: [{
          name: chartSeriesName.value,
          data: chartSeriesData.value,
        }],

      }));

      const cont = ref(0)
      const error = ref(null);


      const map = {
        "edited-book": "Edited Book",
        "journal-article": "Journal Article",
        "dissertation": "Dissertation",
        "dataset": "Dataset",
        "database": "Database",
        "proceedings-article": "Conference Paper",
        "book-section": "Book section",
        "monograph": "Monograph",
        "report-component": "Report component",
        "report": "Report",
        "peer-review": "Peer review",
        "book-track": "Book track",
        "book-part": "Book part",
        "other": "Other",
        "book": "Book",
        "journal-volume": "Journal volume",
        "book-set": "Book set",
        "reference-entry": "Reference entry",
        "journal": "Journal",
        "component": "Component",
        "book-chapter": "Book-chapter",
        "proceedings-series": "Proceedings-series",
        "report-series": "Report-series",
        "proceedings": "Proceedings",
        "standard": "Standard",
        "reference-book": "Reference book",
        "posted-content": "Posted content",
        "journal-issue": "Journal-issue",
        "grant": "Grant",
        "book-series": "Book series"
      };


      onMounted(async () => {
        if(store.getters.prefix) await search()
      });

      const clear = () => {
        content.value = ''
        store.commit('setPrefix', '')
      }

      const showStatus = (coverage, published, deposited) => {
        showCoverage.value = coverage
        showPublished.value = published
        showDeposited.value = deposited
      }


      const search = async () => {
        error.value = null
        isLoading.value = true

        try{
          //content.value = await CrossrefService.memberInfo(store.getters.prefix)
          content.value = await CrossrefService.memberInfo(prefix.value)
          store.commit('setPrefix', prefix.value)
        } catch (e) {
          clear()
          error.value = "ERROR: Prefix does not exists";
        }

        //store.commit('setMemberName', content.value.name)
        isLoading.value = false
      }


      const scrollToBottom = () => {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: 'smooth',
        });
      }

      /*const scrollToSection = (section) => {
        if (section.value && section.value.scrollIntoView) {
          section.value.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      }*/

      const getCoverage = async (type) => {
        showStatus(true, false, false)
        typeSelected.value = type
        scrollToBottom()
      }


      const getPublicationDate = async (type) => {
        isLoading.value = true
        showStatus(false, true, false)
        typeSelected.value = type

        let result = await CrossrefService.getPublishedDate(prefix.value, type)

        const resultKeys = Object.keys(result);
        const resultValues = Object.values(result);

        chartTitle.value = map[typeSelected.value] + t("published by years")
        chartCategoriesData.value = resultKeys
        chartSeriesName.value = type
        chartSeriesData.value = resultValues
        chartColors.value = ['#ffc72c']
        isLoading.value = false
        scrollToBottom()

      }

      const getDepositedDate = async (type) => {

        ElMessageBox.confirm(
            t("slow query message"),
            t("slow query title"),
            {
              confirmButtonText: 'OK',
              cancelButtonText: 'Cancel',
              type: 'warning',
            }
        )
            .then(async () => {
              isLoading.value = true
              showStatus(false, false, true)
              typeSelected.value = type

              let result = await CrossrefService.getDepositByType(prefix.value, type)

              const resultKeys = Object.keys(result);
              const resultValues = Object.values(result);

              chartTitle.value = map[typeSelected.value] + t("first deposited by years")
              chartCategoriesData.value = resultKeys
              chartSeriesName.value = type
              chartSeriesData.value = resultValues
              chartColors.value = ['#017698FF']
              isLoading.value = false
              scrollToBottom()
            })
            .catch(() => {
              //Do nothing
            })

      }


      return{
        content,
        cont,
        prefix,
        typeSelected,
        map,
        chartRef,
        showCoverage,
        showPublished,
        showDeposited,
        error,
        chartOptions,
        sectionDetails,
        isLoading,
        search,
        getCoverage,
        getPublicationDate,
        getDepositedDate,
      }

    }


  }

</script>

<style scoped>


.stretch-card>.card {
  width: 100%;
  min-width: 100%
}

.card {
  box-shadow: none;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
}

.card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid #CCCCCC;
  border-radius: 0
}

.card .card-block {
  padding: 1.25rem;
}


.proj-progress-card .progress {
  height: 7px;
  overflow: visible;
  margin-bottom: 10px;
}

.proj-progress-card .progress .progress-bar {
  position: relative;
}

.progress .progress-bar {
  height: 100%;
  color: inherit;
}


.progress .progress-bar:after {
  content: "";
  display: inline-block;
  width: 15px;
  background: #fa9302;
  position: absolute;
  top: -10px;
  bottom: -10px;
  right: -5px;
  z-index: 1;
  transform: rotate(30deg)
}


</style>
