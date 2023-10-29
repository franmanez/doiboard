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


    <div class="container">

      <div class="row">

        <h1>Information for DOI prefix {{prefix}} </h1>
        <hr class="mt-0 mb-4 bg-secondary" style="height:3px; border:none;" />

        <div class="col-sm-12 col-md-9">
          <PaginationTable
              class="container"
              :show-pagination="true"
              v-model:current-page="currentPage"
              v-model:page-size="pageSize"
              :total="totalElements"
              :handle-size-change="handleSizeChange"
              :handle-current-change="handleCurrentChange">
          </PaginationTable>

          {{contentPrefix}}
        </div>


      </div>








      <div class="row mb-3" v-if="showPublished">
        <h2>Charts</h2>
        <div ref="chartRef"></div>



        <vue-highcharts
            type="chart"
            :options="chartOptions2"
            :redrawOnUpdate="true"
            :oneToOneUpdate="false"
            :animateOnUpdate="true"
            @rendered="onRender"/>
        <button class="btn btn-danger mr-2" @click="fetchData">UPDATE DATA</button>
      </div>

      <div class="row mb-5"></div>





    </div>


    <div class="alert alert-danger mt-4" v-if="error != null">{{error}}</div>

  </div>
</template>

<script>

import CrossrefService from '@/service/CrossrefService';
import PaginationTable from "@/components/PaginationTable.vue"
import {computed, onMounted, ref} from "vue";
import { useStore } from 'vuex'
import Highcharts from "highcharts";
import VueHighcharts from 'vue3-highcharts';

