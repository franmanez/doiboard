<template>

  <div>


    <img alt="Logo" src="../assets/doi-logo.png" class="mb-3 mx-auto d-block">


    <div class="container mb-5" >
      <div class="row col-12">
        <div class="col-10">
          <input class="form-control form-control-lg rounded-0" v-model="prefix" placeholder="10.nnnnnn">

        </div>
        <div class="col-2">
          <button type="button" class="btn btn-warning btn-lg rounded-0" @click="getMemberInfo">Search Prefix</button>
        </div>
      </div>
    </div>


    <div class="container" v-if="Object.keys(contentPrefix) != 0">
      <div class="row">

        <h1>Information for DOI prefix {{prefix}} </h1>
        <hr class="mt-0 mb-4 bg-secondary" style="height:3px; border:none;" />

        <div class="card bg-danger mb-5">
          <div class="card-body text-light">
            <div class="d-flex justify-content-between p-md-1">
              <div class="d-flex flex-row">
                <div class="align-self-center">
                  <i class="bi bi-file-earmark text-light me-5" style="font-size: 3rem;"></i>
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



      <div class="row">




        <div v-for="(value, index) in contentPrefix.all" :key="value.id" class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">


          <div class="card mb-5">

            <div class="card-body">

              <h4 class="card-title font-weight-bold">{{ index }}</h4>

              <hr style="height:3px; border:none;" :style="colorBackgroundByType(index)" />

              <div class="d-flex justify-content-between">
                <h1 class="">{{value.toLocaleString()}}</h1>
                <i class="bi bi-info-circle-fill me-1" style="font-size: 2.3rem;" :style="colorByType(index)"></i>
              </div>

            </div>

            <div class="card-footer">

              <a class="btn btn-light btn-sm" href="#" @click="getData('edited-book')" role="button"><i class="bi bi-info"></i> DETAILS</a>
              <a class="btn btn-light btn-sm" href="#" role="button"><i class="bi bi-pie-chart-fill"></i> PUBLICATION DATE</a>
              <a class="btn btn-light btn-sm" href="#" role="button"><i class="bi bi-bar-chart"></i> DEPOSITED DATE</a>

            </div>

          </div>
        </div>
      </div>

    </div>

    <hr>

    <div class="container-lg">
      <button class="btn btn-primary mx-3" @click="getMemberInfo(prefix)">GET INFO MEMBER</button>
      <button class="btn btn-danger mx-3" @click="getData('journal-article')">Journal article</button>
      <button class="btn btn-success mx-3" @click="getData('dataset')">Dataset</button>
      <div ref="chartRef"></div>
    </div>




    <div class="alert alert-danger mt-4" v-if="error != null">{{error}}</div>

  </div>
</template>

<script>

  import http from '@/http-common';
  import CrossrefService from '@/service/CrossrefService';
  import {onMounted, ref} from "vue";
  import Highcharts from "highcharts";
  export default {
    name: "DoiSearch",

    setup(){

      const contentPrefix = ref({})
      const prefix = ref('10.5821');

      const chartRef = ref(null);
      const chartOptions = ref({
        chart: {
          type: 'column',
        },
        title: {
          text: 'Items published by document type and year',
        },
        xAxis: {
          categories: [],
        },
        yAxis: {
          title: {
            text: '#',
          },
        },
        //series: seriesData.value
        series: [/*{
          name: 'Dissertation',
          data: [3, 5, 1]
        }, {
          name: 'Journal article',
          data: [14, 8, 8]
        }*/]
      });

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
        createChart();
      });

      const clear = () => {
        contentPrefix.value = ''
        error.value = null
        increment()
      }

      const increment = () => {
        cont.value = cont.value + 1
      }


      const getMemberInfo = async () => {
        let result = await CrossrefService.memberInfo(prefix.value)
        contentPrefix.value = result

      }

      const getPrefix = async () => {
        clear()
        try {
          const response = await http.get('/prefixes/'+prefix.value+'/works?facet=type-name:*&rows=0')
          //const responseJson = await response.data

          contentPrefix.value = {
            'status': response.data.status,
            'total': response.data.message['total-results'],
            'facets': response.data.message.facets['type-name'].values
          }

          /*for(let keyTypeName in contentPrefix.value.facets) {
            await getPublishedByTypeName(prefix.value, map[keyTypeName])
            //console.log("name: " + keyTypeName + ", value: "+ contentPrefix.value.facets[keyTypeName]);
          }*/

        } catch (e) {
          error.value = 'Request ERROR: ' + e.message;
        }
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


      const getData = async (type) => {
        getDataByFirstDepositDate(type)
        getDataByPublicationDate(type)
      }




      const getDataByPublicationDate = async (type) => {


        try {
          CrossrefService.getPublishedDate(prefix.value, type).then((result) => {


            const resultKeys = Object.keys(result);
            const resultValues = Object.values(result);

            console.log(resultKeys)

            /*let values = resultValues.map(function (element) {
              return element
            })*/



            const newSeries = {
              name: type,
              data: resultValues,
            };


            chartOptions.value.xAxis.categories = resultKeys
            chartOptions.value.series.push(newSeries);
            createChart()

          })

        } catch (error) {
          console.error(error);
        }


      };



      const getDataByFirstDepositDate = async (type) => {


        CrossrefService.getYearFirstDepositByType(prefix.value, type).then((result) => {
          const firstYear = result

          for(let year = firstYear; year <= new Date().getFullYear(); year++){
            console.log(year)
          }

        })


      };





      const createChart = () => {
        if (chartRef.value) {
          console.log(chartRef.value)
          console.log(chartOptions)
          Highcharts.chart(chartRef.value, chartOptions.value);
        }
      };






      return{
        contentPrefix,
        cont,
        increment,
        getPrefix,
        prefix,
        color,
        colorByType,
        colorBackgroundByType,
        getData,
        getMemberInfo,
        chartRef,
        createChart,
        error,
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


.btn-sm, .btn-group-sm > .btn {
  --bs-btn-padding-y: 0.25rem;
  --bs-btn-padding-x: 0.5rem;
  --bs-btn-font-size: 0.775rem;
  --bs-btn-border-radius: var(--bs-border-radius-sm);
}



</style>
