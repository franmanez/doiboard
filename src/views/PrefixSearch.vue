<template>

  <div>

    <div class="container mb-5">
      <div class="row mb-2 mt-3">
        <h4 class="mb-3">Prefix search</h4>
        <div class="input-group">
          <input type="text" class="form-control form-control-lg rounded-0" v-model="prefix" placeholder="10.nnnnnn">
          <button class="btn btn-lg btn-warning rounded-0" type="button" @click="getMemberInfo">Search</button>
        </div>
      </div>
    </div>


    <div class="container" v-if="Object.keys(contentPrefix) != 0">

      <div class="row mb-2">
        <div class="col-md-12">
          <h1 class="text-dark">{{contentPrefix.name}} </h1>
          <hr class="mt-0 mb-4 bg-secondary" style="height:3px; border:none;" />

          <div class="card bg-warning mb-5 bg-opacity-75">
            <div class="card-body text-dark">
              <div class="d-flex justify-content-between p-md-1">
                <div class="d-flex flex-row">
                  <div class="align-self-center">
                    <i class="bi bi-file-earmark text-dark me-5" style="font-size: 3rem;"></i>
                  </div>
                  <div>
                    <h2>TOTAL</h2>
                    <p class="mb-0">Total number of deposited DOIs</p>
                  </div>
                </div>
                <div class="align-self-center">
                  <h2 class="h1 mb-0">{{contentPrefix.total.toLocaleString()}}</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>



      <div class="row mb-2">

        <div v-for="(value, index) in contentPrefix.all" :key="value.id" class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
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
              <a class="btn btn-light btn-sm" @click="getCoverage(index)" role="button"><i class="bi bi-wifi"></i> COVERAGE</a>
              <a class="btn btn-light btn-sm" @click="getPublicationDate(index)" v-show="index !== 'dissertation' && index !== 'database'" role="button"><i class="bi bi-pie-chart-fill"></i> PUBLICATION</a>
              <a class="btn btn-light btn-sm" @click="getDepositedDate(index)" role="button"><i class="bi bi-bar-chart"></i> DEPOSITED</a>
            </div>

          </div>
        </div>
      </div>


      <div class="row mb-2" v-if="typeSelected != ''">
        <div class="col-md-12">
          <h2>Type Selected: <span class="text-warning">{{map[typeSelected]}}</span> </h2>
          <hr class="mt-0 mb-4 bg-secondary" style="height:3px; border:none;" />
        </div>
      </div>

      <div class="row mb-2" v-if="showCoverage">
        <div class="col-md-12">
          <h3>Coverage</h3>
          <p class="blockquote-footer mt-2">Percentage of content items that include this values in their metadata.</p>

          <div class="row">
            <div class="col-xl-12">
              <div class="card proj-progress-card">
                <div class="card-block">
                  <div class="row">
                    <div class="col-xl-3 col-md-6">
                      <h5>Abstracts</h5>
                      <h4 class="mb-3 text-success">{{ (contentPrefix.coverage[typeSelected].abstracts * 100).toFixed(0) }} %</h4>
                      <div class="progress">
                        <div class="progress-bar bg-warning" :style="{width:(contentPrefix.coverage[typeSelected].abstracts * 100).toFixed(0) + '%'}"></div>
                      </div>
                    </div>
                    <div class="col-xl-3 col-md-6">
                      <h5>ORCIDs</h5>
                      <h4 class="mb-3 text-success">{{ (contentPrefix.coverage[typeSelected].orcids * 100).toFixed(0) }} %</h4>
                      <div class="progress">
                        <div class="progress-bar bg-warning" :style="{width:(contentPrefix.coverage[typeSelected].orcids * 100).toFixed(0) + '%'}"></div>
                      </div>
                    </div>
                    <div class="col-xl-3 col-md-6">
                      <h5>Licenses</h5>
                      <h4 class="mb-3 text-success">{{ (contentPrefix.coverage[typeSelected].licenses * 100).toFixed(0) }} %</h4>
                      <div class="progress">
                        <div class="progress-bar bg-warning" :style="{width:(contentPrefix.coverage[typeSelected].licenses * 100).toFixed(0) + '%'}"></div>
                      </div>
                    </div>
                    <div class="col-xl-3 col-md-6">
                      <h5>References</h5>
                      <h4 class="mb-3 text-success">{{ (contentPrefix.coverage[typeSelected].references * 100).toFixed(0) }} %</h4>
                      <div class="progress">
                        <div class="progress-bar bg-warning" :style="{width:(contentPrefix.coverage[typeSelected].references * 100).toFixed(0) + '%'}"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


      </div>

      <div class="row" v-if="showPublished || showDeposited">

        <h3 v-if="showPublished">Chart published date</h3>
        <p v-if="showPublished" class="blockquote-footer mb-2">Show the number of items per publication year.</p>



        <h3 v-if="showDeposited">Chart first deposited date</h3>
        <p v-if="showDeposited" class="blockquote-footer">Show the number of items by year of deposit in CrossRef.</p>

        <vue-highcharts
            type="chart"
            :options="chartOptions"
            :redrawOnUpdate="true"
            :oneToOneUpdate="false"
            :animateOnUpdate="true"
            @rendered="onRender"/>

      </div>

    </div>


    <div class="alert alert-danger mt-4" v-if="error != null">{{error}}</div>

  </div>