export default {
    name: "DoiSearch",

    components: {
      VueHighcharts,
      PaginationTable
    },

    setup(){
      const store = useStore()

      const contentPrefix = ref({})
      const prefix = ref('10.5821');
      const typeSelected = ref('')
      const showCoverage = ref(false)
      const showPublished = ref(false)
      const showDeposited = ref(false)

      const currentPage = ref(0)
      const pageSize = computed(() => { return store.getters.pageSize})
      const totalElements = ref(0)

      const seriesName = ref('')
      const seriesData = ref([]);
      const categoriesData = ref([]);

      const chartRef = ref(null);
      const chartOptions = ref({
        chart: {
          type: 'column',
        },
        title: {
          text: '',
        },
        xAxis: {
          categories: [],
        },
        yAxis: {
          title: {
            text: '#',
          },
        },
        colors: ['#ffc72c'],
        //series: seriesData.value
        series: [/*{
          name: 'Dissertation',
          data: [3, 5, 1]
        }, {
          name: 'Journal article',
          data: [14, 8, 8]
        }*/]
      });

      const chartOptions2 = computed(() => ({
        chart: {
          type: 'line',
        },
        title: {
          text: 'Number of project stars',
        },
        xAxis: {
          categories: categoriesData.value
        },
        yAxis: {
          title: {
            text: 'Number of stars',
          },
        },
        //series: seriesData.value
        series: [{
          name: seriesName.value,
          data: seriesData.value,
        }],

      }));

      const cont = ref(0)
      const error = ref(null);

      let map = {}

      /*const bootstrapClasses = [
        "border-primary",
        "border-secondary",
        "border-success",
        "border-danger",
        "border-warning",
        "border-info",
        "border-light",
        "border-dark",
      ];*/

      /*const color = (index) => {
        return bootstrapClasses[index % bootstrapClasses.length];
      };*/

      const handleSizeChange = (size) => {
        store.commit('setPageSize', size)
        fetchDataItems(currentPage.value)
        currentPage.value = 1
      }

      const handleCurrentChange = (page) => {
        fetchDataItems(page-1)
      }

      const fetchDataItems = async (currentPage) => {
        //isLoading.value = true
        alert(currentPage)
        contentPrefix.value = await CrossrefService.getDois(prefix.value, currentPage*store.getters.pageSize, store.getters.pageSize)
        //isLoading.value = false


      }

      const updateDataSeries = () => {
        chartOptions.value.series = [
          {
            name: 'Series 2',
            data: [5, 4, 3, 2, 1],
          },
        ];

      };


      const fetchData = async () => {

        try {
          categoriesData.value = ['fran','manez','sanchez']
          seriesName.value = 'alsdk'
          seriesData.value = [1, 1, 1]




        } catch (error) {
          console.error(error);
        }
      };

      const colorBackgroundByType = (type) => {
        return "background-color:"+color(type)
      }

      const colorByType = (type) => {
        return "color:"+color(type)
      }

      const color = (type) => {
        if(type === "Edited Book") return "#017698;"
        else if(type === "Journal Article") return "#e3506b;"
        else if(type === "Conference Paper") return "#ff0000;"
        else if(type === "Dissertation") return "#e3c85b;"
        else if(type === "Dataset") return "#365fa9;"
        else if(type === "Database") return "#64ea7a;"
        else return "#3a3939;"
      }





      map["Edited Book"] = "edited-book"
      map["Journal Article"] = "journal-article"
      map["Dissertation"] = "dissertation"
      map["Dataset"] = "dataset"
      map["Database"] = "database"
      map["Conference Paper"] = "proceedings-article"
      map["Book section"] = "book-section"
      map["Monograph"] = "monograph"
      map["Report component"] = "report-component"
      map["Report"] = "report"
      map["Peer review"] = "peer-review"
      map["Book track"] = "book-track"
      map["Book part"] = "book-part"
      map["Other"] = "other"
      map["Book"] = "book"
      map["Journal volume"] = "journal-volume"
      map["Book set"] = "book-set"
      map["Reference entry"] = "reference-entry"
      map["Journal"] = "journal"
      map["Component"] = "component"
      map["Book-chapter"] = "book-chapter"
      map["Proceedings-series"] = "proceedings-series"
      map["Report-series"] = "report-series"
      map["Proceedings"] = "proceedings"
      map["Standard"] = "standard"
      map["Reference book"] = "reference-book"
      map["Posted content"] = "posted-content"
      map["Journal-issue"] = "journal-issue"
      map["Grant"] = "grant"
      map["Book series"] = "book-series"

      onMounted(async () => {
        seriesName.value = "initial"
        seriesData.value = [5, 4, 3, 2, 1]

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


      const getDois = async (currentPage) => {
        clear()

        let result = await CrossrefService.getDois(prefix.value, currentPage*store.getters.pageSize, store.getters.pageSize)
        contentPrefix.value = result.items
        totalElements.value = result['total-results']
      }



      // eslint-disable-next-line
      const getPublishedByTypeName = async (prefix, typeName) => {

        try {

          if(typeName === 'dissertation'){
            CrossrefService.getApprovedDate(prefix, typeName).then((result) => {
              console.log(`${typeName} - ${JSON.stringify(result)}`);
            })

          }else{

            CrossrefService.getPublishedDate(prefix, typeName).then((result) => {
              console.log(`${typeName} - ${JSON.stringify(result)}`);
            })

            //const response = await http.get('/prefixes/'+prefix+'/works?filter=type:'+typeName+'&facet=published:*&rows=0')
            //console.log(typeName + ": " + JSON.stringify(response.data.message.facets.published.values))
          }




        } catch (e) {
          error.value = 'Request ERROR: ' + e.message;
        }
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

        const newSeries = {
          name: type,
          data: resultValues,
        };

        chartOptions.value.title.text =  typeSelected.value + " published by years"
        chartOptions.value.xAxis.categories = resultKeys
        chartOptions.value.series = []
        chartOptions.value.series.push(newSeries)
        createChart()



      }

      const getDepositedDate = async (type) => {
        let result = await CrossrefService.getYearFirstDepositByType(prefix.value, type)
        for(let year = result; year <= new Date().getFullYear(); year++){
          console.log(year)
        }
      }


      const createChart = () => {
        if (chartRef.value) {
          Highcharts.chart(chartRef.value, chartOptions.value);
        }
      };




      return{
        contentPrefix,
        cont,
        prefix,
        typeSelected,
        color,
        colorByType,
        colorBackgroundByType,
        getDois,
        getCoverage,
        getPublicationDate,
        getDepositedDate,
        fetchData,
        chartRef,
        createChart,
        showCoverage,
        showPublished,
        showDeposited,
        error,
        chartOptions2,
        updateDataSeries,

        currentPage,
        pageSize,
        totalElements,
        handleSizeChange,
        handleCurrentChange
      }

    }


  }

</script>

<style scoped>

.gradient-custom {
  /* fallback for old browsers */
  background: #ffc72c;

  /* Chrome 10-25, Safari 5.1-6 */
  background: -webkit-linear-gradient(to right bottom, rgb(1, 118, 152), rgb(1, 118, 152));

  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  background: linear-gradient(to right bottom, rgb(1, 118, 152), rgb(1, 118, 152))
}


.stretch-card>.card {
  width: 100%;
  min-width: 100%
}


@media (max-width:991.98px) {
  .padding {
    padding: 1.5rem
  }
}

@media (max-width:767.98px) {
  .padding {
    padding: 1rem
  }
}

.padding {
  padding: 3rem
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