</template>

<script>

import CrossrefService from '@/service/CrossrefService';
import {computed, onMounted, ref} from "vue";
import VueHighcharts from 'vue3-highcharts';
import {useStore} from "vuex";

export default {
    name: "DoiSearch",

    components: {
      VueHighcharts,
    },

    setup(){

      const store = useStore()
      const contentPrefix = ref({})
      const prefix = ref('10.5821');
      const typeSelected = ref('')
      const showCoverage = ref(false)
      const showPublished = ref(false)
      const showDeposited = ref(false)

      const chartSeriesName = ref('')
      const chartSeriesData = ref([]);
      const chartCategoriesData = ref([]);
      const chartTitle = ref('');
      const chartColors = ref([])

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

      });

      const clear = () => {
        contentPrefix.value = ''
        error.value = null
      }

      const showStatus = (coverage, published, deposited) => {
        showCoverage.value = coverage
        showPublished.value = published
        showDeposited.value = deposited
      }


      const getMemberInfo = async () => {
        clear()
        contentPrefix.value = await CrossrefService.memberInfo(prefix.value)
        store.commit('setMemberName', contentPrefix.value.name)
      }

      const getCoverage = async (type) => {
        showStatus(true, false, false)
        typeSelected.value = type
      }


      const getPublicationDate = async (type) => {
        showStatus(false, true, false)
        typeSelected.value = type

        let result = await CrossrefService.getPublishedDate(prefix.value, type)

        const resultKeys = Object.keys(result);
        const resultValues = Object.values(result);

        chartTitle.value = map[typeSelected.value] + " published by years"
        chartCategoriesData.value = resultKeys
        chartSeriesName.value = type
        chartSeriesData.value = resultValues
        chartColors.value = ['#ffc72c']

      }

      const getDepositedDate = async (type) => {

        showStatus(false, false, true)
        typeSelected.value = type

        let result = await CrossrefService.getDepositByType(prefix.value, type)

        const resultKeys = Object.keys(result);
        const resultValues = Object.values(result);

        chartTitle.value = map[typeSelected.value] + " first deposited by years"
        chartCategoriesData.value = resultKeys
        chartSeriesName.value = type
        chartSeriesData.value = resultValues
        chartColors.value = ['#fc2828']
      }


      return{
        contentPrefix,
        cont,
        prefix,
        typeSelected,
        getMemberInfo,
        getCoverage,
        getPublicationDate,
        getDepositedDate,

        map,
        chartRef,

        showCoverage,
        showPublished,
        showDeposited,
        error,
        chartOptions,
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
  -ms-box-shadow: none
}

.card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid #3da5f;
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
